import { describe, expect, it } from 'vitest';
import { parseQuoteRequest } from '@/lib/quote-requests';

// The form is public and unauthenticated, so these rules are the only thing between a
// stranger and the database. They are asserted here rather than through the screen because
// the server re-runs them regardless of what the browser did.

function formOf(overrides: Record<string, string | string[]> = {}) {
  const base: Record<string, string | string[]> = {
    requestType: 'corporate',
    destinations: 'Sylhet + Sreemangal',
    paxBand: '10-24',
    name: 'Nusrat Jahan',
    phone: '01712345678',
    contactPref: 'whatsapp',
    consent: 'on',
  };
  const data = new FormData();
  for (const [key, value] of Object.entries({ ...base, ...overrides })) {
    if (Array.isArray(value)) value.forEach((v) => data.append(key, v));
    else data.set(key, value);
  }
  return data;
}

describe('quote request validation', () => {
  it('accepts the minimum a coordinator can act on', () => {
    const result = parseQuoteRequest(formOf());
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.requestType).toBe('corporate');
    expect(result.data.needs).toEqual([]);
  });

  it('normalises +880 and separators to a single stored form', () => {
    for (const written of ['+8801712345678', '8801712345678', '01712-345678', '+880 1712 345678']) {
      const result = parseQuoteRequest(formOf({ phone: written }));
      expect(result.ok, written).toBe(true);
      if (result.ok) expect(result.data.phone).toBe('01712345678');
    }
  });

  it('rejects numbers that are not Bangladeshi mobiles', () => {
    for (const bad of ['12345', '+441234567890', '01212345678', 'not a phone']) {
      const result = parseQuoteRequest(formOf({ phone: bad }));
      expect(result.ok, bad).toBe(false);
      if (!result.ok) expect(result.errors.phone).toMatch(/Bangladeshi mobile/);
    }
  });

  it('requires the consent tick', () => {
    const data = formOf();
    data.delete('consent');
    const result = parseQuoteRequest(data);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.consent).toMatch(/agree to be contacted/);
  });

  it('rejects an unknown request type or traveller band rather than coercing it', () => {
    expect(parseQuoteRequest(formOf({ requestType: 'wedding' })).ok).toBe(false);
    expect(parseQuoteRequest(formOf({ paxBand: 'loads' })).ok).toBe(false);
  });

  it('treats blank optional fields as absent, not as empty strings', () => {
    const result = parseQuoteRequest(formOf({ email: '', startDate: '', org: '', notes: '' }));
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.email).toBeUndefined();
    expect(result.data.startDate).toBeUndefined();
    expect(result.data.org).toBeUndefined();
  });

  it('validates an email only when one is given', () => {
    expect(parseQuoteRequest(formOf({ email: 'nusrat@example.com' })).ok).toBe(true);
    const bad = parseQuoteRequest(formOf({ email: 'nusrat@' }));
    expect(bad.ok).toBe(false);
    if (!bad.ok) expect(bad.errors.email).toMatch(/email/i);
  });

  it('keeps every selected need and coerces nights to a number', () => {
    const result = parseQuoteRequest(formOf({ needs: ['Need hotel', 'Need meals'], nights: '3' }));
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.needs).toEqual(['Need hotel', 'Need meals']);
    expect(result.data.nights).toBe(3);
  });

  it('reports every bad field at once, one message each', () => {
    const result = parseQuoteRequest(formOf({ destinations: '', phone: 'x', name: '' }));
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(Object.keys(result.errors).sort()).toEqual(['destinations', 'name', 'phone']);
  });
});
