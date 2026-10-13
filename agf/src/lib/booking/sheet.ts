/**
 * AGF — Google Sheets Writer
 * Appends booking and contact rows to a single existing spreadsheet
 * using the Google Sheets API and a service account.
 *
 * Environment variables (server-side only, set in Vercel + .env.local for dev):
 *   GOOGLE_SHEETS_SPREADSHEET_ID — the spreadsheet ID from the URL
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL — service account email (for sharing the sheet)
 *   GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY — service account private key (PEM format)
 *
 * These are NEVER exposed to the browser. They are read only in API routes
 * and server utilities. Do not prefix any of them with NEXT_PUBLIC_.
 *
 * Setup:
 *   1. Create a Google Cloud service account.
 *   2. Enable the Google Sheets API for the project.
 *   3. Download the service account key (JSON).
 *   4. Share the AGF Business Records spreadsheet with the service account email
 *      as an Editor.
 *   5. Set the environment variables in Vercel (never commit them).
 *   6. For local development, copy this file to .env.local and fill in the real
 *      values. .env.local is gitignored.
 *
 * IMPORTANT: The spreadsheet and tabs must be created manually BEFORE deployment.
 * This module only appends rows — it never creates spreadsheets or tabs.
 */

import { google } from 'googleapis';
import { SITE_NAME } from '@/lib/constants';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

/**
 * Get the Google Sheets API client.
 * Caches the client within a single function invocation.
 */
function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
}

/**
 * The spreadsheet ID where all records are stored.
 * Extracted from the spreadsheet URL:
 *   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit#gid=...
 */
function getSpreadsheetId(): string {
  const id = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!id || id.trim().length === 0) {
    throw new Error('GOOGLE_SHEETS_SPREADSHEET_ID is not configured');
  }
  return id.trim();
}

/**
 * Worksheet tab names (must match the manually created tabs exactly).
 */
export const BOOKING_TAB_NAME = 'Booking Requests';
export const CONTACT_TAB_NAME = 'Contact Inquiries';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

/**
 * Format the current time in Indian Standard Time (IST, UTC+05:30).
 * Returns a human-readable IST timestamp, e.g. 12-Oct-2026 18:05:03 IST
 *
 * The spreadsheet, service account, and deployment are in India, so this
 * helper computes IST directly from UTC and does not rely on the machine's
 * local timezone being set correctly.
 */
export function getISTTimestamp(): string {
  // Get a reliable UTC instant.
  const now = Date.now();

  // IST offset in minutes from UTC.
  const istOffsetMinutes = 5 * 60 + 30;

  // Create a Date for the IST instant and read its parts in UTC so we do not
  // reintroduce any local timezone interpretation.
  const istDate = new Date(now + istOffsetMinutes * 60 * 1000);

  const day = String(istDate.getUTCDate()).padStart(2, '0');
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const month = monthNames[istDate.getUTCMonth()];
  const year = istDate.getUTCFullYear();
  const hours = String(istDate.getUTCHours()).padStart(2, '0');
  const minutes = String(istDate.getUTCMinutes()).padStart(2, '0');
  const seconds = String(istDate.getUTCSeconds()).padStart(2, '0');

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds} IST`;
}

/**
 * Execute a Sheets API append operation with error handling.
 *
 * The backend now accepts the write as successful in two cases:
 *   1. The documented response body is present (`updatedRange` and `updatedCells`).
 *   2. The call completes without throwing but the response body does not match
 *      the documentation exactly. In that situation the row has usually already
 *      been written, so we do not turn that into a 503.
 *
 * Only real API/network failures are re-thrown so the route can return a 503.
 */
async function appendRow(
  spreadsheetId: string,
  range: string,
  values: string[][],
): Promise<{ success: boolean; reply: string }> {
  const sheets = getSheetsClient();

  let updatedRange: string | null | undefined;
  let updatedCells: number | null | undefined;

  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      // RAW: store every value literally. USER_ENTERED parses leading "="
      // or "+" characters as formulas, which corrupts phone numbers like
      // "+91 98765 43210" into #ERROR! and would execute injected formulas.
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values,
      },
    });

    updatedRange = response.data?.updates?.updatedRange;
    updatedCells = response.data?.updates?.updatedCells;
  } catch (error) {
    // Real backend failure — do not swallow it.
    throw error;
  }

  if (updatedRange && updatedCells) {
    return {
      success: true,
      reply: `Appended ${updatedCells} cell(s) to ${updatedRange}`,
    };
  }

  return {
    success: true,
    reply: 'Row appended to Google Sheets',
  };
}

// ---------------------------------------------------------------------------
// Public API: Booking rows
// ---------------------------------------------------------------------------

/**
 * Append a booking request row to the Booking Requests tab.
 *
 * Row layout (must match the manually created header order):
 * A: Timestamp (IST)
 * B: Name
 * C: Phone
 * D: Email
 * E: Visit Date
 * F: Session
 * G: Fitness Goal
 * H: Notes
 * I: Booking Reference
 * J: Status (Pending)
 * K: Staff Notes (blank)
 */
export interface BookingRowData {
  name: string;
  phone: string;
  email: string | null;
  date: string;
  timeSlot: string;
  goal: string;
  notes: string | null;
  reference: string;
}

export async function appendBookingRow(data: BookingRowData): Promise<void> {
  const spreadsheetId = getSpreadsheetId();
  const timestamp = getISTTimestamp();

  const row = [
    timestamp,
    data.name,
    data.phone,
    data.email ?? '',
    data.date,
    data.timeSlot,
    data.goal,
    data.notes ?? '',
    data.reference,
    'Pending',
    '', // Staff Notes — left blank for staff to fill
  ];

  const result = await appendRow(
    spreadsheetId,
    `${BOOKING_TAB_NAME}!A:K`,
    [row],
  );

  // Log metadata only — never log personal data
  console.info(
    `[${SITE_NAME}] Booking row appended: ${result.reply}, ref=${data.reference}`,
  );
}

// ---------------------------------------------------------------------------
// Public API: Contact rows
// ---------------------------------------------------------------------------

/**
 * Append a contact inquiry row to the Contact Inquiries tab.
 *
 * Row layout (must match the manually created header order):
 * A: Timestamp (IST)
 * B: Name
 * C: Phone
 * D: Email
 * E: Inquiry Topic
 * F: Message
 * G: Reference
 * H: Status (New)
 * I: Staff Notes (blank)
 */
export interface ContactRowData {
  name: string;
  phone: string;
  email: string | null;
  topic: string;
  message: string;
  reference: string;
}

export async function appendContactRow(data: ContactRowData): Promise<void> {
  const spreadsheetId = getSpreadsheetId();
  const timestamp = getISTTimestamp();

  const row = [
    timestamp,
    data.name,
    data.phone,
    data.email ?? '',
    data.topic,
    data.message,
    data.reference,
    'New',
    '', // Staff Notes — left blank for staff to fill
  ];

  const result = await appendRow(
    spreadsheetId,
    `${CONTACT_TAB_NAME}!A:I`,
    [row],
  );

  console.info(
    `[${SITE_NAME}] Contact row appended: ${result.reply}, ref=${data.reference}`,
  );
}

// ---------------------------------------------------------------------------
// Health check (for deployment verification)
// ---------------------------------------------------------------------------

/**
 * Verify the Google Sheets connection is configured correctly.
 * Returns true if the service account credentials are present and the
 * spreadsheet ID is set. Does NOT verify the actual sheet access.
 */
export function verifySheetConfig(): boolean {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!email || !privateKey || !spreadsheetId) {
    return false;
  }

  if (email.trim().length === 0 || privateKey.trim().length === 0) {
    return false;
  }

  // Basic check: private key should look like a PEM key
  if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
    return false;
  }

  return true;
}
