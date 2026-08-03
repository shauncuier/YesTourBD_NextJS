import { createHmac, timingSafeEqual } from 'node:crypto';

// Letting a customer follow their request without an account needs care: references come
// from a sequence, so REQ-2262 is one keystroke from REQ-2261. A reference alone is a
// guessable key to somebody else's phone number, trip and prices.
//
// So tracking asks for the reference *and* the mobile it was submitted with. Once those
// match, the server hands back a signed, expiring token scoped to that one reference, and
// the status page trusts nothing else. Phase 2's phone OTP replaces this with real accounts.

const TOKEN_TTL_HOURS = 24 * 30;

function secret(): string {
  const value = process.env.AUTH_SECRET;
  // The same secret that signs staff sessions. Failing loudly beats signing with '' .
  if (!value) throw new Error('AUTH_SECRET is not set — tracking links cannot be signed');
  return value;
}

function sign(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('base64url');
}

/** A token is `expiry.signature`, and says nothing on its own. */
export function issueTrackingToken(ref: string, now = new Date()): string {
  const expiresAt = now.getTime() + TOKEN_TTL_HOURS * 60 * 60 * 1000;
  return `${expiresAt}.${sign(`${ref}:${expiresAt}`)}`;
}

export function verifyTrackingToken(ref: string, token: string | undefined, now = new Date()): boolean {
  if (!token) return false;

  const [expiryPart, signature] = token.split('.');
  if (!expiryPart || !signature) return false;

  const expiresAt = Number(expiryPart);
  if (!Number.isFinite(expiresAt) || expiresAt < now.getTime()) return false;

  const expected = sign(`${ref}:${expiresAt}`);
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  // Length check first: timingSafeEqual throws on a mismatch rather than returning false.
  return a.length === b.length && timingSafeEqual(a, b);
}

/** The cookie is per reference, so one lookup does not unlock another. */
export function trackingCookieName(ref: string): string {
  return `ytb_track_${ref.replace(/[^A-Za-z0-9_-]/g, '')}`;
}

/**
 * Digits only, +880/880 reduced to a leading 0 — the same shape the request row stores, so
 * a customer typing +880 1712-345678 still matches 01712345678.
 */
export function normalisePhone(input: string): string {
  return input.trim().replace(/[\s().-]/g, '').replace(/^(?:\+?880)/, '0');
}

/**
 * What the customer is told. The staff pipeline has eight statuses; showing all of them
 * would leak how the sausage is made — "reviewing" and "submitted" are the same thing from
 * the outside, and "lost" is not a word to put in front of a customer.
 */
export const CUSTOMER_STATUS: Record<string, { label: string; blurb: string }> = {
  submitted: { label: 'Awaiting quotation', blurb: 'A coordinator is reading your request.' },
  reviewing: { label: 'Awaiting quotation', blurb: 'A coordinator is working on your prices now.' },
  quoted: { label: 'Quotation sent', blurb: 'Your itemised quotation is below. Nothing is owed until you accept it.' },
  negotiating: { label: 'Being revised', blurb: 'We are reworking the quotation around your changes.' },
  accepted: { label: 'Accepted', blurb: 'You accepted this quotation. We will confirm the booking and payment next.' },
  booked: { label: 'Booked', blurb: 'This trip is confirmed.' },
  expired: { label: 'Expired', blurb: 'This quotation ran past its date. Ask us and we will re-quote.' },
  lost: { label: 'Closed', blurb: 'This request is closed. Send a new one any time.' },
};

export function customerStatus(status: string) {
  return CUSTOMER_STATUS[status] ?? { label: 'In progress', blurb: 'A coordinator is handling this.' };
}
