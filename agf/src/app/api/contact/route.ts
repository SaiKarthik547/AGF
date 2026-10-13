/**
 * AGF — Contact Submission API
 * POST /api/contact
 *
 * Accepts contact inquiries from the /contact form,
 * validates them server-side, and appends a complete row to the
 * Contact Inquiries tab in the AGF Business Records spreadsheet.
 *
 * Environment variables (server-side only, set in Vercel + .env.local for dev):
 *   GOOGLE_SHEETS_SPREADSHEET_ID
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL
 *   GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
 *
 * These are read only in this server route. They are never exposed to the
 * browser and must not be prefixed with NEXT_PUBLIC_.
 *
 * For local development, set these in .env.local (gitignored). For production,
 * set them in Vercel's environment variables UI.
 *
 * This route:
 *   - Validates all fields server-side
 *   - Detects honeypot spam
 *   - Checks rate limits per IP
 *   - Generates a reference
 *   - Writes a complete row to Google Sheets
 *   - Returns the reference only on successful write
 *
 * IMPORTANT: This is a SEPARATE endpoint from /api/bookings.
 * Contact inquiries go to the Contact Inquiries tab, not Booking Requests.
 */

import { NextRequest } from 'next/server';
import {
  validateContact,
  sanitizeContact,
} from '@/lib/booking/contact-schema';
import {
  appendContactRow,
  CONTACT_TAB_NAME,
} from '@/lib/booking/sheet';
import {
  generateBookingReference,
} from '@/lib/booking/reference';
import {
  isHoneypotSpam,
  checkRateLimit,
  checkDailyQuota,
  incrementDailyQuota,
  rateLimitedResponse,
  quotaExceededResponse,
  cooldownResponse,
  checkSubmissionCooldown,
  recordSubmissionCooldown,
  getDeviceId,
  generateDeviceId,
  attachDeviceCookie,
  badRequestResponse,
  unsupportedMediaTypeResponse,
  getClientIP,
  successResponse,
  validationErrorResponse,
  serviceErrorResponse,
} from '@/lib/booking/server';

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    // -----------------------------------------------------------------------
    // 1. Parse the request body — strict content-type allow-list
    // -----------------------------------------------------------------------
    let body: Record<string, string>;

    const contentType = (request.headers.get('content-type') ?? '').toLowerCase();

    try {
      if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
        const formData = await request.formData();
        body = Object.fromEntries(
          Array.from(formData.entries()).map(([key, value]) => [
            key,
            String(value),
          ]),
        );
      } else if (contentType.includes('application/json')) {
        const parsed = await request.json();
        if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
          return badRequestResponse('The request body must be a JSON object.');
        }
        body = parsed as Record<string, string>;
      } else if (contentType.trim().length === 0) {
        return unsupportedMediaTypeResponse();
      } else {
        return unsupportedMediaTypeResponse();
      }
    } catch {
      // Malformed JSON / broken multipart body — never reaches Sheets.
      return badRequestResponse();
    }

    // Helper to safely get string fields
    const getField = (name: string): string => {
      const val = body[name];
      return typeof val === 'string' ? val : '';
    };

    // -----------------------------------------------------------------------
    // 2. Extract client IP for rate limiting
    // -----------------------------------------------------------------------
    const ip = getClientIP(request);

    // -----------------------------------------------------------------------
    // 3. Rate limit check
    // -----------------------------------------------------------------------
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return rateLimitedResponse(rateLimit.resetAt);
    }

    // -----------------------------------------------------------------------
    // 4. Honeypot check
    // -----------------------------------------------------------------------
    if (isHoneypotSpam(body)) {
      // Return a "success" response to trick bots, but don't write to sheet
      return successResponse(
        'THANK_YOU',
        'Your message has been received.',
      );
    }

    // -----------------------------------------------------------------------
    // 5. Extract and validate fields
    // -----------------------------------------------------------------------
    const rawData = {
      name: getField('name'),
      phone: getField('phone'),
      email: getField('email'),
      topic: getField('topic'),
      message: getField('message'),
    };

    const validation = validateContact(rawData);
    if (!validation.valid) {
      return validationErrorResponse(validation.errors as Record<string, string>);
    }

    const sanitized = sanitizeContact(rawData);

    // -----------------------------------------------------------------------
    // 5b. Per-device cooldown — one successful submission per device,
    //     then a friendly wait. Checked BEFORE quota so a spammy device
    //     can never burn the day's real message allowance.
    // -----------------------------------------------------------------------
    const deviceId = getDeviceId(request);
    const cooldown = checkSubmissionCooldown(deviceId, ip);
    if (!cooldown.allowed) {
      return cooldownResponse(cooldown.retryAfter);
    }

    // -----------------------------------------------------------------------
    // 5c. Daily quota check — friendly "try again tomorrow" when exhausted
    // -----------------------------------------------------------------------
    const quota = checkDailyQuota('contact');
    if (!quota.allowed) {
      return quotaExceededResponse('contact');
    }

    // -----------------------------------------------------------------------
    // 6. Generate reference
    // -----------------------------------------------------------------------
    const reference = generateBookingReference();

    // -----------------------------------------------------------------------
    // 8. Append to Google Sheets (Contact Inquiries tab)
    // -----------------------------------------------------------------------
    await appendContactRow({
      name: sanitized.name,
      phone: sanitized.phone,
      email: sanitized.email,
      topic: sanitized.topic,
      message: sanitized.message,
      reference,
    });

    // The write succeeded — count it against today's quota and start the
    // per-device cooldown so this device cannot immediately submit again.
    incrementDailyQuota('contact');
    const effectiveDeviceId = deviceId ?? generateDeviceId();
    recordSubmissionCooldown(effectiveDeviceId, ip);

    // -----------------------------------------------------------------------
    // 7. Return success (with the device cookie attached)
    // -----------------------------------------------------------------------
    const response = successResponse(
      reference,
      'Your message has been received. Our team will be in touch with you shortly at the phone number you provided.',
    );
    if (!deviceId) {
      attachDeviceCookie(response, effectiveDeviceId);
    }
    return response;
  } catch (error) {
    console.error('[AGF] Contact API error:', error);

    // If it's already a Response object (from our helpers), return it
    if (error instanceof Response) {
      return error;
    }

    // Service unavailable for unexpected errors
    return serviceErrorResponse();
  }
}

// -------------------------------------------------------------------------
// Allowed methods
// -------------------------------------------------------------------------

export async function GET() {
  return new Response(
    JSON.stringify({
      ok: false,
      error: 'method_not_allowed',
      message: 'This endpoint only accepts POST requests.',
    }),
    {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}
