import { beforeAll, describe, expect, it } from 'vitest';
import {
  customerStatus,
  issueTrackingToken,
  normalisePhone,
  trackingCookieName,
  verifyTrackingToken,
} from '@/lib/tracking';

beforeAll(() => {
  process.env.AUTH_SECRET = 'test-secret-for-tracking-tokens';
});

describe('tracking tokens', () => {
  it('accepts a token it issued for that reference', () => {
    const token = issueTrackingToken('REQ-2261');
    expect(verifyTrackingToken('REQ-2261', token)).toBe(true);
  });

  it('does not unlock a different reference', () => {
    // References are sequential, so this is the attack: read your own, then try the neighbour.
    const token = issueTrackingToken('REQ-2261');
    expect(verifyTrackingToken('REQ-2262', token)).toBe(false);
  });

  it('rejects an expired token', () => {
    const issued = new Date('2026-03-01T00:00:00Z');
    const token = issueTrackingToken('REQ-2261', issued);
    const muchLater = new Date('2026-06-01T00:00:00Z');
    expect(verifyTrackingToken('REQ-2261', token, muchLater)).toBe(false);
  });

  it('rejects a tampered expiry', () => {
    const token = issueTrackingToken('REQ-2261');
    const [, signature] = token.split('.');
    const forged = `${Date.now() + 999_999_999}.${signature}`;
    expect(verifyTrackingToken('REQ-2261', forged)).toBe(false);
  });

  it('rejects rubbish rather than throwing', () => {
    for (const bad of [undefined, '', 'nonsense', 'abc.def', '.', `${Date.now() + 10000}.`]) {
      expect(verifyTrackingToken('REQ-2261', bad), String(bad)).toBe(false);
    }
  });

  it('scopes the cookie to one reference and keeps the name safe', () => {
    expect(trackingCookieName('REQ-2261')).toBe('ytb_track_REQ-2261');
    expect(trackingCookieName('REQ 22/61; drop')).toBe('ytb_track_REQ2261drop');
  });
});

describe('phone matching', () => {
  it('reduces every way a customer writes their number to the stored form', () => {
    for (const written of ['01712345678', '+8801712345678', '8801712345678', '01712-345678', '+880 1712 345678']) {
      expect(normalisePhone(written), written).toBe('01712345678');
    }
  });
});

describe('customer-facing status', () => {
  it('hides the internal pipeline behind words a customer can act on', () => {
    // Both mean "we have not replied yet" from outside.
    expect(customerStatus('submitted').label).toBe('Awaiting quotation');
    expect(customerStatus('reviewing').label).toBe('Awaiting quotation');
    // "Lost" is not a word to put in front of the person who asked.
    expect(customerStatus('lost').label).toBe('Closed');
    expect(customerStatus('quoted').label).toBe('Quotation sent');
  });

  it('falls back rather than showing a raw status', () => {
    expect(customerStatus('something_new').label).toBe('In progress');
  });
});
