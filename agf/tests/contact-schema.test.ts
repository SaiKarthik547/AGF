/**
 * AGF — Contact Form Validation Tests
 *
 * Covers every branch of validateContact / sanitizeContact and the
 * helpers used by POST /api/contact.
 */

import { describe, expect, it } from 'vitest';
import {
  ALLOWED_CONTACT_TOPICS,
  isValidEmail,
  sanitizeContact,
  validateContact,
} from '@/lib/booking/contact-schema';

const VALID_CONTACT = {
  name: 'Test User',
  phone: '9876543210',
  email: 'test@example.com',
  topic: ALLOWED_CONTACT_TOPICS[0],
  message: 'Do you offer trial sessions?',
};

// ---------------------------------------------------------------------------
// isValidEmail (contact variant — same permissive rules as booking)
// ---------------------------------------------------------------------------

describe('isValidEmail (contact)', () => {
  it('accepts a normal email', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
  });

  it('treats empty string as valid (field is optional)', () => {
    expect(isValidEmail('')).toBe(true);
  });

  it('rejects malformed emails', () => {
    expect(isValidEmail('userexample.com')).toBe(false);
    expect(isValidEmail('user@example')).toBe(false);
    expect(isValidEmail('user @@example.com')).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// validateContact — happy path
// ---------------------------------------------------------------------------

describe('validateContact — valid submissions', () => {
  it('accepts a fully valid contact inquiry', () => {
    expect(validateContact(VALID_CONTACT)).toEqual({ valid: true, errors: {} });
  });

  it('accepts a contact without optional email', () => {
    expect(validateContact({ ...VALID_CONTACT, email: '' }).valid).toBe(true);
  });

  it('accepts every allowed inquiry topic', () => {
    for (const topic of ALLOWED_CONTACT_TOPICS) {
      expect(validateContact({ ...VALID_CONTACT, topic }).valid).toBe(true);
    }
  });

  it('accepts the maximum allowed message length (2000)', () => {
    expect(
      validateContact({ ...VALID_CONTACT, message: 'm'.repeat(2000) }).valid,
    ).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// validateContact — field errors
// ---------------------------------------------------------------------------

describe('validateContact — field errors', () => {
  it('rejects missing name', () => {
    const result = validateContact({ ...VALID_CONTACT, name: '' });
    expect(result.errors.name).toBe('Please enter your full name.');
  });

  it('rejects overlong name', () => {
    const result = validateContact({ ...VALID_CONTACT, name: 'a'.repeat(101) });
    expect(result.errors.name).toBe('Name is too long.');
  });

  it('rejects missing phone', () => {
    const result = validateContact({ ...VALID_CONTACT, phone: '' });
    expect(result.errors.phone).toBe('Please enter your phone number.');
  });

  it('rejects implausible phone (too short)', () => {
    const result = validateContact({ ...VALID_CONTACT, phone: '12345' });
    expect(result.errors.phone).toBe(
      'Enter a valid 10-digit phone number (e.g. 98765 43210).',
    );
  });

  it('rejects implausible phone (letters)', () => {
    const result = validateContact({ ...VALID_CONTACT, phone: 'call-me-maybe' });
    expect(result.errors.phone).toBe(
      'Enter a valid 10-digit phone number (e.g. 98765 43210).',
    );
  });

  it('uses the same strict 10-digit rule as the booking schema', () => {
    // 11 digits / wrong first digit must fail here exactly as in booking.
    expect(
      validateContact({ ...VALID_CONTACT, phone: '98765432101' }).errors.phone,
    ).toBeTruthy();
    expect(
      validateContact({ ...VALID_CONTACT, phone: '5123456789' }).errors.phone,
    ).toBeTruthy();
    expect(
      validateContact({ ...VALID_CONTACT, phone: '+91 98765 43210' }).valid,
    ).toBe(true);
  });

  it('accepts formatted phones (spaces, dashes, parens, +91)', () => {
    for (const phone of [
      '98765 43210',
      '98765-43210',
      '(98765) 43210',
      '+91 98765 43210',
    ]) {
      expect(validateContact({ ...VALID_CONTACT, phone }).valid).toBe(true);
    }
  });

  it('rejects malformed email', () => {
    const result = validateContact({ ...VALID_CONTACT, email: 'nope@' });
    expect(result.errors.email).toBe('Enter a valid email address.');
  });

  it('rejects missing topic', () => {
    const result = validateContact({ ...VALID_CONTACT, topic: '' });
    expect(result.errors.topic).toBe('Please select an inquiry topic.');
  });

  it('rejects a topic outside the allowed list', () => {
    const result = validateContact({ ...VALID_CONTACT, topic: 'Complaint' });
    expect(result.errors.topic).toBe('Select a valid inquiry topic.');
  });

  it('accepts a missing message (message is optional)', () => {
    const result = validateContact({ ...VALID_CONTACT, message: '' });
    expect(result.valid).toBe(true);
    expect(result.errors.message).toBeUndefined();
  });

  it('still rejects a message longer than 2000 characters', () => {
    const result = validateContact({ ...VALID_CONTACT, message: 'm'.repeat(2001) });
    expect(result.errors.message).toBe('Message is too long (max 2000 characters).');
  });

  it('collects every error at once when the form is empty', () => {
    const result = validateContact({
      name: '',
      phone: '',
      email: '',
      topic: '',
      message: '',
    });
    expect(result.valid).toBe(false);
    // message is optional → never part of the required-error set
    expect(Object.keys(result.errors).sort()).toEqual([
      'name',
      'phone',
      'topic',
    ]);
  });
});

// ---------------------------------------------------------------------------
// sanitizeContact
// ---------------------------------------------------------------------------

describe('sanitizeContact', () => {
  it('trims every field and keeps real values', () => {
    const result = sanitizeContact({
      name: '  Test User  ',
      phone: ' 98765 43210 ',
      email: ' test@example.com ',
      topic: ALLOWED_CONTACT_TOPICS[2],
      message: '  Interested in personal training.  ',
    });
    expect(result).toEqual({
      name: 'Test User',
      phone: '98765 43210',
      email: 'test@example.com',
      topic: ALLOWED_CONTACT_TOPICS[2],
      message: 'Interested in personal training.',
    });
  });

  it('converts empty optional email to null', () => {
    expect(sanitizeContact({ ...VALID_CONTACT, email: '' }).email).toBeNull();
  });
});
