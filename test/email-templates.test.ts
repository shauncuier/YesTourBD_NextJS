import { describe, expect, it } from 'vitest';
import { quotationSent, quoteRequestInternal, quoteRequestReceived } from '@/lib/email/templates';

// The design system's content rules apply to email too — this is where they are easiest to
// break, because nobody reviews an email the way they review a screen.
const BRAND_RULES = (text: string) => {
  // No emoji: the rule is absolute in the design system's content section.
  expect(text, 'emoji').not.toMatch(/\p{Extended_Pictographic}/u);
  // Taka with comma grouping, never a decimal.
  for (const amount of text.match(/৳[\d,.]+/g) ?? []) {
    expect(amount, `${amount} has decimals`).not.toMatch(/\./);
  }
  // Dates day-first, never 03/12/26.
  expect(text, 'slashed date').not.toMatch(/\b\d{2}\/\d{2}\/\d{2}\b/);
};

describe('customer acknowledgement', () => {
  const mail = quoteRequestReceived({
    ref: 'REQ-2261',
    name: 'Nusrat Jahan',
    destinations: 'Sylhet + Sreemangal',
    contactPref: 'whatsapp',
  });

  it('leads with the reference, because that is what a customer quotes back', () => {
    expect(mail.subject).toContain('REQ-2261');
    expect(mail.body).toContain('REQ-2261');
  });

  it('names the channel the customer actually chose', () => {
    expect(mail.body).toContain('WhatsApp');
    expect(quoteRequestReceived({ ref: 'x', name: 'n', destinations: 'd', contactPref: 'call' }).body).toContain('call you');
    expect(quoteRequestReceived({ ref: 'x', name: 'n', destinations: 'd', contactPref: 'email' }).body).toContain('email you');
  });

  it('says the awkward part out loud: the desk closes', () => {
    expect(mail.body).toMatch(/9 AM to 10 PM/);
    expect(mail.body).toMatch(/two working hours/);
  });

  it('promises nothing about money', () => {
    expect(mail.body).toMatch(/[Nn]othing is booked and nothing is owed/);
  });

  it('follows the brand content rules', () => BRAND_RULES(`${mail.subject}\n${mail.body}`));
});

describe('internal notification', () => {
  const mail = quoteRequestInternal({
    ref: 'REQ-2262',
    name: 'Tanvir Hasan',
    phone: '01712345678',
    email: null,
    requestType: 'corporate',
    destinations: "Cox's Bazar",
    paxBand: '25-49',
    notes: null,
    queueUrl: 'https://example.test/admin/requests/REQ-2262',
  });

  it('carries everything the desk needs to act without opening anything', () => {
    expect(mail.body).toContain('01712345678');
    expect(mail.body).toContain('25-49');
    expect(mail.body).toContain('https://example.test/admin/requests/REQ-2262');
  });

  it('is explicit when a field is missing rather than leaving a blank', () => {
    expect(mail.body).toContain('not given');
    expect(mail.body).toContain('None.');
  });

  it('says the clock is running', () => {
    expect(mail.body).toMatch(/two-hour clock/);
  });
});

describe('quotation', () => {
  const mail = quotationSent({
    ref: 'REQ-2263',
    name: 'Farhana Akter',
    lines: [
      { description: 'Hotel, twin sharing', quantity: 20, unitPrice: 3200, amount: 64000 },
      { description: 'AC bus, Dhaka return', quantity: 1, unitPrice: 42000, amount: 42000 },
    ],
    subtotal: 106000,
    discount: 6000,
    total: 100000,
    depositPercent: 30,
    depositAmount: 30000,
    balance: 70000,
    validUntil: new Date('2026-04-15T00:00:00+06:00'),
    notes: 'Hotel can be swapped for Sayeman at ৳900 more per head.',
  });

  it('itemises rather than sending one number', () => {
    expect(mail.body).toContain('Hotel, twin sharing — 20 × ৳3,200 = ৳64,000');
    expect(mail.body).toContain('AC bus, Dhaka return — 1 × ৳42,000 = ৳42,000');
  });

  it('shows the discount, the total and the split', () => {
    expect(mail.body).toContain('−৳6,000');
    expect(mail.body).toContain('Total ৳100,000');
    expect(mail.body).toContain('30% to hold — ৳30,000');
    expect(mail.body).toContain('Balance before departure — ৳70,000');
  });

  it('states the expiry day-first', () => {
    expect(mail.body).toContain('15 Apr 2026');
  });

  it('invites changes, which is the point of a request-based quotation', () => {
    expect(mail.body).toMatch(/Anything here can change/);
  });

  it('carries the coordinator\'s note through', () => {
    expect(mail.body).toContain('Sayeman');
  });

  it('follows the brand content rules', () => BRAND_RULES(`${mail.subject}\n${mail.body}`));
});
