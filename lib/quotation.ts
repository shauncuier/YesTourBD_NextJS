// Quotation arithmetic, kept pure so it can be tested without a database and reused by
// whatever renders the customer's copy later.
//
// Money is whole taka held as integers. Floating point has no business anywhere near a
// number a customer will be asked to pay, and the design system's own price format
// (৳3,200 — no decimals) says taka is the unit the business quotes in.

export type LineItemInput = {
  description: string;
  /** People, nights, vehicles — whatever the line is counted in. */
  quantity: number;
  /** Whole taka per unit. */
  unitPrice: number;
};

export type LineItem = LineItemInput & { amount: number };

export type QuotationTotals = {
  lines: LineItem[];
  subtotal: number;
  discount: number;
  total: number;
  depositPercent: number;
  /** Rounded up: asking for ৳1,410.4 is not a thing, and rounding down favours nobody. */
  depositAmount: number;
  balance: number;
};

export const MAX_LINE_ITEMS = 20;
export const DEFAULT_DEPOSIT_PERCENT = 30;

export function lineAmount(line: LineItemInput): number {
  return Math.round(line.quantity * line.unitPrice);
}

export function totalsFor(params: {
  lines: LineItemInput[];
  discount?: number;
  depositPercent?: number;
}): QuotationTotals {
  const lines = params.lines.map((line) => ({ ...line, amount: lineAmount(line) }));
  const subtotal = lines.reduce((sum, line) => sum + line.amount, 0);

  // A discount can never exceed the subtotal, whatever someone types.
  const discount = Math.min(Math.max(Math.round(params.discount ?? 0), 0), subtotal);
  const total = subtotal - discount;

  const depositPercent = Math.min(Math.max(Math.round(params.depositPercent ?? DEFAULT_DEPOSIT_PERCENT), 0), 100);
  const depositAmount = Math.ceil((total * depositPercent) / 100);

  return { lines, subtotal, discount, total, depositPercent, depositAmount, balance: total - depositAmount };
}

export type QuotationDraft = {
  lines: LineItemInput[];
  discount: number;
  depositPercent: number;
  validUntil: string;
  notes: string;
};

export type QuotationProblem = { field: string; message: string };

/**
 * What has to be true before a quotation can go to a customer. Deliberately strict about
 * dates and empty lines: a quotation with no expiry never expires, and a zero-quantity line
 * is a half-finished thought that would still print.
 */
export function validateQuotation(
  draft: QuotationDraft,
  options: { today?: Date } = {},
): QuotationProblem[] {
  const problems: QuotationProblem[] = [];
  const today = options.today ?? new Date();

  const usable = draft.lines.filter((line) => line.description.trim() !== '');
  if (!usable.length) problems.push({ field: 'lines', message: 'Add at least one line item.' });
  if (draft.lines.length > MAX_LINE_ITEMS) {
    problems.push({ field: 'lines', message: `A quotation can hold ${MAX_LINE_ITEMS} lines.` });
  }

  for (const [index, line] of usable.entries()) {
    if (!Number.isFinite(line.quantity) || line.quantity <= 0) {
      problems.push({ field: `lines.${index}.quantity`, message: `Line ${index + 1}: quantity must be more than zero.` });
    }
    if (!Number.isFinite(line.unitPrice) || line.unitPrice < 0) {
      problems.push({ field: `lines.${index}.unitPrice`, message: `Line ${index + 1}: price cannot be negative.` });
    }
  }

  const totals = totalsFor({ lines: usable, discount: draft.discount, depositPercent: draft.depositPercent });
  if (usable.length && totals.total <= 0) {
    problems.push({ field: 'total', message: 'The total comes to nothing — check the prices and the discount.' });
  }

  if (!draft.validUntil) {
    problems.push({ field: 'validUntil', message: 'Give the quotation an expiry date.' });
  } else {
    const validUntil = new Date(`${draft.validUntil}T23:59:59+06:00`);
    if (Number.isNaN(validUntil.getTime())) {
      problems.push({ field: 'validUntil', message: 'That is not a date.' });
    } else if (validUntil.getTime() < today.getTime()) {
      problems.push({ field: 'validUntil', message: 'The expiry date has already passed.' });
    }
  }

  return problems;
}

/**
 * A week out, as yyyy-mm-dd for a date input. A quotation with no expiry never expires, so
 * the field is prefilled rather than left for someone to forget.
 */
export function defaultValidUntil(from = new Date()): string {
  const week = new Date(from.getTime() + 7 * 24 * 60 * 60 * 1000);
  return week.toISOString().slice(0, 10);
}

/** ৳3,200 — the format the design system's content rules fix. */
export function formatTaka(amount: number): string {
  return `৳${Math.round(amount).toLocaleString('en-US')}`;
}
