/**
 * AGF — Booking Submission API
 * POST /api/bookings
 *
 * Accepts walkthrough booking requests from the /book-a-visit form,
 * validates them server-side, and appends a complete row to the
 * Booking Requests tab in the AGF Business Records spreadsheet.
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
 *   - Generates a booking reference
 *   - Writes a complete row to Google Sheets
 *   - Returns the reference only on successful write
 */

import { NextRequest } from 'next/server';
import {
  validateBooking,
  sanitizeBooking,
} from '@/lib/booking/schema';
import {
  appendBookingRow,
  BOOKING_TAB_NAME,
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
        // No Content-Type header at all — not a legitimate form or fetch call.
        return unsupportedMediaTypeResponse();
      } else {
        // Anything else (text/plain, XML, protobuf, …) is rejected outright.
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
      date: getField('date'),
      timeSlot: getField('timeSlot'),
      goal: getField('goal'),
      notes: getField('notes'),
    };

    const validation = validateBooking(rawData);
    if (!validation.valid) {
      return validationErrorResponse(validation.errors as Record<string, string>);
    }

    const sanitized = sanitizeBooking(rawData);

    // -----------------------------------------------------------------------
    // 5b. Per-device cooldown — one successful submission per device,
    //     then a friendly wait. Checked BEFORE quota so a spammy device
    //     can never burn the day's real slots.
    // -----------------------------------------------------------------------
    const deviceId = getDeviceId(request);
    const cooldown = checkSubmissionCooldown(deviceId, ip);
    if (!cooldown.allowed) {
      return cooldownResponse(cooldown.retryAfter);
    }

    // -----------------------------------------------------------------------
    // 5c. Daily quota check — friendly "try again tomorrow" when exhausted
    // -----------------------------------------------------------------------
    const quota = checkDailyQuota('booking');
    if (!quota.allowed) {
      return quotaExceededResponse('booking');
    }

    // -----------------------------------------------------------------------
    // 6. Generate booking reference
    // -----------------------------------------------------------------------
    const reference = generateBookingReference();

    // -----------------------------------------------------------------------
    // 8. Append to Google Sheets
    // -----------------------------------------------------------------------
    await appendBookingRow({
      name: sanitized.name,
      phone: sanitized.phone,
      email: sanitized.email,
      date: sanitized.date,
      timeSlot: sanitized.timeSlot,
      goal: sanitized.goal,
      notes: sanitized.notes,
      reference,
    });

    // The write succeeded — count it against today's quota and start the
    // per-device cooldown so this device cannot immediately submit again.
    incrementDailyQuota('booking');
    const effectiveDeviceId = deviceId ?? generateDeviceId();
    recordSubmissionCooldown(effectiveDeviceId, ip);

    // -----------------------------------------------------------------------
    // 8. Return success (with the device cookie attached)
    // -----------------------------------------------------------------------
    const response = successResponse(
      reference,
      'Your walkthrough request has been received. Our team will call or message your phone to confirm your arrival time.',
    );
    if (!deviceId) {
      attachDeviceCookie(response, effectiveDeviceId);
    }
    return response;
  } catch (error) {
    console.error('[AGF] Booking API error:', error);

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
