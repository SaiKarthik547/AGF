/**
 * AGF — Server Utilities for Form Submissions
 * Shared helpers for spam protection, deduplication, and rate limiting.
 *
 * Layered defence (all free, appropriate for a low-volume gym website):
 *   1. Per-IP request rate limit      (burst protection)
 *   2. Honeypot field                 (bot trap)
 *   3. Server-side field validation   (mandatory + strict phone rules)
 *   4. Per-device submission cooldown (no repeat submits for 10 minutes)
 *   5. Daily per-endpoint quota       (friendly "try again tomorrow" 429)
 * For stronger protection later, consider a CAPTCHA service.
 */

// ---------------------------------------------------------------------------
// Honeypot
// ---------------------------------------------------------------------------

/**
 * Honeypot field name — should look innocent but be hidden from real users.
 * Use a field name that bots might fill but humans won't see.
 */
export const HONEYPOT_FIELD = 'website_url';

/**
 * Check if a submission is likely spam based on honeypot field.
 * If the honeypot field has any value, treat as spam.
 */
export function isHoneypotSpam(formData: Record<string, string>): boolean {
  const honeypotValue = formData[HONEYPOT_FIELD]?.trim();
  return honeypotValue !== undefined && honeypotValue !== '';
}

/**
 * Generate a honeypot field name that looks like a legitimate field.
 * This makes it less obvious to bots.
 */
export function generateHoneypotFieldName(): string {
  // Rotate through a few plausible-sounding field names
  const fields = ['website_url', 'redirect_url', 'referrer', 'source_url'];
  const index = Math.floor(Math.random() * fields.length);
  return fields[index];
}

// ---------------------------------------------------------------------------
// Device identity + Submission Cooldown (per-device anti-spam)
// ---------------------------------------------------------------------------

const DEVICE_COOKIE_NAME = 'agf_device';
const DEVICE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year

/**
 * In-memory cooldown store: key → expiry timestamp (ms).
 * Same per-instance trade-off as the rate limiter above.
 */
const cooldownStore = new Map<string, number>();

function getCooldownSeconds(): number {
  const raw = process.env.AGF_SUBMISSION_COOLDOWN_SECONDS;
  if (raw && /^\d+$/.test(raw.trim())) {
    return Number.parseInt(raw.trim(), 10);
  }
  return 600; // 10 minutes — one submission per device per 10 minutes
}

/** Generate a random per-device identifier (32 hex chars). */
export function generateDeviceId(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Read the device id from the request's Cookie header.
 * The value is format-checked so a crafted cookie can never become a
 * key-injection vector.
 */
export function getDeviceId(request: Request): string | null {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return null;

  for (const part of cookieHeader.split(';')) {
    const [key, ...rest] = part.trim().split('=');
    if (key === DEVICE_COOKIE_NAME) {
      const value = rest.join('=');
      return /^[0-9a-f]{32}$/.test(value) ? value : null;
    }
  }
  return null;
}

/**
 * Check the submission cooldown for this request.
 * Devices with a cookie are keyed per device; cookie-less clients fall back
 * to their IP so the cooldown still applies.
 */
export function checkSubmissionCooldown(
  deviceId: string | null,
  ip: string,
): { allowed: boolean; retryAfter: number } {
  const key = deviceId ? `dev:${deviceId}` : `ip:${ip}`;
  const expiry = cooldownStore.get(key);
  const now = Date.now();

  if (expiry !== undefined && expiry > now) {
    return { allowed: false, retryAfter: Math.ceil((expiry - now) / 1000) };
  }
  if (expiry !== undefined) cooldownStore.delete(key);
  return { allowed: true, retryAfter: 0 };
}

/**
 * Record a successful submission against BOTH the device key and the IP key.
 * Recording both means the cooldown holds whether the client echoes the
 * device cookie back or not (e.g. cleared cookies), while a different device
 * behind the same NAT is only blocked through the cookie-less IP path.
 */
export function recordSubmissionCooldown(deviceId: string, ip: string): void {
  const expiry = Date.now() + getCooldownSeconds() * 1000;
  cooldownStore.set(`dev:${deviceId}`, expiry);
  cooldownStore.set(`ip:${ip}`, expiry);
}

// ---------------------------------------------------------------------------
// Rate Limiting (IP-based, simple sliding window)
// ---------------------------------------------------------------------------

/**
 * In-memory rate limit store.
 * WARNING: In Vercel serverless, this is per-instance and not shared.
 * For a more robust solution, use a shared store or Vercel's rate limiting.
 *
 * For AGF's low traffic volume, this provides basic protection against
 * rapid repeated submissions from the same IP within a single instance.
 */
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_MAX = 10; // max submissions per window
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window

/**
 * Check if an IP has exceeded the rate limit.
 * Returns { allowed: boolean, remaining: number, resetAt: number }
 */
export function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  // Clean up expired records
  if (record && record.resetAt < now) {
    rateLimitStore.delete(ip);
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1, resetAt: now + RATE_LIMIT_WINDOW_MS };
  }

  if (!record) {
    // First request from this IP
    const resetAt = now + RATE_LIMIT_WINDOW_MS;
    rateLimitStore.set(ip, { count: 1, resetAt });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1, resetAt };
  }

  // Subsequent request
  if (record.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0, resetAt: record.resetAt };
  }

  record.count += 1;
  return { allowed: true, remaining: RATE_LIMIT_MAX - record.count, resetAt: record.resetAt };
}

/**
 * Get the client IP from request headers.
 * Handles various header names that proxies may use.
 */
export function getClientIP(request: Request): string {
  // Check common header names for the real IP
  const headersList = request.headers;

  const forwardedFor = headersList.get('x-forwarded-for');
  if (forwardedFor) {
    // Takes the first IP in the chain
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = headersList.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  // Fallback — in Vercel, this should not happen as they set x-forwarded-for
  return 'unknown';
}

// ---------------------------------------------------------------------------
// Daily Quotas (per endpoint, IST day)
// ---------------------------------------------------------------------------

/**
 * Daily submission quotas — a second layer of spam/abuse protection on top
 * of the per-IP rate limit. When a quota is exhausted, the API returns a
 * friendly 429 telling the user to try again tomorrow.
 *
 * The window is a calendar day in IST (UTC+05:30) since the business and its
 * customers are in India.
 *
 * Quotas are intentionally generous (“more than enough” for real visitors)
 * and can be tuned via environment variables without a code change:
 *   AGF_BOOKING_DAILY_LIMIT  (default 50)
 *   AGF_CONTACT_DAILY_LIMIT  (default 100)
 *
 * In Vercel serverless this is per-instance; for AGF's volume that is
 * sufficient, same trade-off as the rate limiter above.
 */
export type QuotaKind = 'booking' | 'contact';

const QUOTA_DEFAULTS: Record<QuotaKind, number> = {
  booking: 50,
  contact: 100,
};

const quotaStore = new Map<QuotaKind, { dayKey: string; count: number }>();

/** IST calendar-day key (YYYY-MM-DD) for the current instant. */
function getISTDayKey(now: number): string {
  const istOffsetMinutes = 5 * 60 + 30;
  const d = new Date(now + istOffsetMinutes * 60 * 1000);
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${d.getUTCFullYear()}-${month}-${day}`;
}

function getQuotaLimit(kind: QuotaKind): number {
  const envName =
    kind === 'booking' ? 'AGF_BOOKING_DAILY_LIMIT' : 'AGF_CONTACT_DAILY_LIMIT';
  const raw = process.env[envName];
  if (raw && /^\d+$/.test(raw.trim())) {
    const parsed = Number.parseInt(raw.trim(), 10);
    if (parsed > 0) return parsed;
  }
  return QUOTA_DEFAULTS[kind];
}

/** Milliseconds until the next IST midnight (for Retry-After). */
function msUntilNextISTDay(now: number): number {
  const istOffsetMinutes = 5 * 60 + 30;
  const istNow = now + istOffsetMinutes * 60 * 1000;
  const dayMs = 24 * 60 * 60 * 1000;
  return dayMs - (istNow % dayMs);
}

/**
 * Check whether the daily quota for an endpoint still has capacity.
 * Counts only *successful* submissions (increment after a real write).
 */
export function checkDailyQuota(kind: QuotaKind): {
  allowed: boolean;
  remaining: number;
  limit: number;
  resetAt: number;
} {
  const now = Date.now();
  const dayKey = getISTDayKey(now);
  const limit = getQuotaLimit(kind);
  const record = quotaStore.get(kind);
  const count = record && record.dayKey === dayKey ? record.count : 0;
  const resetAt = now + msUntilNextISTDay(now);

  return {
    allowed: count < limit,
    remaining: Math.max(0, limit - count),
    limit,
    resetAt,
  };
}

/** Record a successful submission against the daily quota. */
export function incrementDailyQuota(kind: QuotaKind): void {
  const now = Date.now();
  const dayKey = getISTDayKey(now);
  const record = quotaStore.get(kind);
  const count = record && record.dayKey === dayKey ? record.count : 0;
  quotaStore.set(kind, { dayKey, count: count + 1 });
}

// ---------------------------------------------------------------------------
// Response helpers
// ---------------------------------------------------------------------------

/**
 * Standard success response for form submissions.
 */
export function successResponse(
  reference: string,
  message: string,
): Response {
  return new Response(
    JSON.stringify({
      ok: true,
      reference,
      message,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

/**
 * Standard error response for validation errors.
 */
export function validationErrorResponse(
  errors: Record<string, string>,
  message?: string,
): Response {
  return new Response(
    JSON.stringify({
      ok: false,
      error: 'validation',
      message: message ?? 'Please check the form and try again.',
      fields: errors,
    }),
    {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

/**
 * Friendly 429 returned when the daily quota for an endpoint is exhausted.
 * The message tells the user to try again tomorrow.
 */
export function quotaExceededResponse(kind: QuotaKind): Response {
  const retryAfterSeconds = Math.max(
    60,
    Math.ceil(msUntilNextISTDay(Date.now()) / 1000),
  );
  const message =
    kind === 'booking'
      ? "Today's walkthrough booking slots are fully booked. Please try again tomorrow — or call us directly to arrange a visit."
      : "We've received all the messages we can handle today. Please try again tomorrow — or call us directly.";

  return new Response(
    JSON.stringify({
      ok: false,
      error: 'quota_exceeded',
      message,
      retryAfter: retryAfterSeconds,
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(retryAfterSeconds),
      },
    },
  );
}

/**
 * Friendly 429 for the per-IP rate limit — “server is busy” wording.
 */
export function rateLimitedResponse(resetAt: number): Response {
  const retryAfterSeconds = Math.max(
    10,
    Math.ceil((resetAt - Date.now()) / 1000),
  );
  return new Response(
    JSON.stringify({
      ok: false,
      error: 'rate_limited',
      message:
        "We're receiving a lot of requests right now. Please wait a moment and try again.",
      retryAfter: retryAfterSeconds,
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(retryAfterSeconds),
      },
    },
  );
}

/**
 * Friendly 429 for the per-device submission cooldown — a person (or bot)
 * that just submitted successfully must wait before submitting again.
 */
export function cooldownResponse(retryAfterSeconds: number): Response {
  const retry = Math.max(1, retryAfterSeconds);
  const minutes = Math.max(1, Math.ceil(retry / 60));
  return new Response(
    JSON.stringify({
      ok: false,
      error: 'cooldown',
      message: `You've already submitted a request from this device. Please wait about ${minutes} minute${minutes === 1 ? '' : 's'} before sending another one.`,
      retryAfter: retry,
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(retry),
      },
    },
  );
}

/** 400 for a body that cannot be parsed or is not a JSON object. */
export function badRequestResponse(message?: string): Response {
  return new Response(
    JSON.stringify({
      ok: false,
      error: 'bad_request',
      message:
        message ??
        'The request body could not be read. Please send valid JSON or form data.',
    }),
    {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    },
  );
}

/** 415 for any content type outside the small allow-list. */
export function unsupportedMediaTypeResponse(): Response {
  return new Response(
    JSON.stringify({
      ok: false,
      error: 'unsupported_media_type',
      message:
        'Unsupported content type. Send application/json, application/x-www-form-urlencoded, or multipart/form-data.',
    }),
    {
      status: 415,
      headers: { 'Content-Type': 'application/json' },
    },
  );
}

/**
 * Append a hardened Set-Cookie for the device id to a response.
 * Done on the Response object directly so it works regardless of how the
 * response is returned from the route.
 */
export function attachDeviceCookie(response: Response, deviceId: string): void {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  response.headers.append(
    'Set-Cookie',
    `${DEVICE_COOKIE_NAME}=${deviceId}; Path=/; Max-Age=${DEVICE_MAX_AGE}; HttpOnly; SameSite=Lax${secure}`,
  );
}

/**
 * Standard error response for service/unexpected errors.
 */
export function serviceErrorResponse(
  message?: string,
): Response {
  return new Response(
    JSON.stringify({
      ok: false,
      error: 'service_unavailable',
      message:
        message ??
        'We could not process your request just now. Please try again in a few minutes.',
    }),
    {
      status: 503,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}
