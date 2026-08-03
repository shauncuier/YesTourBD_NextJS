import { describe, expect, it } from 'vitest';
import {
  MAX_ATTEMPTS,
  MAX_CODES_PER_IP_PER_HOUR,
  MAX_CODES_PER_PHONE_PER_HOUR,
  RESEND_COOLDOWN_SECONDS,
  checkChallengeUsable,
  checkSendAllowed,
  codeExpiryFrom,
} from '@/lib/otp-rules';

// A one-time code is the whole front door for customer accounts. These assert the limits
// that keep it from being guessable, floodable, or reusable.
const now = new Date('2026-03-10T04:00:00Z');
const secondsAgo = (n: number) => new Date(now.getTime() - n * 1000);

describe('sending a code', () => {
  const base = { lastSentAt: null, sentToPhoneLastHour: 0, sentFromIpLastHour: 0, now };

  it('allows a first request', () => {
    expect(checkSendAllowed(base)).toEqual({ allowed: true });
  });

  it('holds a customer to the resend cooldown', () => {
    const tooSoon = checkSendAllowed({ ...base, lastSentAt: secondsAgo(10) });
    expect(tooSoon.allowed).toBe(false);
    if (!tooSoon.allowed) {
      expect(tooSoon.retryAfterSeconds).toBe(RESEND_COOLDOWN_SECONDS - 10);
      // Says how long, rather than "try again later" — the customer is waiting on an SMS.
      expect(tooSoon.reason).toMatch(/\d+ seconds/);
    }
  });

  it('allows a resend once the cooldown has passed', () => {
    expect(checkSendAllowed({ ...base, lastSentAt: secondsAgo(RESEND_COOLDOWN_SECONDS) }).allowed).toBe(true);
  });

  it('caps codes per number per hour — an attacker spends someone else money on SMS', () => {
    const flooded = checkSendAllowed({
      ...base,
      lastSentAt: secondsAgo(RESEND_COOLDOWN_SECONDS + 1),
      sentToPhoneLastHour: MAX_CODES_PER_PHONE_PER_HOUR,
    });
    expect(flooded.allowed).toBe(false);
  });

  it('caps codes per connection, so one machine cannot walk through numbers', () => {
    const flooded = checkSendAllowed({
      ...base,
      lastSentAt: secondsAgo(RESEND_COOLDOWN_SECONDS + 1),
      sentFromIpLastHour: MAX_CODES_PER_IP_PER_HOUR,
    });
    expect(flooded.allowed).toBe(false);
  });
});

describe('using a code', () => {
  const live = { expiresAt: new Date(now.getTime() + 60_000), attempts: 0, consumedAt: null };

  it('accepts a live, unused, unexhausted challenge', () => {
    expect(checkChallengeUsable(live, now)).toEqual({ ok: true });
  });

  it('refuses one that has already been used', () => {
    expect(checkChallengeUsable({ ...live, consumedAt: now }, now).ok).toBe(false);
  });

  it('refuses one that has expired', () => {
    expect(checkChallengeUsable({ ...live, expiresAt: new Date(now.getTime() - 1) }, now).ok).toBe(false);
  });

  it('refuses one that has run out of guesses', () => {
    expect(checkChallengeUsable({ ...live, attempts: MAX_ATTEMPTS }, now).ok).toBe(false);
    expect(checkChallengeUsable({ ...live, attempts: MAX_ATTEMPTS - 1 }, now).ok).toBe(true);
  });

  it('refuses when there is no challenge at all', () => {
    expect(checkChallengeUsable(null, now).ok).toBe(false);
  });

  it('gives one message for every failure', () => {
    // Distinguishing "wrong code" from "expired" tells an attacker which half to fix.
    const reasons = new Set(
      [
        checkChallengeUsable(null, now),
        checkChallengeUsable({ ...live, consumedAt: now }, now),
        checkChallengeUsable({ ...live, expiresAt: new Date(now.getTime() - 1) }, now),
        checkChallengeUsable({ ...live, attempts: MAX_ATTEMPTS }, now),
      ].map((verdict) => (verdict.ok ? 'ok' : verdict.reason)),
    );
    expect(reasons.size).toBe(1);
  });
});

describe('expiry', () => {
  it('is five minutes out', () => {
    expect(codeExpiryFrom(now).getTime() - now.getTime()).toBe(5 * 60_000);
  });
});
