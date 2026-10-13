/**
 * AGF — Booking Reference Generator Tests
 */

import { describe, expect, it } from 'vitest';
import {
  generateBookingReference,
  isValidBookingReference,
} from '@/lib/booking/reference';

describe('generateBookingReference', () => {
  it('matches the documented AGF-YYYY-NNNNNN format', () => {
    const ref = generateBookingReference();
    expect(ref).toMatch(/^AGF-\d{4}-\d{6}$/);
  });

  it('embeds the current year', () => {
    const currentYear = new Date().getFullYear();
    expect(generateBookingReference()).toMatch(new RegExp(`^AGF-${currentYear}-`));
  });

  it('produces unique references across many calls', () => {
    const refs = new Set<string>();
    for (let i = 0; i < 500; i += 1) {
      refs.add(generateBookingReference());
    }
    // 500 draws from a 900k space: by the birthday bound a rare collision is
    // ~14% likely, so allow a small slack instead of demanding 500/500. Any
    // real regression (e.g. a fixed suffix) would drop the count far below.
    expect(refs.size).toBeGreaterThanOrEqual(490);
  });

  it('always uses 6-digit suffixes including leading zeros', () => {
    // randomInt(100000, 999999) guarantees exactly 6 digits — spot-check
    // the shape holds over a sample.
    for (let i = 0; i < 50; i += 1) {
      const suffix = generateBookingReference().split('-')[2];
      expect(suffix).toHaveLength(6);
      expect(Number(suffix)).toBeGreaterThanOrEqual(100000);
    }
  });
});

describe('isValidBookingReference', () => {
  it('accepts a freshly generated reference', () => {
    expect(isValidBookingReference(generateBookingReference())).toBe(true);
  });

  it.each([
    ['empty string', ''],
    ['wrong prefix', 'XYZ-2026-004217'],
    ['two-digit year', 'AGF-26-004217'],
    ['5-digit suffix', 'AGF-2026-04217'],
    ['7-digit suffix', 'AGF-2026-0004217'],
    ['non-numeric suffix', 'AGF-2026-ABCDEF'],
    ['missing parts', 'AGF2026004217'],
  ])('rejects %s', (_label, ref) => {
    expect(isValidBookingReference(ref)).toBe(false);
  });
});
