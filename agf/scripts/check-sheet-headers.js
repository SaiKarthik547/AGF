#!/usr/bin/env node
/**
 * Check whether the sheet headers still exist (query explicit A1 ranges
 * in case range: tabName has a quirk).
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

async function main() {
  for (const [tab, range] of [['Booking Requests', 'Booking Requests!A1:K1'], ['Contact Inquiries', 'Contact Inquiries!A1:I1']]) {
    const res = await sheets.spreadsheets.values.get({ spreadsheetId: sid, range });
    const rows = res.data.values || [];
    console.log(tab + ' (range ' + range + '): ' + rows.length + ' row(s)');
    if (rows.length > 0) console.log('  header: ' + JSON.stringify(rows[0]).slice(0, 200));
    // Also get full tab
    const full = await sheets.spreadsheets.values.get({ spreadsheetId: sid, range: tab });
    console.log(tab + ' full tab: ' + (full.data.values ? full.data.values.length : 0) + ' row(s)');
  }
}
main().catch((e) => { console.error(e.message); process.exit(1); });
