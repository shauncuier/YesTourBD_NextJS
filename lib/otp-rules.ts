// The rules an OTP has to obey, kept pure and import-free so they can be tested exhaustively
// and read in one place. A one-time code is the whole front door for customer accounts, so
// each number here is a deliberate trade between a stranger guessing and a real customer on
// a slow network giving up.

/** Six digits: what a Bangladeshi customer expects to be read out over a phone line. */
export const CODE_LENGTH = 6;

/** Long enough to arrive on a slow network, short enough that a stolen phone is not a key. */
export const CODE_TTL_MINUTES = 5;

/** Wrong guesses before the challenge is dead. 6 digits × 5 tries = 1 in 200,000. */
export const MAX_ATTEMPTS = 5;

/** A customer who presses "resend" twice should not be able to flood their own inbox. */
export const RESEND_COOLDOWN_SECONDS = 60;

/** Codes per phone per hour — an attacker paying for someone else's SMS bill is abuse too. */
export const MAX_CODES_PER_PHONE_PER_HOUR = 5;

/** Codes per IP per hour, to stop one machine enumerating many numbers. */
export const MAX_CODES_PER_IP_PER_HOUR = 20;

export type SendVerdict = { allowed: true } | { allowed: false; reason: string; retryAfterSeconds?: number };

export function checkSendAllowed(params: {
  lastSentAt: Date | null;
  sentToPhoneLastHour: number;
  sentFromIpLastHour: number;
  now?: Date;
}): SendVerdict {
  const now = params.now ?? new Date();

  if (params.lastSentAt) {
    const elapsed = (now.getTime() - params.lastSentAt.getTime()) / 1000;
    if (elapsed < RESEND_COOLDOWN_SECONDS) {
      const wait = Math.ceil(RESEND_COOLDOWN_SECONDS - elapsed);
      return {
        allowed: false,
        reason: `Wait ${wait} seconds before asking for another code.`,
        retryAfterSeconds: wait,
      };
    }
  }

  if (params.sentToPhoneLastHour >= MAX_CODES_PER_PHONE_PER_HOUR) {
    return { allowed: false, reason: 'Too many codes for this number in the last hour. Try again later, or call us.' };
  }

  if (params.sentFromIpLastHour >= MAX_CODES_PER_IP_PER_HOUR) {
    return { allowed: false, reason: 'Too many sign-in attempts from this connection. Try again later.' };
  }

  return { allowed: true };
}

export type ChallengeState = {
  expiresAt: Date;
  attempts: number;
  consumedAt: Date | null;
};

export type VerifyVerdict = { ok: true } | { ok: false; reason: string };

/**
 * Everything about a challenge except whether the digits match — that comparison needs the
 * hash and belongs with the database. Deliberately gives one message for every failure: a
 * response that distinguishes "wrong code" from "expired" tells an attacker which half to
 * fix.
 */
export function checkChallengeUsable(challenge: ChallengeState | null, now = new Date()): VerifyVerdict {
  const generic = { ok: false as const, reason: 'That code is wrong or has expired. Ask for a new one.' };

  if (!challenge) return generic;
  if (challenge.consumedAt) return generic;
  if (challenge.attempts >= MAX_ATTEMPTS) return generic;
  if (challenge.expiresAt.getTime() <= now.getTime()) return generic;

  return { ok: true };
}

export function codeExpiryFrom(now = new Date()): Date {
  return new Date(now.getTime() + CODE_TTL_MINUTES * 60_000);
}
