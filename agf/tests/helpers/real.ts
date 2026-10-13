/**
 * Shared helpers for the LIVE test suites — no mocks anywhere.
 *
 *  - Talks to the real dev server over HTTP (E2E_BASE_URL or localhost:3000)
 *  - Reads (and cleans up) rows in the real Google Spreadsheet using the
 *    app's own service-account credentials, loaded from .env.local.
 *
 * The suites that import this module write real rows and then delete exactly
 * the rows they created (matched by reference + test name), so repeated test
 * runs do not pollute the business spreadsheet.
 */
import fs from 'node:fs';
import path from 'node:path';
import { google } from 'googleapis';

export const BASE_URL = process.env.E2E_BASE_URL || 'http://localhost:3000';

let envLoaded = false;

/** Load .env.local into process.env (without overriding existing vars). */
export function loadEnvLocal(): void {
  if (envLoaded) return;
  envLoaded = true;

  const envPath = path.resolve(process.cwd(), '.env.local');
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

let sheetsClient: ReturnType<typeof google.sheets> | null = null;

/** Real Google Sheets client (app credentials). */
export function getSheetsClient(): ReturnType<typeof google.sheets> {
  loadEnvLocal();
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  if (!email || !privateKey) {
    throw new Error(
      'Missing Google credentials. Create agf/.env.local with GOOGLE_SHEETS_SPREADSHEET_ID, ' +
        'GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.',
    );
  }
  if (!sheetsClient) {
    const auth = new google.auth.GoogleAuth({
      credentials: { client_email: email, private_key: privateKey },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    sheetsClient = google.sheets({ version: 'v4', auth });
  }
  return sheetsClient;
}

/** Read every row (including header) from a real tab. */
export async function readTab(tabName: string): Promise<string[][]> {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error('Missing GOOGLE_SHEETS_SPREADSHEET_ID in .env.local');
  }
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: tabName,
  });
  return (res.data.values as string[][]) || [];
}

/**
 * Delete every data row (header excluded) matching the predicate.
 * Returns how many rows were actually deleted. Best-effort by design:
 * callers wrap this in try/catch so a cleanup failure never masks a
 * test result.
 */
export async function deleteRowsWhere(
  tabName: string,
  match: (row: string[]) => boolean,
): Promise<number> {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!spreadsheetId) return 0;

  const rows = await readTab(tabName);
  const indices: number[] = [];
  rows.forEach((row, i) => {
    if (i > 0 && match(row)) indices.push(i); // skip header
  });
  if (indices.length === 0) return 0;

  const info = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: 'sheets(properties(title,sheetId))',
  });
  const sheet = info.data.sheets?.find(
    (s) => s.properties?.title === tabName,
  );
  const sheetId = sheet?.properties?.sheetId;
  if (sheetId === undefined || sheetId === null) {
    throw new Error(`Tab not found: ${tabName}`);
  }

  // Delete bottom-up so earlier indices stay valid.
  const requests = [...indices]
    .sort((a, b) => b - a)
    .map((i) => ({
      deleteDimension: {
        range: { sheetId, dimension: 'ROWS' as const, startIndex: i, endIndex: i + 1 },
      },
    }));

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: { requests },
  });
  return indices.length;
}

let ipCounter = 0;

/**
 * A unique documentation-range IP per call so every test gets its own
 * rate-limit bucket and cooldown key (the server keys both on IP).
 */
export function nextIP(): string {
  ipCounter += 1;
  const major = Math.floor(ipCounter / 250);
  const minor = (ipCounter % 250) + 1;
  return `198.51.${major}.${minor}`;
}

/** Local-date YYYY-MM-DD offset from today (matches the server's own rules). */
export function isoDay(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
}

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/** Fail fast with instructions when the dev server is not running. */
export async function assertServerReachable(): Promise<void> {
  try {
    const res = await fetch(`${BASE_URL}/`, {
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`server responded ${res.status}`);
  } catch (error) {
    throw new Error(
      `Live server not reachable at ${BASE_URL} (${error instanceof Error ? error.message : error}).\n` +
        'Start it first:\n' +
        '  cd agf && AGF_BOOKING_DAILY_LIMIT=2 AGF_CONTACT_DAILY_LIMIT=2 npm run dev',
    );
  }
}
