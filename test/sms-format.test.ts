import { describe, expect, it } from 'vitest';
import { otpMessage } from '@/lib/sms/message';

// BulkSMSBD only accepts OTP traffic in one shape — `Your {Brand} OTP is {code}` — and
// delays or rejects anything else. This is a gateway contract, not a copy preference, so it
// is asserted rather than left to whoever edits the string next.
describe('OTP message', () => {
  it('matches the format the gateway requires, exactly', () => {
    expect(otpMessage('482913')).toBe('Your YesTourBD OTP is 482913');
    expect(otpMessage('000001')).toMatch(/^Your YesTourBD OTP is \d{6}$/);
  });

  it('carries nothing else — no link, no instructions, nothing to trim', () => {
    const message = otpMessage('482913');
    expect(message).not.toMatch(/https?:\/\//);
    // Anti-phishing advice lives on the sign-in screen instead, where we own the words.
    expect(message.length).toBeLessThan(60);
  });
});
