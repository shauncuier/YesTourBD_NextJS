import { describe, expect, it } from 'vitest';
import {
  DEFAULT_DEPOSIT_PERCENT,
  formatTaka,
  totalsFor,
  validateQuotation,
  type QuotationDraft,
} from '@/lib/quotation';

const lines = [
  { description: 'Hotel, twin sharing', quantity: 20, unitPrice: 3200 },
  { description: 'AC bus, Dhaka return', quantity: 1, unitPrice: 42000 },
];

describe('quotation totals', () => {
  it('multiplies out each line and sums them', () => {
    const totals = totalsFor({ lines });
    expect(totals.lines.map((l) => l.amount)).toEqual([64000, 42000]);
    expect(totals.subtotal).toBe(106000);
  });

  it('applies the deposit percentage the coordinator chose', () => {
    // D3 is unanswered, so 30% is a default rather than a policy — every quotation carries
    // its own number.
    expect(totalsFor({ lines }).depositPercent).toBe(DEFAULT_DEPOSIT_PERCENT);

    const half = totalsFor({ lines, depositPercent: 50 });
    expect(half.depositAmount).toBe(53000);
    expect(half.balance).toBe(53000);
  });

  it('rounds a deposit up, never down', () => {
    // 1/3 of 1,001 is 333.67 — asking for ৳333.67 is not a thing.
    const totals = totalsFor({ lines: [{ description: 'x', quantity: 1, unitPrice: 1001 }], depositPercent: 33 });
    expect(totals.depositAmount).toBe(331);
    expect(totals.depositAmount + totals.balance).toBe(totals.total);
  });

  it('never lets a discount exceed the subtotal', () => {
    const totals = totalsFor({ lines, discount: 999999 });
    expect(totals.discount).toBe(106000);
    expect(totals.total).toBe(0);
  });

  it('ignores a negative discount rather than adding it on', () => {
    expect(totalsFor({ lines, discount: -5000 }).total).toBe(106000);
  });

  it('clamps the deposit to 0–100 percent', () => {
    expect(totalsFor({ lines, depositPercent: 140 }).depositPercent).toBe(100);
    expect(totalsFor({ lines, depositPercent: -10 }).depositPercent).toBe(0);
  });

  it('always splits the total exactly between deposit and balance', () => {
    for (const percent of [0, 7, 30, 33, 50, 99, 100]) {
      const totals = totalsFor({ lines, depositPercent: percent });
      expect(totals.depositAmount + totals.balance, `at ${percent}%`).toBe(totals.total);
    }
  });
});

describe('quotation validation', () => {
  const draft = (overrides: Partial<QuotationDraft> = {}): QuotationDraft => ({
    lines,
    discount: 0,
    depositPercent: 30,
    validUntil: '2026-12-31',
    notes: '',
    ...overrides,
  });
  const today = new Date('2026-03-10T04:00:00Z');

  it('passes a complete draft', () => {
    expect(validateQuotation(draft(), { today })).toEqual([]);
  });

  it('needs at least one line with a description', () => {
    const problems = validateQuotation(draft({ lines: [{ description: '  ', quantity: 1, unitPrice: 10 }] }), { today });
    expect(problems.some((p) => p.field === 'lines')).toBe(true);
  });

  it('rejects a line that is priced but not counted', () => {
    const problems = validateQuotation(draft({ lines: [{ description: 'Guide', quantity: 0, unitPrice: 5000 }] }), { today });
    expect(problems.some((p) => p.field === 'lines.0.quantity')).toBe(true);
  });

  it('rejects a negative price', () => {
    const problems = validateQuotation(draft({ lines: [{ description: 'Guide', quantity: 1, unitPrice: -1 }] }), { today });
    expect(problems.some((p) => p.field === 'lines.0.unitPrice')).toBe(true);
  });

  it('insists on an expiry date, and one that has not passed', () => {
    expect(validateQuotation(draft({ validUntil: '' }), { today }).some((p) => p.field === 'validUntil')).toBe(true);
    expect(validateQuotation(draft({ validUntil: '2026-03-01' }), { today }).some((p) => p.field === 'validUntil')).toBe(true);
    // Today itself is still valid — it expires at the end of the day, Dhaka time.
    expect(validateQuotation(draft({ validUntil: '2026-03-10' }), { today })).toEqual([]);
  });

  it('refuses a quotation that comes to nothing', () => {
    const problems = validateQuotation(draft({ discount: 106000 }), { today });
    expect(problems.some((p) => p.field === 'total')).toBe(true);
  });
});

describe('taka formatting', () => {
  it('matches the design system content rule', () => {
    expect(formatTaka(3200)).toBe('৳3,200');
    expect(formatTaka(106000)).toBe('৳106,000');
    expect(formatTaka(0)).toBe('৳0');
  });
});
