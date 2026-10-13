#!/usr/bin/env node
/**
 * Restore the header rows for Booking Requests and Contact Inquiries tabs.
 * Run after a values.clear accidentally wiped the headers.
 *
 * Usage: cd agf && node scripts/restore-sheet-headers.js
 */
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let v = m[2];
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    if (!(m[1] in process.env)) process.env[m[1]] = v.replace(/\\n/g, '\n');
  }
}

const { google } = require('googleapis');
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
const sheets = google.sheets({ version: 'v4', auth });
const sid = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
if (!sid) { console.error('Missing GOOGLE_SHEETS_SPREADSHEET_ID'); process.exit(1); }

const BOOKING_HEADER = [
  'Timestamp (IST)', 'Name', 'Phone', 'Email', 'Visit Date',
  'Session', 'Fitness Goal', 'Notes', 'Booking Reference', 'Status', 'Staff Notes',
];
const CONTACT_HEADER = [
  'Timestamp (IST)', 'Name', 'Phone', 'Email', 'Inquiry Topic',
  'Message', 'Reference', 'Status', 'Staff Notes',
];

async function restoreHeader(tab, range, header) {
  // Check current state first
  const cur = await sheets.spreadsheets.values.get({ spreadsheetId: sid, range: tab });
  const existing = cur.data.values || [];
  console.log(tab + ' before: ' + existing.length + ' row(s)' + (existing.length === 0 ? ' (EMPTY)' : ''));

  await sheets.spreadsheets.values.update({
    spreadsheetId: sid,
    range,
    valueInputOption: 'RAW',
    requestBody: { values: [header] },
  });
  console.log(tab + ': header restored -> ' + JSON.stringify(header).slice(0, 120));

  // Verify
  const after = await sheets.spreadsheets.values.get({ spreadsheetId: sid, range: tab });
  console.log(tab + ' after: ' + (after.data.values ? after.data.values.length : 0) + ' row(s)');
}

(async () => {
  await restoreHeader('Booking Requests', 'Booking Requests!A1:K1', BOOKING_HEADER);
  await restoreHeader('Contact Inquiries', 'Contact Inquiries!A1:I1', CONTACT_HEADER);
  console.log('Done.');
})().catch((e) => { console.error('RESTORE_ERR:', e.message); process.exit(1); });
