/**
 * BulkSMSBD requires OTP messages in exactly this shape — `Your {Brand} OTP is {code}` — and
 * rejects or delays anything else. This is a gateway contract, not a copy preference.
 *
 * It costs us the "we will never ask you for this" line that would otherwise sit here as
 * anti-phishing advice; that warning moved to the sign-in screen, where we own the words.
 *
 * Import-free on purpose, like lib/staff-roles.ts and lib/quote-queue-filters.ts: a test for
 * the wording should not drag the database client into jsdom.
 */
export function otpMessage(code: string): string {
  return `Your YesTourBD OTP is ${code}`;
}
