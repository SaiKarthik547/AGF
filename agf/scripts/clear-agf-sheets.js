#!/usr/bin/env node
/**
 * One-shot: clear all data rows (keep header) from Booking Requests and
 * Contact Inquiries, using the same .env.local Google credentials the app uses.
 * Non-interactive (unlike scripts/clear-sheets.js).
 *
 * Usage: cd agf && node scripts/clear-agf-sheets.js
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

async function clearTab(tab) {
  const res = await sheets.spreadsheets.values.get({ spreadsheetId: sid, range: tab });
  const rows = res.data.values || [];
  if (rows.length <= 1) { console.log(tab + ': already empty (header only)'); return; }
  console.log(tab + ': ' + rows.length + ' rows, clearing ' + (rows.length - 1) + ' data rows...');
  await sheets.spreadsheets.values.clear({ spreadsheetId: sid, range: tab });
  console.log(tab + ': cleared.');
}

(async () => {
  await clearTab('Booking Requests');
  await clearTab('Contact Inquiries');
  console.log('Done.');
})().catch((e) => { console.error('CLEAR_ERR:', e.message); process.exit(1); });
