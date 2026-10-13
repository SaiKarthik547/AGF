/**
 * AGF — Booking Form Validation Schema
 * Server-side validation for POST /api/bookings
 *
 * IMPORTANT: Allowed values for timeSlot and goal MUST match the exact
 * option strings in src/app/book-a-visit/page.tsx. These are the source of truth.
 */

/**
 * Indian mobile phone validation (STRICT).
 *
 * The value must end up as exactly 10 digits starting with 6–9.
 * Accepted input shapes:
 *   9876543210
 *   +91 98765 43210 / 91 98765 43210 / 0 98765 43210
 *   98765-43210 / (98765) 43210
 * Anything else (letters, 9/11 digits, other country codes) is rejected.
 *
 * Shared by both the booking and contact schemas so the app backend
 * enforces one single phone rule before any Google Sheets call happens.
 */
export function isValidIndianPhone(raw: string): boolean {
  if (typeof raw !== 'string') return false;

  // Strip common formatting characters, then a leading +
  let cleaned = raw.replace(/[\s\-\(\)]/g, '').replace(/^\+/, '');

  // Optional country-code (91) or trunk (0) prefix in front of 10 digits
  if (/^91\d{10}$/.test(cleaned)) cleaned = cleaned.slice(2);
  else if (/^0\d{10}$/.test(cleaned)) cleaned = cleaned.slice(1);

  // Exactly 10 digits, Indian mobiles start with 6–9
  return /^[6-9]\d{9}$/.test(cleaned);
}

/**
 * Validate email format (basic, permissive check).
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.trim().length === 0) return true; // optional field

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Allowed time slot values — MUST match frontend exactly.
 * From src/app/book-a-visit/page.tsx:
 *   <option value="Morning (6:00 AM – 10:00 AM)">
 *   <option value="Evening (4:00 PM – 9:00 PM)">
 */
export const ALLOWED_TIME_SLOTS = [
  'Morning (6:00 AM – 10:00 AM)',
  'Evening (4:00 PM – 9:00 PM)',
] as const;

export type TimeSlot = (typeof ALLOWED_TIME_SLOTS)[number];

/**
 * Allowed fitness goal values — MUST match frontend exactly.
 * From src/app/book-a-visit/page.tsx:
 *   <option value="Strength Training">
 *   <option value="Fat Loss & Conditioning">
 *   <option value="Personal Training Guidance">
 *   <option value="General Health & Fitness">
 */
export const ALLOWED_FITNESS_GOALS = [
  'Strength Training',
  'Fat Loss & Conditioning',
  'Personal Training Guidance',
  'General Health & Fitness',
] as const;

export type FitnessGoal = (typeof ALLOWED_FITNESS_GOALS)[number];

/**
 * Validate a booking submission.
 * Returns { valid: true } or { valid: false, errors: Record<field, message> }
 */
export interface BookingValidationErrors {
  name?: string;
  phone?: string;
  email?: string;
  date?: string;
  timeSlot?: string;
  goal?: string;
  notes?: string;
}

export interface BookingValidationResult {
  valid: boolean;
  errors: BookingValidationErrors;
}

export function validateBooking(data: {
  name: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  goal: string;
  notes: string;
}): BookingValidationResult {
  const errors: BookingValidationErrors = {};

  // Name: required, trimmed, reasonable length
  const name = data.name?.trim() ?? '';
  if (name.length === 0) {
    errors.name = 'Please enter your full name.';
  } else if (name.length > 100) {
    errors.name = 'Name is too long.';
  }

  // Phone: required, exactly 10 digits (6–9 first) — mandatory field
  const phone = data.phone?.trim() ?? '';
  if (phone.length === 0) {
    errors.phone = 'Please enter your phone number.';
  } else if (!isValidIndianPhone(phone)) {
    errors.phone = 'Enter a valid 10-digit phone number (e.g. 98765 43210).';
  }

  // Email: optional, but if provided must be valid
  const email = data.email?.trim() ?? '';
  if (email.length > 0 && !isValidEmail(email)) {
    errors.email = 'Enter a valid email address.';
  }

  // Date: required, valid format, not in the past
  const date = data.date?.trim() ?? '';
  if (date.length === 0) {
    errors.date = 'Please choose a visit date.';
  } else {
    const parsedDate = new Date(date + 'T00:00:00');
    if (isNaN(parsedDate.getTime())) {
      errors.date = 'Enter a valid date.';
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (parsedDate.getTime() < today.getTime()) {
        errors.date = 'Please choose a future date.';
      }
    }
  }

  // Time slot: required, must be one of allowed values
  const timeSlot = data.timeSlot?.trim() ?? '';
  if (timeSlot.length === 0) {
    errors.timeSlot = 'Please select a time window.';
  } else if (!ALLOWED_TIME_SLOTS.includes(timeSlot as TimeSlot)) {
    errors.timeSlot = 'Select a valid time window.';
  }

  // Goal: required, must be one of allowed values
  const goal = data.goal?.trim() ?? '';
  if (goal.length === 0) {
    errors.goal = 'Please select a fitness interest.';
  } else if (!ALLOWED_FITNESS_GOALS.includes(goal as FitnessGoal)) {
    errors.goal = 'Select a valid fitness interest.';
  }

  // Notes: optional, length cap
  const notes = data.notes?.trim() ?? '';
  if (notes.length > 1000) {
    errors.notes = 'Notes are too long (max 1000 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Sanitize booking data for storage.
 * Returns clean values ready for the spreadsheet row.
 */
export function sanitizeBooking(data: {
  name: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  goal: string;
  notes: string;
}): {
  name: string;
  phone: string;
  email: string | null;
  date: string;
  timeSlot: string;
  goal: string;
  notes: string | null;
} {
  return {
    name: data.name?.trim() ?? '',
    phone: data.phone?.trim() ?? '',
    email: data.email?.trim().length > 0 ? data.email.trim() : null,
    date: data.date?.trim() ?? '',
    timeSlot: data.timeSlot?.trim() ?? '',
    goal: data.goal?.trim() ?? '',
    notes: data.notes?.trim().length > 0 ? data.notes.trim() : null,
  };
}
