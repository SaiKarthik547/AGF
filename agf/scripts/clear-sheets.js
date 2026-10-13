#!/usr/bin/env node
/**
 * AGF — Clear Google Sheets Test Data
 *
 * Deletes all data rows from the:
 *   - Booking Requests tab
 *   - Contact Inquiries tab
 *
 * Leaves the header row and formatting intact. This is intended for local
 * testing only. Do not use this as a production cleanup endpoint.
 *
 * Usage:
 *   cd agf
 *   node scripts/clear-sheets.js
 *
 * Requirements (from .env.local or environment):
 *   GOOGLE_SHEETS_SPREADSHEET_ID
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL
 *   GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
 *
 * This script must run with the same credentials the app uses, and the
 * service account must have write access to the spreadsheet.
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const { google } = require('googleapis');
const { createInterface } = require('readline');

function getEnv(name) {
  const value = process.env[name];
  if (!value || value.trim().length === 0) {
    throw new Error('Missing required environment variable: ' + name);
  }
  return value.trim();
}

function askConfirm(rl, question) {
  return new Promise(function(resolve) {
    rl.question(question, function(answer) {
      const cleaned = String(answer).trim().toLowerCase();
      resolve(cleaned === 'y' || cleaned === 'yes');
    });
  });
}

function getSheetId(sheetsClient, spreadsheetId, tabName) {
  return sheetsClient.spreadsheets.get({
    spreadsheetId: spreadsheetId,
    fields: 'sheets(properties(title,sheetId))',
  }).then(function(info) {
    const sheet = info.data.sheets && info.data.sheets.find(function(s) {
      return s.properties && s.properties.title === tabName;
    });
    if (!sheet || !sheet.properties || !sheet.properties.sheetId) {
      throw new Error('Tab not found: ' + tabName);
    }
    return sheet.properties.sheetId;
  });
}

function clearTab(sheetsClient, spreadsheetId, tabName) {
  // Read the tab's full used range (a bare sheet name expands to it).
  // A single-cell range like "Tab!A1" would read only the header cell and
  // make every tab look empty.
  const range = tabName;
  return sheetsClient.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    range: range,
  }).then(function(response) {
    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      console.log('  ' + tabName + ': no rows found.');
      return;
    }

    const dataRowCount = rows.length - 1;
    console.log('  ' + tabName + ': found ' + rows.length + ' row(s) including header, ' + dataRowCount + ' data row(s).');

    if (dataRowCount === 0) {
      return;
    }

    const lastRow = rows.length;
    // deleteDimension needs the numeric sheetId — getSheetId returns a
    // promise, so it must be resolved before building the request body.
    return getSheetId(sheetsClient, spreadsheetId, tabName).then(function(sheetId) {
      return sheetsClient.spreadsheets.batchUpdate({
        spreadsheetId: spreadsheetId,
        requestBody: {
          requests: [
            {
              deleteDimension: {
                range: {
                  sheetId: sheetId,
                  dimension: 'ROWS',
                  startIndex: 1,
                  endIndex: lastRow,
                },
              },
            },
          ],
        },
      });
    });
  });
}

function main() {
  // getEnv() is synchronous and returns a string — do not chain .then() on it.
  const spreadsheetId = getEnv('GOOGLE_SHEETS_SPREADSHEET_ID');
  const serviceAccountEmail = getEnv('GOOGLE_SERVICE_ACCOUNT_EMAIL');
  const privateKey = getEnv('GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY');

  console.log('Spreadsheet ID:', spreadsheetId);
  console.log('Service account:', serviceAccountEmail);
  console.log('PrivateKey present:', privateKey.startsWith('-----BEGIN PRIVATE KEY-----'));

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: serviceAccountEmail,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheetsClient = google.sheets({ version: 'v4', auth });
  const rl = createInterface({ input: process.stdin, output: process.stdout });

  console.log('');
  console.log('WARNING: This will delete all rows under the header row in:');
  console.log('  - Booking Requests');
  console.log('  - Contact Inquiries');
  console.log('It will not delete the header row itself.');
  console.log('');

  return askConfirm(rl, 'Type Y to continue: ').then(function(ok) {
    rl.close();
    if (!ok) {
      console.log('Aborted.');
      return;
    }

    console.log('');
    console.log('Clearing Booking Requests...');
    return clearTab(sheetsClient, spreadsheetId, 'Booking Requests')
      .then(function() {
        console.log('Cleared Booking Requests.');
        console.log('Clearing Contact Inquiries...');
        return clearTab(sheetsClient, spreadsheetId, 'Contact Inquiries');
      })
      .then(function() {
        console.log('Cleared Contact Inquiries.');
        console.log('');
        console.log('Done. Both tabs should now contain only the header row.');
      });
  });
}

main().catch(function(error) {
  console.error('Error:', error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
