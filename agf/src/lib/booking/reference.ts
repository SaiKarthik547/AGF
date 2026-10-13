/**
 * AGF — Booking Reference Generator
 * Generates non-sensitive, human-readable booking references.
 * Format: AGF-YYYY-NNNNNN where NNNNNN is a zero-padded sequential-like suffix
 * derived from timestamp + random component.
 *
 * This reference is for support and sheet searching only.
 * It does not encode personal data or predictable visit details.
 */

import { randomInt } from 'crypto';

const REF_PREFIX = 'AGF';
const CURRENT_YEAR = new Date().getFullYear();

/**
 * Generate a booking reference.
 * Example: AGF-2026-004217
 */
export function generateBookingReference(): string {
  // Use a random 6-digit component for uniqueness without exposing sequencing
  const randomComponent = String(randomInt(100000, 999999));
  return `${REF_PREFIX}-${CURRENT_YEAR}-${randomComponent}`;
}

/**
 * Validate a booking reference format (server-side use only).
 */
export function isValidBookingReference(ref: string): boolean {
  const pattern = new RegExp(`^${REF_PREFIX}-\\d{4}-\\d{6}$`);
  return pattern.test(ref);
}
