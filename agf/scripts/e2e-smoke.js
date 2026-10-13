#!/usr/bin/env node
/**
 * AGF — Real End-to-End API Smoke Test
 *
 * NO MOCKS. This script:
 *   1. Sends real HTTP requests to a running dev server (default localhost:3000)
 *   2. Verifies real rows landed in the actual Google Spreadsheet
 *      (Booking Requests / Contact Inquiries tabs) with correct IST timestamps
 *   3. Exercises spam protection: honeypot, validation, per-device cooldown
 *      (429 "wait before sending another"), daily quota (429 with
 *      a friendly "try again tomorrow" message), and per-IP rate limiting
 *      (429 with a "receiving a lot of requests" message)
 *
 * The server MUST be started with today's quotas set to 1 so the quota paths
 * are reachable without flooding the sheet:
 *
 *   cd agf
 *   AGF_BOOKING_DAILY_LIMIT=1 AGF_CONTACT_DAILY_LIMIT=1 npm run dev
 *
 * Then, in a second terminal:
 *
 *   cd agf
 *   node scripts/e2e-smoke.js
 *
 * Requirements: .env.local with GOOGLE_SHEETS_SPREADSHEET_ID,
 * GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY — the same
 * credentials the app uses (needed to read rows back for verification).
 *
 * Exit code 0 = every check passed. Non-zero = at least one failure.
 * The script writes exactly 2 test rows (1 booking + 1 contact); clear them
 * afterwards with `npm run clear:sheets` if desired.
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const BASE_URL = process.env.E2E_BASE_URL || 'http://localhost:3000';

/** Load .env.local into process.env (without overriding existing vars). */
function loadEnvLocal() {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    let value = match[2];
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    value = value.replace(/\\n/g, '\n'); // escaped PEM newlines
    if (!(match[1] in process.env)) process.env[match[1]] = value;
  }
}

loadEnvLocal();

// ---------------------------------------------------------------------------
// Tiny assertion harness
// ---------------------------------------------------------------------------

let passed = 0;
let failed = 0;
const failures = [];

function check(name, condition, detail) {
  if (condition) {
    passed += 1;
    console.log(`  PASS  ${name}`);
  } else {
    failed += 1;
    failures.push(name);
    console.log(`  FAIL  ${name}${detail ? ` — ${detail}` : ''}`);
  }
}

function section(title) {
  console.log(`\n=== ${title} ===`);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * POST JSON to the dev server.
 * A unique x-forwarded-for IP per call keeps every section in its own
 * rate-limit bucket and per-device cooldown key (the server keys both on IP).
 */
async function post(route, body, ip) {
  const res = await fetch(`${BASE_URL}${route}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-forwarded-for': ip || nextIP(),
    },
    body: JSON.stringify(body),
  });
  let json = null;
  try {
    json = await res.json();
  } catch {
    /* non-JSON body */
  }
  return { status: res.status, headers: res.headers, json };
}

/** GET a URL, returning status + text. */
async function get(url) {
  const res = await fetch(url);
  const text = await res.text();
  return { status: res.status, text };
}

// ---------------------------------------------------------------------------
// Real Google Sheets reads
// ---------------------------------------------------------------------------

let sheetsClient = null;

function getSheetsClient() {
  if (sheetsClient) return sheetsClient;
  const { google } = require('googleapis');
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  sheetsClient = google.sheets({ version: 'v4', auth });
  return sheetsClient;
}

async function readTab(tabName) {
  const sheets = getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
    range: tabName,
  });
  return res.data.values || [];
}

// ---------------------------------------------------------------------------
// Test payloads (must match the server-side schemas exactly)
// ---------------------------------------------------------------------------

const IST_TIMESTAMP_RE = /^\d{2}-[A-Z][a-z]{2}-\d{4} \d{2}:\d{2}:\d{2} IST$/;
const BOOKING_REF_RE = /^AGF-\d{4}-\d{6}$/;

let ipCounter = 0;
function nextIP() {
  ipCounter += 1;
  return `198.18.0.${ipCounter}`;
}

function tomorrowISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

const validBooking = () => ({
  name: 'E2E Test User',
  phone: '+91 98765 43210',
  email: 'e2e.test@example.com',
  date: tomorrowISO(),
  timeSlot: 'Morning (6:00 AM – 10:00 AM)',
  goal: 'Strength Training',
  notes: 'Automated end-to-end smoke test row — safe to delete.',
  website_url: '', // honeypot must stay empty
});

const validContact = () => ({
  name: 'E2E Test User',
  phone: '+91 98765 43210',
  email: 'e2e.test@example.com',
  topic: 'General Inquiry',
  message: 'Automated end-to-end smoke test row — safe to delete.',
  website_url: '',
});

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log(`AGF end-to-end smoke test against ${BASE_URL}`);

  // -----------------------------------------------------------------
  section('Frontend pages render (SSR)');
  // -----------------------------------------------------------------
  const home = await get(`${BASE_URL}/`);
  check('GET / returns 200', home.status === 200, `got ${home.status}`);

  const bookingPage = await get(`${BASE_URL}/book-a-visit`);
  check('GET /book-a-visit returns 200', bookingPage.status === 200, `got ${bookingPage.status}`);
  check(
    'GET /book-a-visit renders the booking form',
    bookingPage.text.includes('Reserve Your Walkthrough'),
  );

  const contactPage = await get(`${BASE_URL}/contact`);
  check('GET /contact returns 200', contactPage.status === 200, `got ${contactPage.status}`);
  check('GET /contact renders the contact form', contactPage.text.includes('Send a Message'));

  const equipmentPage = await get(`${BASE_URL}/equipment`);
  check('GET /equipment returns 200', equipmentPage.status === 200, `got ${equipmentPage.status}`);

  // -----------------------------------------------------------------
  section('API method restrictions');
  // -----------------------------------------------------------------
  const getBookings = await get(`${BASE_URL}/api/bookings`);
  check('GET /api/bookings → 405', getBookings.status === 405, `got ${getBookings.status}`);
  const getContact = await get(`${BASE_URL}/api/contact`);
  check('GET /api/contact → 405', getContact.status === 405, `got ${getContact.status}`);

  // -----------------------------------------------------------------
  section('Server-side validation rejects bad input');
  // -----------------------------------------------------------------
  const badBooking = await post('/api/bookings', {
    ...validBooking(),
    phone: '123',
    date: 'not-a-date',
  });
  check('Invalid booking → 400', badBooking.status === 400, `got ${badBooking.status}`);
  check('Invalid booking → error=validation', badBooking.json?.error === 'validation');
  check('Invalid booking → phone field error present', !!badBooking.json?.fields?.phone);
  check('Invalid booking → date field error present', !!badBooking.json?.fields?.date);

  const badContact = await post('/api/contact', { ...validContact(), topic: 'Not A Topic' });
  check('Invalid contact → 400', badContact.status === 400, `got ${badContact.status}`);
  check('Invalid contact → topic field error present', !!badContact.json?.fields?.topic);

  // -----------------------------------------------------------------
  section('Baseline sheet state (real spreadsheet)');
  // -----------------------------------------------------------------
  let bookingRows;
  let contactRows;
  try {
    bookingRows = await readTab('Booking Requests');
    contactRows = await readTab('Contact Inquiries');
    check('Booking Requests tab readable', bookingRows.length >= 1, 'tab missing or empty');
    check('Contact Inquiries tab readable', contactRows.length >= 1, 'tab missing or empty');
  } catch (error) {
    check('Google Sheets read succeeded', false, error.message);
    return finish();
  }
  const bookingCountBefore = bookingRows.length;
  const contactCountBefore = contactRows.length;

  // -----------------------------------------------------------------
  section('Honeypot traps bots without writing');
  // -----------------------------------------------------------------
  const honeypot = await post('/api/bookings', {
    ...validBooking(),
    website_url: 'http://spam.example.com',
  });
  check('Honeypot submission → 200 (bots see success)', honeypot.status === 200, `got ${honeypot.status}`);
  check('Honeypot → ok=true', honeypot.json?.ok === true);
  await sleep(1500); // give any (incorrect) write time to land
  const bookingRowsAfterHoneypot = await readTab('Booking Requests');
  check(
    'Honeypot wrote NO row to the sheet',
    bookingRowsAfterHoneypot.length === bookingCountBefore,
    `rows ${bookingCountBefore} → ${bookingRowsAfterHoneypot.length}`,
  );

  // -----------------------------------------------------------------
  section('Valid booking → 200 + real row with IST timestamp');
  // -----------------------------------------------------------------
  const bookingIP = nextIP();
  const booking = await post('/api/bookings', validBooking(), bookingIP);
  check('Valid booking → 200', booking.status === 200, `got ${booking.status}: ${JSON.stringify(booking.json)}`);
  check('Booking ok=true', booking.json?.ok === true);
  const bookingRef = booking.json?.reference;
  check('Booking reference matches AGF-YYYY-NNNNNN', BOOKING_REF_RE.test(bookingRef || ''), `got ${bookingRef}`);
  check(
    'Booking success message returned',
    typeof booking.json?.message === 'string' && booking.json.message.length > 10,
  );

  // -----------------------------------------------------------------
  section('Per-device cooldown → immediate repeat is blocked');
  // -----------------------------------------------------------------
  const cooldownBooking = await post('/api/bookings', validBooking(), bookingIP);
  check('Immediate repeat from same device → 429', cooldownBooking.status === 429, `got ${cooldownBooking.status}`);
  check('Repeat → error=cooldown', cooldownBooking.json?.error === 'cooldown', `got ${cooldownBooking.json?.error}`);
  check(
    'Cooldown message asks the user to wait',
    /wait/i.test(cooldownBooking.json?.message || ''),
    `got: ${cooldownBooking.json?.message}`,
  );
  check('Cooldown response has Retry-After header', !!cooldownBooking.headers.get('retry-after'));

  // -----------------------------------------------------------------
  section('Daily booking quota → friendly 429 (try again tomorrow)');
  // -----------------------------------------------------------------
  // Fresh IP → bypasses this device's cooldown → hits the daily quota.
  const quotaBooking = await post('/api/bookings', validBooking(), nextIP());
  check(
    'Second booking today → 429',
    quotaBooking.status === 429,
    `got ${quotaBooking.status} — is the server running with AGF_BOOKING_DAILY_LIMIT=1?`,
  );
  check('Quota response → error=quota_exceeded', quotaBooking.json?.error === 'quota_exceeded');
  check(
    'Quota message mentions trying again tomorrow',
    /tomorrow/i.test(quotaBooking.json?.message || ''),
    `got: ${quotaBooking.json?.message}`,
  );
  check('Quota response has Retry-After header', !!quotaBooking.headers.get('retry-after'));
  check('Quota response is not ok', quotaBooking.json?.ok === false);

  // -----------------------------------------------------------------
  section('Valid contact → 200 + real row with IST timestamp');
  // -----------------------------------------------------------------
  const contactIP = nextIP();
  const contact = await post('/api/contact', validContact(), contactIP);
  check('Valid contact → 200', contact.status === 200, `got ${contact.status}: ${JSON.stringify(contact.json)}`);
  check('Contact ok=true', contact.json?.ok === true);
  const contactRef = contact.json?.reference;
  check('Contact reference matches AGF-YYYY-NNNNNN', BOOKING_REF_RE.test(contactRef || ''), `got ${contactRef}`);

  // -----------------------------------------------------------------
  section('Per-device cooldown (contact) → immediate repeat is blocked');
  // -----------------------------------------------------------------
  const cooldownContact = await post('/api/contact', validContact(), contactIP);
  check('Immediate repeat from same device → 429', cooldownContact.status === 429, `got ${cooldownContact.status}`);
  check('Repeat → error=cooldown', cooldownContact.json?.error === 'cooldown', `got ${cooldownContact.json?.error}`);

  // -----------------------------------------------------------------
  section('Daily contact quota → friendly 429 (try again tomorrow)');
  // -----------------------------------------------------------------
  const quotaContact = await post('/api/contact', validContact(), nextIP());
  check('Second contact today → 429', quotaContact.status === 429, `got ${quotaContact.status}`);
  check('Contact quota → error=quota_exceeded', quotaContact.json?.error === 'quota_exceeded');
  check(
    'Contact quota message mentions trying again tomorrow',
    /tomorrow/i.test(quotaContact.json?.message || ''),
    `got: ${quotaContact.json?.message}`,
  );

  // Safety: only burst if quotas are confirmed active — otherwise the burst
  // would write real rows for every request.
  if (quotaBooking.status !== 429 || quotaContact.status !== 429) {
    check('Rate limit test ran', false, 'aborted: quota limits not active on server');
    return finish();
  }

  // -----------------------------------------------------------------
  section('Per-IP rate limit → busy-server 429');
  // -----------------------------------------------------------------
  const burstIP = nextIP();
  let rateLimited = null;
  let burstCount = 0;
  for (let i = 0; i < 15; i += 1) {
    burstCount += 1;
    const res = await post('/api/bookings', validBooking(), burstIP);
    if (res.status === 429 && res.json?.error === 'rate_limited') {
      rateLimited = res;
      break;
    }
  }
  if (!rateLimited) {
    // The 60s window may have expired mid-test — wait it out and burst again.
    console.log('  (window likely reset — waiting 61s and retrying burst)');
    await sleep(61000);
    for (let i = 0; i < 15; i += 1) {
      burstCount += 1;
      const res = await post('/api/bookings', validBooking(), burstIP);
      if (res.status === 429 && res.json?.error === 'rate_limited') {
        rateLimited = res;
        break;
      }
    }
  }
  check(`Rate limit triggered within ${burstCount} requests`, !!rateLimited);
  if (rateLimited) {
    check('Rate limit → 429', rateLimited.status === 429);
    check(
      'Rate limit message says the server is busy / try again shortly',
      /lot of requests|wait|busy|try again/i.test(rateLimited.json?.message || ''),
      `got: ${rateLimited.json?.message}`,
    );
    check('Rate limit response has Retry-After header', !!rateLimited.headers.get('retry-after'));
  }

  // -----------------------------------------------------------------
  section('Sheet verification (real rows, real timestamps)');
  // -----------------------------------------------------------------
  await sleep(1500); // let writes settle
  const bookingFinal = await readTab('Booking Requests');
  const contactFinal = await readTab('Contact Inquiries');

  const bookingRow = bookingFinal.find((row) => row[8] === bookingRef);
  check('Booking row found in sheet by reference', !!bookingRow, `ref ${bookingRef} not found`);
  if (bookingRow) {
    check('Booking timestamp matches IST format', IST_TIMESTAMP_RE.test(bookingRow[0] || ''), `got: ${bookingRow[0]}`);
    check('Booking name stored', bookingRow[1] === 'E2E Test User', `got: ${bookingRow[1]}`);
    check('Booking phone stored', bookingRow[2] === '+91 98765 43210', `got: ${bookingRow[2]}`);
    check('Booking status is Pending', bookingRow[9] === 'Pending', `got: ${bookingRow[9]}`);
  }

  const contactRow = contactFinal.find((row) => row[6] === contactRef);
  check('Contact row found in sheet by reference', !!contactRow, `ref ${contactRef} not found`);
  if (contactRow) {
    check('Contact timestamp matches IST format', IST_TIMESTAMP_RE.test(contactRow[0] || ''), `got: ${contactRow[0]}`);
    check('Contact phone stored (not #ERROR!)', contactRow[2] === '+91 98765 43210', `got: ${contactRow[2]}`);
    check('Contact topic stored', contactRow[4] === 'General Inquiry', `got: ${contactRow[4]}`);
    check('Contact status is New', contactRow[7] === 'New', `got: ${contactRow[7]}`);
  }

  // Exactly 2 rows written total: the successful booking and contact.
  // (honeypot, invalid, quota, and rate-limited requests must not write)
  const bookingDelta = bookingFinal.length - bookingCountBefore;
  const contactDelta = contactFinal.length - contactCountBefore;
  check(
    'Exactly 1 booking row written across all tests',
    bookingDelta === 1,
    `delta=${bookingDelta} (quota/limit paths are writing rows!)`,
  );
  check(
    'Exactly 1 contact row written across all tests',
    contactDelta === 1,
    `delta=${contactDelta}`,
  );

  finish();
}

function finish() {
  console.log(`\n----------------------------------------`);
  console.log(`Results: ${passed} passed, ${failed} failed`);
  if (failed > 0) {
    console.log('Failures:');
    for (const f of failures) console.log(`  - ${f}`);
  }
  console.log('----------------------------------------');
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error('\nE2E smoke test crashed:', error);
  process.exit(1);
});
