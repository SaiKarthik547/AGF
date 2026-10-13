/**
 * AGF — Live API Route Tests (REAL, no mocks anywhere)
 *
 * These tests hit the ACTUAL running dev server over HTTP and read/verify
 * the ACTUAL Google Spreadsheet — nothing is stubbed, faked, or simulated.
 *
 * Setup (fresh process so the in-memory quotas/cooldowns reset):
 *   cd agf
 *   AGF_BOOKING_DAILY_LIMIT=1 AGF_CONTACT_DAILY_LIMIT=1 npm run dev
 *
 * Then run:
 *   cd agf && npx vitest run tests/live-api.test.ts
 *
 * Requirements: agf/.env.local with GOOGLE_SHEETS_SPREADSHEET_ID,
 * GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY (the
 * app's own credentials, used to read the sheet back for verification).
 *
 * The suite writes exactly 2 real rows (1 booking + 1 contact) and deletes
 * exactly those rows afterwards (afterAll cleanup, matched by reference),
 * so repeated runs do not pollute the business spreadsheet.
 */

import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import {
  BASE_URL,
  assertServerReachable,
  deleteRowsWhere,
  isoDay,
  nextIP,
  readTab,
} from './helpers/real';

const BOOKING_REF_RE = /^AGF-\d{4}-\d{6}$/;
const IST_TIMESTAMP_RE = /^\d{2}-[A-Z][a-z]{2}-\d{4} \d{2}:\d{2}:\d{2} IST$/;
const TEST_NAME = 'E2E-LIVE-TEST';

const bookingRefs: string[] = [];
const contactRefs: string[] = [];
let bookingRowsBefore = 0;
let contactRowsBefore = 0;

const validBooking = () => ({
  name: TEST_NAME,
  phone: '+91 98765 43210',
  email: 'live.test@example.com',
  date: isoDay(1),
  timeSlot: 'Morning (6:00 AM – 10:00 AM)',
  goal: 'Strength Training',
  notes: 'Automated live test row — auto-deleted after the run.',
  website_url: '',
});

const validContact = () => ({
  name: TEST_NAME,
  phone: '+91 98765 43210',
  email: 'live.test@example.com',
  topic: 'General Inquiry',
  // Message intentionally EMPTY — the live suite proves the backend accepts
  // a contact submission with the optional message field blank.
  message: '',
  website_url: '',
});

async function post(
  route: string,
  body: unknown,
  ip: string,
  contentType = 'application/json',
  rawBody?: string,
): Promise<{ status: number; headers: Headers; json: any }> {
  const res = await fetch(`${BASE_URL}${route}`, {
    method: 'POST',
    headers: { 'Content-Type': contentType, 'x-forwarded-for': ip },
    body: rawBody ?? JSON.stringify(body),
  });
  let json: any = null;
  try {
    json = await res.json();
  } catch {
    /* non-JSON body */
  }
  return { status: res.status, headers: res.headers, json };
}

async function get(route: string): Promise<{ status: number; text: string }> {
  const res = await fetch(`${BASE_URL}${route}`);
  return { status: res.status, text: await res.text() };
}

beforeAll(async () => {
  await assertServerReachable();

  // Warm up the API route compilation so the first real test request does
  // not pay the cold-compile cost (which can exceed the default 5s timeout).
  await fetch(`${BASE_URL}/api/bookings`, { method: 'GET' });
  await fetch(`${BASE_URL}/api/contact`, { method: 'GET' });

  const bookings = await readTab('Booking Requests');
  const contacts = await readTab('Contact Inquiries');
  bookingRowsBefore = bookings.length;
  contactRowsBefore = contacts.length;
}, 90_000);

afterAll(async () => {
  // Best-effort cleanup of exactly the rows this suite created.
  try {
    const deletedBookings = await deleteRowsWhere(
      'Booking Requests',
      (row) => bookingRefs.includes(row[8] ?? '') || row[1] === TEST_NAME,
    );
    const deletedContacts = await deleteRowsWhere(
      'Contact Inquiries',
      (row) => contactRefs.includes(row[6] ?? '') || row[1] === TEST_NAME,
    );
    console.log(
      `\n[live-api] cleanup: removed ${deletedBookings} booking row(s), ${deletedContacts} contact row(s) created by this run.`,
    );
  } catch (error) {
    console.warn(
      '\n[live-api] cleanup failed — run `node scripts/clear-sheets.js` to remove test rows:',
      error instanceof Error ? error.message : error,
    );
  }
}, 90_000);

// ---------------------------------------------------------------------------
// 1. Transport hardening — bad requests never reach Google Sheets
// ---------------------------------------------------------------------------

describe('request hardening (no sheet writes)', () => {
  it('rejects text/plain content type with 415', { timeout: 30_000 }, async () => {
    const res = await post(
      '/api/bookings',
      null,
      nextIP(),
      'text/plain',
      JSON.stringify(validBooking()),
    );
    expect(res.status).toBe(415);
    expect(res.json.error).toBe('unsupported_media_type');
    expect(res.json.ok).toBe(false);
  });

  it('rejects a request with no content-type header at all with 415', async () => {
    const res = await fetch(`${BASE_URL}/api/bookings`, {
      method: 'POST',
      headers: { 'x-forwarded-for': nextIP() },
      body: JSON.stringify(validBooking()),
    });
    expect(res.status).toBe(415);
  });

  it('rejects malformed JSON with 400 bad_request', async () => {
    const res = await post(
      '/api/bookings',
      null,
      nextIP(),
      'application/json',
      '{"name": "broken',
    );
    expect(res.status).toBe(400);
    expect(res.json.error).toBe('bad_request');
  });

  it('rejects a JSON array body with 400 bad_request', async () => {
    const res = await post(
      '/api/contact',
      null,
      nextIP(),
      'application/json',
      JSON.stringify([validContact()]),
    );
    expect(res.status).toBe(400);
    expect(res.json.error).toBe('bad_request');
  });

  it('rejects a JSON scalar body with 400 bad_request', async () => {
    const res = await post(
      '/api/bookings',
      null,
      nextIP(),
      'application/json',
      '"just a string"',
    );
    expect(res.status).toBe(400);
    expect(res.json.error).toBe('bad_request');
  });

  it('accepts form-encoded bodies (reaches validation)', async () => {
    // Invalid on purpose (bad phone) so it proves the parser path works
    // without writing a row or consuming the daily quota.
    const res = await fetch(`${BASE_URL}/api/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-forwarded-for': nextIP(),
      },
      body: new URLSearchParams({ ...validBooking(), phone: '12345' }),
    });
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe('validation');
    expect(json.fields.phone).toBeTruthy();
  });

  it('returns 405 for GET on both endpoints', async () => {
    expect((await get('/api/bookings')).status).toBe(405);
    expect((await get('/api/contact')).status).toBe(405);
  });
});

// ---------------------------------------------------------------------------
// 2. Mandatory fields — enforced in the app backend BEFORE any Sheets call
// ---------------------------------------------------------------------------

describe('mandatory booking fields (400 + no sheet write)', () => {
  const cases: Array<[string, Record<string, string>]> = [
    ['name', { name: '' }],
    ['phone', { phone: '' }],
    ['date', { date: '' }],
    ['timeSlot', { timeSlot: '' }],
    ['goal', { goal: '' }],
  ];

  it.each(cases)('missing %s → 400 with a field error, nothing written', async (field, override) => {
    const res = await post('/api/bookings', { ...validBooking(), ...override }, nextIP());
    expect(res.status).toBe(400);
    expect(res.json.error).toBe('validation');
    expect(res.json.fields[field]).toBeTruthy();
  });

  it.each([
    ['letters', 'abcdefghij'],
    ['too short', '12345'],
    ['11 digits', '98765432101'],
    ['wrong first digit', '5123456789'],
    ['formula injection', '+91=SUM(A1:A9)'],
  ])('phone %s → 400, nothing written', async (_label, phone) => {
    const res = await post('/api/bookings', { ...validBooking(), phone }, nextIP());
    expect(res.status).toBe(400);
    expect(res.json.fields.phone).toBeTruthy();
  });

  it('rejects a disallowed time slot and goal', async () => {
    const res = await post(
      '/api/bookings',
      { ...validBooking(), timeSlot: 'Afternoon', goal: 'Cardio' },
      nextIP(),
    );
    expect(res.status).toBe(400);
    expect(res.json.fields.timeSlot).toBeTruthy();
    expect(res.json.fields.goal).toBeTruthy();
  });

  it('rejects a past visit date', async () => {
    const res = await post(
      '/api/bookings',
      { ...validBooking(), date: isoDay(-1) },
      nextIP(),
    );
    expect(res.status).toBe(400);
    expect(res.json.fields.date).toBe('Please choose a future date.');
  });

  it('verifies the sheet gained ZERO rows from all the rejections above', async () => {
    const rows = await readTab('Booking Requests');
    expect(rows.length).toBe(bookingRowsBefore);
  });
});

describe('mandatory contact fields (400 + no sheet write)', () => {
  it.each([['name'], ['phone'], ['topic']])('missing %s → 400 with a field error', async (field) => {
    const res = await post(
      '/api/contact',
      { ...validContact(), [field]: '' },
      nextIP(),
    );
    expect(res.status).toBe(400);
    expect(res.json.error).toBe('validation');
    expect(res.json.fields[field]).toBeTruthy();
  });

  it('rejects an invalid phone with the strict 10-digit message', async () => {
    const res = await post(
      '/api/contact',
      { ...validContact(), phone: '999' },
      nextIP(),
    );
    expect(res.status).toBe(400);
    expect(res.json.fields.phone).toBe(
      'Enter a valid 10-digit phone number (e.g. 98765 43210).',
    );
  });

  it('rejects a disallowed topic', async () => {
    const res = await post(
      '/api/contact',
      { ...validContact(), topic: 'Complaint' },
      nextIP(),
    );
    expect(res.status).toBe(400);
    expect(res.json.fields.topic).toBeTruthy();
  });

  it('verifies the sheet gained ZERO rows from all the rejections above', async () => {
    const rows = await readTab('Contact Inquiries');
    expect(rows.length).toBe(contactRowsBefore);
  });
});

// ---------------------------------------------------------------------------
// 3. Honeypot — bots see success, sheet stays untouched
// ---------------------------------------------------------------------------

describe('honeypot anti-bot', () => {
  it('fakes success for a honeypot submission without writing a row', async () => {
    const res = await post(
      '/api/bookings',
      { ...validBooking(), website_url: 'http://spam.example' },
      nextIP(),
    );
    expect(res.status).toBe(200);
    expect(res.json.ok).toBe(true);
    expect(res.json.reference).toBe('THANK_YOU');

    const rows = await readTab('Booking Requests');
    expect(rows.length).toBe(bookingRowsBefore);
  });
});

// ---------------------------------------------------------------------------
// 4. Booking happy path — REAL row in the REAL spreadsheet
// ---------------------------------------------------------------------------

describe('valid booking → real row in Google Sheets', () => {
  const ip = nextIP();

  it('returns 200 with an AGF reference and a device cookie', async () => {
    const res = await post('/api/bookings', validBooking(), ip);
    expect(res.status, `body: ${JSON.stringify(res.json)}`).toBe(200);
    expect(res.json.ok).toBe(true);
    expect(res.json.reference).toMatch(BOOKING_REF_RE);
    expect(res.json.message).toMatch(/walkthrough/i);
    bookingRefs.push(res.json.reference);

    // Anti-spam device cookie so the browser is remembered per device
    const cookie = res.headers.get('set-cookie') ?? '';
    expect(cookie).toContain('agf_device=');
    expect(cookie).toContain('HttpOnly');
  });

  it('the row is really in the Booking Requests tab, correct data', async () => {
    await new Promise((r) => setTimeout(r, 1500)); // let the write settle
    const rows = await readTab('Booking Requests');
    expect(rows.length).toBe(bookingRowsBefore + 1);

    const row = rows.find((r) => bookingRefs.includes(r[8] ?? ''));
    expect(row, `reference ${bookingRefs[0]} not found in sheet`).toBeTruthy();
    if (!row) return;

    expect(row[0]).toMatch(IST_TIMESTAMP_RE); // A: IST timestamp
    expect(row[1]).toBe(TEST_NAME); // B: name
    expect(row[2]).toBe('+91 98765 43210'); // C: phone literal, not #ERROR!
    expect(row[3]).toBe('live.test@example.com'); // D: email
    expect(row[4]).toBe(isoDay(1)); // E: visit date
    expect(row[5]).toBe('Morning (6:00 AM – 10:00 AM)'); // F: session
    expect(row[6]).toBe('Strength Training'); // G: goal
    expect(row[8]).toBe(bookingRefs[0]); // I: reference
    expect(row[9]).toBe('Pending'); // J: status
  });

  it('an immediate repeat from the same device/IP → 429 cooldown, no write', async () => {
    const res = await post('/api/bookings', validBooking(), ip);
    expect(res.status).toBe(429);
    expect(res.json.error).toBe('cooldown');
    expect(res.json.message).toMatch(/wait/i);
    expect(res.headers.get('retry-after')).toBeTruthy();

    const rows = await readTab('Booking Requests');
    expect(rows.length).toBe(bookingRowsBefore + 1); // unchanged
  });

  it("today's booking quota is exhausted → friendly 429 \"try again tomorrow\"", async () => {
    // Fresh IP (bypasses this device's cooldown) — hits the daily quota
    // instead, which is exactly the "slots full" scenario.
    const res = await post('/api/bookings', validBooking(), nextIP());
    expect(res.status).toBe(429);
    expect(res.json.error).toBe('quota_exceeded');
    expect(res.json.message).toMatch(/tomorrow/i);
    expect(res.headers.get('retry-after')).toBeTruthy();

    const rows = await readTab('Booking Requests');
    expect(rows.length).toBe(bookingRowsBefore + 1); // still just our row
  });
});

// ---------------------------------------------------------------------------
// 5. Contact happy path — REAL row (with the optional message left BLANK)
// ---------------------------------------------------------------------------

describe('valid contact → real row in Google Sheets', () => {
  const ip = nextIP();

  it('returns 200 even with the optional message empty', async () => {
    const res = await post('/api/contact', validContact(), ip);
    expect(res.status).toBe(200);
    expect(res.json.ok).toBe(true);
    expect(res.json.reference).toMatch(BOOKING_REF_RE);
    expect(res.json.message).toMatch(/message has been received/i);
    contactRefs.push(res.json.reference);
  });

  it('the row is really in the Contact Inquiries tab, correct data', async () => {
    await new Promise((r) => setTimeout(r, 1500));
    const rows = await readTab('Contact Inquiries');
    expect(rows.length).toBe(contactRowsBefore + 1);

    const row = rows.find((r) => contactRefs.includes(r[6] ?? ''));
    expect(row, `reference ${contactRefs[0]} not found in sheet`).toBeTruthy();
    if (!row) return;

    expect(row[0]).toMatch(IST_TIMESTAMP_RE); // A: IST timestamp
    expect(row[1]).toBe(TEST_NAME); // B: name
    expect(row[2]).toBe('+91 98765 43210'); // C: phone literal, not #ERROR!
    expect(row[4]).toBe('General Inquiry'); // E: topic
    expect(row[5]).toBe(''); // F: message (optional — blank is fine)
    expect(row[6]).toBe(contactRefs[0]); // G: reference
    expect(row[7]).toBe('New'); // H: status
  });

  it('an immediate repeat from the same device/IP → 429 cooldown, no write', async () => {
    const res = await post('/api/contact', validContact(), ip);
    expect(res.status).toBe(429);
    expect(res.json.error).toBe('cooldown');

    const rows = await readTab('Contact Inquiries');
    expect(rows.length).toBe(contactRowsBefore + 1);
  });

  it("today's contact quota is exhausted → friendly 429 \"try again tomorrow\"", async () => {
    const res = await post('/api/contact', validContact(), nextIP());
    expect(res.status).toBe(429);
    expect(res.json.error).toBe('quota_exceeded');
    expect(res.json.message).toMatch(/tomorrow/i);
  });
});

// ---------------------------------------------------------------------------
// 6. Per-IP rate limit — "server is busy" 429 (invalid payloads: no writes)
// ---------------------------------------------------------------------------

describe('per-IP rate limiting', () => {
  it('blocks the 11th request within a minute with a busy-server 429', async () => {
    const ip = nextIP();
    // Invalid payloads: every request still consumes the rate-limit budget
    // but fails validation before the quota or Sheets are touched.
    for (let i = 0; i < 10; i += 1) {
      const res = await post('/api/bookings', { ...validBooking(), phone: '' }, ip);
      expect(res.status).toBe(400);
    }

    const blocked = await post('/api/bookings', { ...validBooking(), phone: '' }, ip);
    expect(blocked.status).toBe(429);
    expect(blocked.json.error).toBe('rate_limited');
    expect(blocked.json.message).toMatch(/wait|try again|lot of requests/i);
    expect(blocked.headers.get('retry-after')).toBeTruthy();

    // Other IPs are unaffected
    const other = await post('/api/bookings', { ...validBooking(), phone: '' }, nextIP());
    expect(other.status).toBe(400); // validation error, not rate limited
  });

  it('the rate-limit burst wrote ZERO rows to the sheet', async () => {
    const rows = await readTab('Booking Requests');
    expect(rows.length).toBe(bookingRowsBefore + 1);
  });
});
