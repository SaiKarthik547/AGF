#!/usr/bin/env node
/**
 * Verify the Google Sheets API is healthy: write one booking + one contact row
 * slowly (avoids triggering the per-minute write quota), then confirm they're
 * readable back. Cleans up the two test rows afterwards.
 *
 * Usage: cd agf && node scripts/verify-sheets-write.js
 */
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '..', '.env.local');
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

const TOMORROW = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
const bookingRef = 'VERIFY-BOOKING-01';
const contactRef = 'VERIFY-CONTACT-01';

const bookingRow = [
  '14-Oct-2026 12:00:00 IST', 'VerifyTest', '+91 98765 43210',
  'verify@test.com', TOMORROW, 'Morning (6:00 AM – 10:00 AM)',
  'Strength Training', 'sheets write verification', bookingRef, 'Pending', '',
];
const contactRow = [
  '14-Oct-2026 12:00:01 IST', 'VerifyTest', '+91 98765 43210',
  'verify@test.com', 'General Inquiry', 'sheets write verification',
  contactRef, 'New', '',
];

function rowFound(rows, refCol, ref) {
  return rows.find((r) => r[refCol] === ref);
}

async function main() {
  // Snapshot baseline
  const beforeB = ((await sheets.spreadsheets.values.get({ spreadsheetId: sid, range: 'Booking Requests' })).data.values || []).length;
  const beforeC = ((await sheets.spreadsheets.values.get({ spreadsheetId: sid, range: 'Contact Inquiries' })).data.values || []).length;
  console.log('Baseline: Booking Requests=' + beforeB + ' row(s), Contact Inquiries=' + beforeC + ' row(s)');

  // Write booking
  console.log('\nWriting booking row (ref=' + bookingRef + ')...');
  const t1 = Date.now();
  const br = await sheets.spreadsheets.values.append({
    spreadsheetId: sid,
    range: 'Booking Requests!A:K',
    valueInputOption: 'RAW',
    insertDataOption: 'OVERWRITE',
    requestBody: { values: [bookingRow] },
  });
  console.log('Booking write latency: ' + (Date.now() - t1) + 'ms');
  if (br.data?.updates?.updatedRange) {
    console.log('Booking write OK -> ' + br.data.updates.updatedRange);
  } else {
    console.log('Booking write: unexpected response (no updatedRange). Response:', JSON.stringify(br.data).slice(0, 300));
  }

  // Pause to avoid hitting per-minute write quota
  console.log('Pausing 10s to stay clear of per-minute Sheets write quota...');
  await new Promise((r) => setTimeout(r, 10000));

  // Write contact
  console.log('\nWriting contact row (ref=' + contactRef + ')...');
  const t2 = Date.now();
  const cr = await sheets.spreadsheets.values.append({
    spreadsheetId: sid,
    range: 'Contact Inquiries!A:I',
    valueInputOption: 'RAW',
    insertDataOption: 'OVERWRITE',
    requestBody: { values: [contactRow] },
  });
  console.log('Contact write latency: ' + (Date.now() - t2) + 'ms');
  if (cr.data?.updates?.updatedRange) {
    console.log('Contact write OK -> ' + cr.data.updates.updatedRange);
  } else {
    console.log('Contact write: unexpected response (no updatedRange). Response:', JSON.stringify(cr.data).slice(0, 300));
  }

  // Read back
  console.log('\nReading back...');
  const afterB = ((await sheets.spreadsheets.values.get({ spreadsheetId: sid, range: 'Booking Requests' })).data.values || []);
  const afterC = ((await sheets.spreadsheets.values.get({ spreadsheetId: sid, range: 'Contact Inquiries' })).data.values || []);
  const bookingRowBack = rowFound(afterB, 8, bookingRef);
  const contactRowBack = rowFound(afterC, 6, contactRef);

  console.log('Booking Requests now: ' + afterB.length + ' row(s) (delta=' + (afterB.length - beforeB) + ')');
  console.log('Contact Inquiries now: ' + afterC.length + ' row(s) (delta=' + (afterC.length - beforeC) + ')');

  if (bookingRowBack) {
    console.log('Booking row read back: ref=' + bookingRowBack[8] + ', phone=' + bookingRowBack[2] + ', status=' + bookingRowBack[9]);
    console.log('  phone is literal (not #ERROR!): ' + (bookingRowBack[2] === '+91 98765 43210'));
  } else {
    console.log('Booking row NOT found by ref!');
  }
  if (contactRowBack) {
    console.log('Contact row read back: ref=' + contactRowBack[6] + ', phone=' + contactRowBack[2] + ', status=' + contactRowBack[7]);
    console.log('  phone is literal (not #ERROR!): ' + (contactRowBack[2] === '+91 98765 43210'));
  } else {
    console.log('Contact row NOT found by ref!');
  }

  // Clean up test rows
  console.log('\nCleaning up test rows...');
  await sheets.spreadsheets.values.clear({ spreadsheetId: sid, range: 'Booking Requests!A:K' });
  await sheets.spreadsheets.values.clear({ spreadsheetId: sid, range: 'Contact Inquiries!A:I' });
  // Restore headers (clear wiped them)
  await sheets.spreadsheets.values.update({
    spreadsheetId: sid,
    range: 'Booking Requests!A1:K1',
    valueInputOption: 'RAW',
    requestBody: { values: [['Timestamp (IST)','Name','Phone','Email','Visit Date','Session','Fitness Goal','Notes','Booking Reference','Status','Staff Notes']] },
  });
  await sheets.spreadsheets.values.update({
    spreadsheetId: sid,
    range: 'Contact Inquiries!A1:I1',
    valueInputOption: 'RAW',
    requestBody: { values: [['Timestamp (IST)','Name','Phone','Email','Inquiry Topic','Message','Reference','Status','Staff Notes']] },
  });
  console.log('Headers restored, test rows removed.');

  // Final verify
  const finalB = ((await sheets.spreadsheets.values.get({ spreadsheetId: sid, range: 'Booking Requests' })).data.values || []).length;
  const finalC = ((await sheets.spreadsheets.values.get({ spreadsheetId: sid, range: 'Contact Inquiries' })).data.values || []).length;
  console.log('Final state: Booking Requests=' + finalB + ' row(s), Contact Inquiries=' + finalC + ' row(s)');
}

main().catch((e) => {
  console.error('VERIFY_ERR:', e.message);
  if (e.message.includes('quota')) console.error('=> Google Sheets WRITE QUOTA LIMIT HIT');
  process.exit(1);
});
