#!/usr/bin/env node
/** Lists row indexes + first cells of both tabs so test rows can be identified. */
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let v = m[2];
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
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

async function main() {
  for (const tab of ['Booking Requests', 'Contact Inquiries']) {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: tab,
    });
    const rows = res.data.values || [];
    console.log(`\n=== ${tab} (${rows.length} rows) ===`);
    rows.forEach((row, i) => {
      const isTest = row.some((c) => String(c).includes('E2E Test User'));
      console.log(`  row ${i + 1}${isTest ? ' [E2E TEST]' : ''}: ${JSON.stringify(row).slice(0, 160)}`);
    });
  }
}
main().catch((e) => { console.error(e.message); process.exit(1); });
