/**
 * AGF — Contact Form Validation Schema
 * Server-side validation for POST /api/contact
 *
 * IMPORTANT: Allowed values for topic MUST match the exact
 * option strings in src/app/contact/page.tsx. These are the source of truth.
 *
 * Mandatory fields: name, phone, topic.
 * Optional fields: email, message.
 * Phone uses the SAME strict 10-digit rule as the booking schema.
 */

import { isValidIndianPhone } from './schema';

/**
 * Validate email format (basic, permissive check).
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.trim().length === 0) return true; // optional field

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Allowed inquiry topic values — MUST match frontend exactly.
 * From src/app/contact/page.tsx:
 *   <option value="General Inquiry">
 *   <option value="Equipment & Machines">
 *   <option value="Personal Training">
 *   <option value="Walkthrough Schedule">
 */
export const ALLOWED_CONTACT_TOPICS = [
  'General Inquiry',
  'Equipment & Machines',
  'Personal Training',
  'Walkthrough Schedule',
] as const;

export type ContactTopic = (typeof ALLOWED_CONTACT_TOPICS)[number];

/**
 * Validate a contact submission.
 * Returns { valid: true } or { valid: false, errors: Record<field, message> }
 */
export interface ContactValidationErrors {
  name?: string;
  phone?: string;
  email?: string;
  topic?: string;
  message?: string;
}

export interface ContactValidationResult {
  valid: boolean;
  errors: ContactValidationErrors;
}

export function validateContact(data: {
  name: string;
  phone: string;
  email: string;
  topic: string;
  message: string;
}): ContactValidationResult {
  const errors: ContactValidationErrors = {};

  // Name: required, trimmed, reasonable length
  const name = data.name?.trim() ?? '';
  if (name.length === 0) {
    errors.name = 'Please enter your full name.';
  } else if (name.length > 100) {
    errors.name = 'Name is too long.';
  }

  // Phone: required, exactly 10 digits (6–9 first) — same rule as booking
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

  // Topic: required, must be one of allowed values
  const topic = data.topic?.trim() ?? '';
  if (topic.length === 0) {
    errors.topic = 'Please select an inquiry topic.';
  } else if (!ALLOWED_CONTACT_TOPICS.includes(topic as ContactTopic)) {
    errors.topic = 'Select a valid inquiry topic.';
  }

  // Message: OPTIONAL — length cap only
  const message = data.message?.trim() ?? '';
  if (message.length > 2000) {
    errors.message = 'Message is too long (max 2000 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Sanitize contact data for storage.
 */
export function sanitizeContact(data: {
  name: string;
  phone: string;
  email: string;
  topic: string;
  message: string;
}): {
  name: string;
  phone: string;
  email: string | null;
  topic: string;
  message: string;
} {
  return {
    name: data.name?.trim() ?? '',
    phone: data.phone?.trim() ?? '',
    email: data.email?.trim().length > 0 ? data.email.trim() : null,
    topic: data.topic?.trim() ?? '',
    message: data.message?.trim() ?? '',
  };
}
