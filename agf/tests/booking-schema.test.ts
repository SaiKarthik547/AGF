/**
 * AGF — Booking Form Validation Tests
 *
 * Covers every branch of validateBooking / sanitizeBooking and the
 * phone + email helpers used by POST /api/bookings.
 */

import { describe, expect, it } from 'vitest';
import {
  ALLOWED_FITNESS_GOALS,
  ALLOWED_TIME_SLOTS,
  isValidEmail,
  isValidIndianPhone,
  sanitizeBooking,
  validateBooking,
} from '@/lib/booking/schema';

// ---------------------------------------------------------------------------
// Helpers — dates computed at runtime so the suite never goes stale
// ---------------------------------------------------------------------------

const isoDay = (offsetDays: number): string =>
  new Date(Date.now() + offsetDays * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);

const tomorrow = isoDay(1);
const yesterday = isoDay(-1);

const VALID_BOOKING = {
  name: 'Test User',
  phone: '9876543210',
  email: 'test@example.com',
  date: tomorrow,
  timeSlot: ALLOWED_TIME_SLOTS[0],
  goal: ALLOWED_FITNESS_GOALS[0],
  notes: 'First visit, excited to start.',
};

// ---------------------------------------------------------------------------
// isValidIndianPhone
// ---------------------------------------------------------------------------

describe('isValidIndianPhone', () => {
  it.each([
    ['plain 10 digits', '9876543210'],
    ['+91 without space', '+919876543210'],
    ['+91 with spaces', '+91 98765 43210'],
    ['91 prefix with spaces', '91 98765 43210'],
    ['0 trunk prefix', '0 98765 43210'],
    ['dashes', '98765-43210'],
    ['parentheses', '(98765) 43210'],
    ['surrounding whitespace', '  9876543210  '],
    ['starts with 6', '6123456789'],
    ['starts with 7', '7123456789'],
    ['starts with 8', '8123456789'],
  ])('accepts %s', (_label, phone) => {
    expect(isValidIndianPhone(phone)).toBe(true);
  });

  it.each([
    ['empty string', ''],
    ['too short', '12345'],
    ['9 digits', '987654321'],
    ['11 digits', '98765432101'],
    ['letters', 'abcdefghij'],
    ['digit + letter mix', '987654321a'],
    ['Pakistani country code', '+92 300 1234567'],
    ['US number', '+1 555 123 4567'],
    ['+91 but only 11 digits total', '+91 98765 4321'],
    ['starts with 0 after trunk strip', '0123456789'],
    ['starts with 1', '1123456789'],
    ['starts with 5', '5123456789'],
    ['formula injection +91=SUM', '+91=SUM(A1:A9)'],
    ['non-string input', 9876543210 as unknown as string],
  ])('rejects %s', (_label, phone) => {
    expect(isValidIndianPhone(phone)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// isValidEmail
// ---------------------------------------------------------------------------

describe('isValidEmail', () => {
  it.each([
    ['simple', 'user@example.com'],
    ['subdomain', 'user@mail.example.co.in'],
    ['plus tag', 'user+tag@example.com'],
    ['dots in local part', 'first.last@example.com'],
  ])('accepts %s email', (_label, email) => {
    expect(isValidEmail(email)).toBe(true);
  });

  it('treats empty string as valid (field is optional)', () => {
    expect(isValidEmail('')).toBe(true);
  });

  it.each([
    ['missing @', 'userexample.com'],
    ['missing domain dot', 'user@example'],
    ['spaces', 'user @example.com'],
    ['double @', 'user@@example.com'],
  ])('rejects %s', (_label, email) => {
    expect(isValidEmail(email)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// validateBooking — happy path
// ---------------------------------------------------------------------------

describe('validateBooking — valid submissions', () => {
  it('accepts a fully valid booking', () => {
    expect(validateBooking(VALID_BOOKING)).toEqual({ valid: true, errors: {} });
  });

  it('accepts a booking without optional email and notes', () => {
    const result = validateBooking({ ...VALID_BOOKING, email: '', notes: '' });
    expect(result.valid).toBe(true);
  });

  it('accepts every allowed time slot', () => {
    for (const timeSlot of ALLOWED_TIME_SLOTS) {
      expect(validateBooking({ ...VALID_BOOKING, timeSlot }).valid).toBe(true);
    }
  });

  it('accepts every allowed fitness goal', () => {
    for (const goal of ALLOWED_FITNESS_GOALS) {
      expect(validateBooking({ ...VALID_BOOKING, goal }).valid).toBe(true);
    }
  });

  it('accepts today as the visit date (midnight-to-midnight)', () => {
    expect(validateBooking({ ...VALID_BOOKING, date: isoDay(0) }).valid).toBe(true);
  });

  it('accepts a far-future date', () => {
    expect(validateBooking({ ...VALID_BOOKING, date: isoDay(365) }).valid).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// validateBooking — one failing field at a time
// ---------------------------------------------------------------------------

describe('validateBooking — field errors', () => {
  it('rejects missing name', () => {
    const result = validateBooking({ ...VALID_BOOKING, name: '' });
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBe('Please enter your full name.');
  });

  it('rejects overlong name', () => {
    const result = validateBooking({ ...VALID_BOOKING, name: 'a'.repeat(101) });
    expect(result.errors.name).toBe('Name is too long.');
  });

  it('rejects missing phone', () => {
    const result = validateBooking({ ...VALID_BOOKING, phone: '' });
    expect(result.errors.phone).toBe('Please enter your phone number.');
  });

  it('rejects invalid phone with a helpful message', () => {
    const result = validateBooking({ ...VALID_BOOKING, phone: '12345' });
    expect(result.errors.phone).toBe(
      'Enter a valid 10-digit phone number (e.g. 98765 43210).',
    );
  });

  it('rejects malformed email', () => {
    const result = validateBooking({ ...VALID_BOOKING, email: 'not-an-email' });
    expect(result.errors.email).toBe('Enter a valid email address.');
  });

  it('rejects missing visit date', () => {
    const result = validateBooking({ ...VALID_BOOKING, date: '' });
    expect(result.errors.date).toBe('Please choose a visit date.');
  });

  it('rejects an unparsable visit date', () => {
    const result = validateBooking({ ...VALID_BOOKING, date: 'banana' });
    expect(result.errors.date).toBe('Enter a valid date.');
  });

  it('rejects a past visit date', () => {
    const result = validateBooking({ ...VALID_BOOKING, date: yesterday });
    expect(result.errors.date).toBe('Please choose a future date.');
  });

  it('rejects missing time slot', () => {
    const result = validateBooking({ ...VALID_BOOKING, timeSlot: '' });
    expect(result.errors.timeSlot).toBe('Please select a time window.');
  });

  it('rejects a time slot outside the allowed list', () => {
    const result = validateBooking({
      ...VALID_BOOKING,
      timeSlot: 'Afternoon (12:00 PM – 3:00 PM)',
    });
    expect(result.errors.timeSlot).toBe('Select a valid time window.');
  });

  it('rejects missing goal', () => {
    const result = validateBooking({ ...VALID_BOOKING, goal: '' });
    expect(result.errors.goal).toBe('Please select a fitness interest.');
  });

  it('rejects a goal outside the allowed list', () => {
    const result = validateBooking({ ...VALID_BOOKING, goal: 'Cardio' });
    expect(result.errors.goal).toBe('Select a valid fitness interest.');
  });

  it('rejects notes longer than 1000 characters but keeps shorter notes', () => {
    const tooLong = validateBooking({ ...VALID_BOOKING, notes: 'n'.repeat(1001) });
    expect(tooLong.errors.notes).toBe('Notes are too long (max 1000 characters).');

    const exact = validateBooking({ ...VALID_BOOKING, notes: 'n'.repeat(1000) });
    expect(exact.valid).toBe(true);
  });

  it('collects every error at once when the form is empty', () => {
    const result = validateBooking({
      name: '',
      phone: '',
      email: '',
      date: '',
      timeSlot: '',
      goal: '',
      notes: '',
    });
    expect(result.valid).toBe(false);
    expect(Object.keys(result.errors).sort()).toEqual([
      'date',
      'goal',
      'name',
      'phone',
      'timeSlot',
    ]);
  });
});

// ---------------------------------------------------------------------------
// sanitizeBooking
// ---------------------------------------------------------------------------

describe('sanitizeBooking', () => {
  it('trims every field and keeps real values', () => {
    const result = sanitizeBooking({
      name: '  Test User  ',
      phone: ' 9876543210 ',
      email: ' test@example.com ',
      date: tomorrow,
      timeSlot: ALLOWED_TIME_SLOTS[1],
      goal: ALLOWED_FITNESS_GOALS[1],
      notes: '  Bring water bottle.  ',
    });
    expect(result).toEqual({
      name: 'Test User',
      phone: '9876543210',
      email: 'test@example.com',
      date: tomorrow,
      timeSlot: ALLOWED_TIME_SLOTS[1],
      goal: ALLOWED_FITNESS_GOALS[1],
      notes: 'Bring water bottle.',
    });
  });

  it('converts empty optional email to null', () => {
    expect(sanitizeBooking({ ...VALID_BOOKING, email: '' }).email).toBeNull();
  });

  it('converts whitespace-only notes to null', () => {
    expect(sanitizeBooking({ ...VALID_BOOKING, notes: '   ' }).notes).toBeNull();
  });
});
