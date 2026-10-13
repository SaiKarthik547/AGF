/**
 * AGF — Server Utilities Tests (REAL, no mocks)
 *
 * Exercises the actual production helpers from src/lib/booking/server.ts:
 * honeypot detection, per-device submission cooldown, IP rate limiting
 * (including window expiry), daily quotas (including the friendly
 * "try again tomorrow" 429), client-IP extraction, device-cookie handling,
 * and every JSON response helper used by the API routes.
 *
 * These are pure in-process functions — nothing external is involved, so
 * no mocking is needed anywhere in this file.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  HONEYPOT_FIELD,
  attachDeviceCookie,
  badRequestResponse,
  checkDailyQuota,
  checkRateLimit,
  checkSubmissionCooldown,
  cooldownResponse,
  generateDeviceId,
  getClientIP,
  getDeviceId,
  incrementDailyQuota,
  isHoneypotSpam,
  quotaExceededResponse,
  rateLimitedResponse,
  recordSubmissionCooldown,
  serviceErrorResponse,
  successResponse,
  unsupportedMediaTypeResponse,
  validationErrorResponse,
} from '@/lib/booking/server';

// Unique keys per test so the module-level stores never leak between tests.
let uniqueCounter = 0;
const uniqueIP = (): string => `203.0.113.${(uniqueCounter += 1)}`;
const uniqueDevice = (): string => generateDeviceId();

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllEnvs();
});

// ---------------------------------------------------------------------------
// Honeypot
// ---------------------------------------------------------------------------

describe('honeypot', () => {
  it('uses an innocuous field name', () => {
    expect(HONEYPOT_FIELD).toBe('website_url');
  });

  it('flags a submission when the honeypot field has any value', () => {
    expect(isHoneypotSpam({ [HONEYPOT_FIELD]: 'http://spam.example' })).toBe(true);
  });

  it('ignores an empty honeypot field', () => {
    expect(isHoneypotSpam({ [HONEYPOT_FIELD]: '' })).toBe(false);
  });

  it('ignores a whitespace-only honeypot field', () => {
    expect(isHoneypotSpam({ [HONEYPOT_FIELD]: '   ' })).toBe(false);
  });

  it('ignores a missing honeypot field', () => {
    expect(isHoneypotSpam({ name: 'Real User' })).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Device identity
// ---------------------------------------------------------------------------

describe('device identity', () => {
  it('generateDeviceId returns 32 lowercase hex chars', () => {
    expect(generateDeviceId()).toMatch(/^[0-9a-f]{32}$/);
  });

  it('generateDeviceId returns unique ids', () => {
    const ids = new Set<string>();
    for (let i = 0; i < 100; i += 1) ids.add(generateDeviceId());
    expect(ids.size).toBe(100);
  });

  it('getDeviceId reads the agf_device cookie', () => {
    const id = uniqueDevice();
    const request = new Request('http://localhost', {
      headers: { cookie: `agf_device=${id}` },
    });
    expect(getDeviceId(request)).toBe(id);
  });

  it('getDeviceId finds the cookie among others', () => {
    const id = uniqueDevice();
    const request = new Request('http://localhost', {
      headers: { cookie: `other=1; agf_device=${id}; third=2` },
    });
    expect(getDeviceId(request)).toBe(id);
  });

  it('getDeviceId returns null without the cookie', () => {
    expect(getDeviceId(new Request('http://localhost'))).toBeNull();
    const request = new Request('http://localhost', {
      headers: { cookie: 'other=1' },
    });
    expect(getDeviceId(request)).toBeNull();
  });

  it('getDeviceId rejects malformed ids (no key injection)', () => {
    for (const value of ['../../etc', 'short', `${'a'.repeat(31)}`, `${'a'.repeat(33)}`, 'ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ']) {
      const request = new Request('http://localhost', {
        headers: { cookie: `agf_device=${value}` },
      });
      expect(getDeviceId(request)).toBeNull();
    }
  });

  it('attachDeviceCookie appends a hardened Set-Cookie header', () => {
    const response = successResponse('AGF-2026-000001', 'Received.');
    attachDeviceCookie(response, 'abcdef0123456789abcdef0123456789');
    const cookie = response.headers.get('set-cookie');
    expect(cookie).toContain('agf_device=abcdef0123456789abcdef0123456789');
    expect(cookie).toContain('Path=/');
    expect(cookie).toContain('HttpOnly');
    expect(cookie).toContain('SameSite=Lax');
    expect(cookie).toContain('Max-Age=31536000');
  });
});

// ---------------------------------------------------------------------------
// Per-device submission cooldown (anti-spam)
// ---------------------------------------------------------------------------

describe('submission cooldown', () => {
  it('allows the first submission from a fresh device/IP', () => {
    const result = checkSubmissionCooldown(uniqueDevice(), uniqueIP());
    expect(result.allowed).toBe(true);
    expect(result.retryAfter).toBe(0);
  });

  it('blocks a repeat submission from the same IP within the cooldown', () => {
    const ip = uniqueIP();
    recordSubmissionCooldown(uniqueDevice(), ip);

    const result = checkSubmissionCooldown(null, ip);
    expect(result.allowed).toBe(false);
    expect(result.retryAfter).toBeGreaterThan(0);
    expect(result.retryAfter).toBeLessThanOrEqual(600);
  });

  it('blocks a repeat submission from the same device within the cooldown', () => {
    const device = uniqueDevice();
    recordSubmissionCooldown(device, uniqueIP());

    // Cookie path: a different IP with the same device id is still blocked.
    const result = checkSubmissionCooldown(device, uniqueIP());
    expect(result.allowed).toBe(false);
  });

  it('does not block a different device behind the same NAT', () => {
    const ip = uniqueIP();
    recordSubmissionCooldown(uniqueDevice(), ip);

    // Cookie present → keyed by device, so another device with its own
    // cookie on the same IP is unaffected.
    const other = checkSubmissionCooldown(uniqueDevice(), ip);
    expect(other.allowed).toBe(true);
  });

  it('allows again after the cooldown window expires', () => {
    vi.useFakeTimers();
    const device = uniqueDevice();
    const ip = uniqueIP();

    recordSubmissionCooldown(device, ip);
    expect(checkSubmissionCooldown(device, ip).allowed).toBe(false);

    vi.advanceTimersByTime(601_000); // 10 minutes + 1s
    expect(checkSubmissionCooldown(device, ip).allowed).toBe(true);
  });

  it('honours AGF_SUBMISSION_COOLDOWN_SECONDS', () => {
    vi.useFakeTimers();
    vi.stubEnv('AGF_SUBMISSION_COOLDOWN_SECONDS', '2');

    const device = uniqueDevice();
    const ip = uniqueIP();
    recordSubmissionCooldown(device, ip);

    vi.advanceTimersByTime(1_500);
    expect(checkSubmissionCooldown(device, ip).allowed).toBe(false);

    vi.advanceTimersByTime(1_000);
    expect(checkSubmissionCooldown(device, ip).allowed).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Rate limiting
// ---------------------------------------------------------------------------

describe('checkRateLimit', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('allows the first request and counts down the remaining allowance', () => {
    const first = checkRateLimit('203.0.113.10');
    expect(first.allowed).toBe(true);
    expect(first.remaining).toBe(9);

    const second = checkRateLimit('203.0.113.10');
    expect(second.allowed).toBe(true);
    expect(second.remaining).toBe(8);
  });

  it('allows exactly 10 requests per window, then blocks the 11th', () => {
    for (let i = 0; i < 10; i += 1) {
      expect(checkRateLimit('203.0.113.11').allowed).toBe(true);
    }
    const blocked = checkRateLimit('203.0.113.11');
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.resetAt).toBeGreaterThan(Date.now());
  });

  it('keeps limits per-IP (other IPs are unaffected)', () => {
    for (let i = 0; i < 10; i += 1) checkRateLimit('203.0.113.12');
    expect(checkRateLimit('203.0.113.12').allowed).toBe(false);
    expect(checkRateLimit('203.0.113.13').allowed).toBe(true);
  });

  it('resets the allowance once the window expires', () => {
    for (let i = 0; i < 10; i += 1) checkRateLimit('203.0.113.14');
    expect(checkRateLimit('203.0.113.14').allowed).toBe(false);

    vi.advanceTimersByTime(61_000);

    const afterWindow = checkRateLimit('203.0.113.14');
    expect(afterWindow.allowed).toBe(true);
    expect(afterWindow.remaining).toBe(9);
  });

  it('stays blocked until the window expires, not after one more hit', () => {
    for (let i = 0; i < 10; i += 1) checkRateLimit('203.0.113.15');
    vi.advanceTimersByTime(30_000); // halfway through the window
    expect(checkRateLimit('203.0.113.15').allowed).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Daily quotas (per endpoint, IST day)
// ---------------------------------------------------------------------------

describe('daily quota', () => {
  it('starts with capacity and decrements on every successful submission', () => {
    const before = checkDailyQuota('booking');
    expect(before.allowed).toBe(true);
    expect(before.remaining).toBeGreaterThan(0);
    expect(before.limit).toBeGreaterThanOrEqual(before.remaining);

    incrementDailyQuota('booking');
    const after = checkDailyQuota('booking');
    expect(after.remaining).toBe(before.remaining - 1);
  });

  it('keeps booking and contact quotas separate', () => {
    const beforeBooking = checkDailyQuota('booking');
    const beforeContact = checkDailyQuota('contact');
    incrementDailyQuota('booking');
    expect(checkDailyQuota('booking').remaining).toBe(beforeBooking.remaining - 1);
    expect(checkDailyQuota('contact').remaining).toBe(beforeContact.remaining);
  });

  it('reports exhausted once the daily limit is reached', () => {
    incrementDailyQuota('contact'); // ensure count ≥ 1
    vi.stubEnv('AGF_CONTACT_DAILY_LIMIT', '1');
    const quota = checkDailyQuota('contact');
    expect(quota.allowed).toBe(false);
    expect(quota.remaining).toBe(0);
  });

  it('rolls over to a fresh allowance on the next IST day', () => {
    vi.useFakeTimers();
    vi.stubEnv('AGF_BOOKING_DAILY_LIMIT', '1');

    incrementDailyQuota('booking'); // count is ≥ 1 → exhausted now
    expect(checkDailyQuota('booking').allowed).toBe(false);

    vi.advanceTimersByTime(25 * 60 * 60 * 1000); // next day
    expect(checkDailyQuota('booking').allowed).toBe(true);
    expect(checkDailyQuota('booking').remaining).toBe(1);
  });

  it('falls back to the default limit when the env var is garbage', () => {
    vi.stubEnv('AGF_BOOKING_DAILY_LIMIT', 'not-a-number');
    expect(checkDailyQuota('booking').limit).toBe(50);
    vi.stubEnv('AGF_BOOKING_DAILY_LIMIT', '-5');
    expect(checkDailyQuota('booking').limit).toBe(50);
  });
});

// ---------------------------------------------------------------------------
// getClientIP
// ---------------------------------------------------------------------------

describe('getClientIP', () => {
  it('uses the first hop of x-forwarded-for', () => {
    const request = new Request('http://localhost', {
      headers: { 'x-forwarded-for': '198.51.100.7, 10.0.0.1, 10.0.0.2' },
    });
    expect(getClientIP(request)).toBe('198.51.100.7');
  });

  it('trims whitespace around the forwarded IP', () => {
    const request = new Request('http://localhost', {
      headers: { 'x-forwarded-for': '  198.51.100.8  ' },
    });
    expect(getClientIP(request)).toBe('198.51.100.8');
  });

  it('falls back to x-real-ip when there is no forwarding chain', () => {
    const request = new Request('http://localhost', {
      headers: { 'x-real-ip': '198.51.100.9' },
    });
    expect(getClientIP(request)).toBe('198.51.100.9');
  });

  it('returns "unknown" when no identifying header exists', () => {
    expect(getClientIP(new Request('http://localhost'))).toBe('unknown');
  });

  it('prefers x-forwarded-for over x-real-ip', () => {
    const request = new Request('http://localhost', {
      headers: { 'x-forwarded-for': '198.51.100.1', 'x-real-ip': '10.0.0.9' },
    });
    expect(getClientIP(request)).toBe('198.51.100.1');
  });
});

// ---------------------------------------------------------------------------
// Response helpers
// ---------------------------------------------------------------------------

describe('response helpers', () => {
  it('successResponse returns 200 with ok/reference/message', async () => {
    const response = successResponse('AGF-2026-004217', 'Received.');
    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe('application/json');
    expect(await response.json()).toEqual({
      ok: true,
      reference: 'AGF-2026-004217',
      message: 'Received.',
    });
  });

  it('validationErrorResponse returns 400 with per-field errors', async () => {
    const response = validationErrorResponse({ name: 'Please enter your name.' });
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.ok).toBe(false);
    expect(body.error).toBe('validation');
    expect(body.fields).toEqual({ name: 'Please enter your name.' });
    expect(body.message).toBe('Please check the form and try again.');
  });

  it('quotaExceededResponse returns 429 with "try again tomorrow" and Retry-After', async () => {
    const response = quotaExceededResponse('booking');
    expect(response.status).toBe(429);
    expect(response.headers.get('Retry-After')).toBeTruthy();
    const body = await response.json();
    expect(body.ok).toBe(false);
    expect(body.error).toBe('quota_exceeded');
    expect(body.message).toMatch(/tomorrow/i);
    expect(body.retryAfter).toBeGreaterThan(0);
  });

  it('quotaExceededResponse wording differs for contact', async () => {
    const body = await quotaExceededResponse('contact').json();
    expect(body.message).toMatch(/tomorrow/i);
    expect(body.message).toMatch(/message/i);
  });

  it('rateLimitedResponse returns the friendly "busy" 429', async () => {
    const response = rateLimitedResponse(Date.now() + 30_000);
    expect(response.status).toBe(429);
    expect(response.headers.get('Retry-After')).toBeTruthy();
    const body = await response.json();
    expect(body.error).toBe('rate_limited');
    expect(body.message).toMatch(/lot of requests|wait|try again/i);
  });

  it('cooldownResponse returns 429 with a wait-time message', async () => {
    const response = cooldownResponse(420);
    expect(response.status).toBe(429);
    expect(response.headers.get('Retry-After')).toBe('420');
    const body = await response.json();
    expect(body.ok).toBe(false);
    expect(body.error).toBe('cooldown');
    expect(body.message).toMatch(/wait/i);
    expect(body.message).toMatch(/minute/i);
    expect(body.retryAfter).toBe(420);
  });

  it('badRequestResponse returns 400 for unparseable bodies', async () => {
    const response = badRequestResponse();
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.ok).toBe(false);
    expect(body.error).toBe('bad_request');
  });

  it('unsupportedMediaTypeResponse returns 415 with the allow-list', async () => {
    const response = unsupportedMediaTypeResponse();
    expect(response.status).toBe(415);
    const body = await response.json();
    expect(body.ok).toBe(false);
    expect(body.error).toBe('unsupported_media_type');
    expect(body.message).toMatch(/application\/json/);
  });

  it('serviceErrorResponse returns 503 with a generic message', async () => {
    const response = serviceErrorResponse();
    expect(response.status).toBe(503);
    const body = await response.json();
    expect(body.ok).toBe(false);
    expect(body.error).toBe('service_unavailable');
    expect(body.message).toContain('try again');
  });

  it('serviceErrorResponse never leaks internal details by default', async () => {
    const body = await serviceErrorResponse().json();
    expect(JSON.stringify(body)).not.toContain('GOOGLE_');
    expect(JSON.stringify(body)).not.toContain('stack');
  });
});
