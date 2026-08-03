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

/**
 * A mobile number for a log line. Logs are read by more people, kept for longer and shipped
 * further than the database is, so a delivery failure should not put a customer's full number
 * in one: 01712345678 becomes 017••••5678.
 */
export function maskMobile(mobile: string): string {
  if (mobile.length < 8) return '••••';
  return `${mobile.slice(0, 3)}••••${mobile.slice(-4)}`;
}
