'use client';

import React from 'react';
import { Button, Icon, Input } from '../index.js';
import { DEFAULT_DEPOSIT_PERCENT, formatTaka, totalsFor } from '../../lib/quotation';
import c from './admin.module.css';

const IDLE = { status: 'idle' };
const BLANK_LINE = { description: '', quantity: '1', unitPrice: '' };

// The itemised quotation form from the design system's admin kit, with the arithmetic shown
// as it is typed — a coordinator quoting 34 people should not be doing the multiplication in
// their head while the customer waits. The server recomputes all of it; this is a preview.
export function QuotationBuilder({ refId, defaultValidUntil, action = async () => IDLE }) {
  const [state, submit, pending] = React.useActionState(action, IDLE);
  const [lines, setLines] = React.useState([{ ...BLANK_LINE }]);
  const [discount, setDiscount] = React.useState('0');
  const [depositPercent, setDepositPercent] = React.useState(String(DEFAULT_DEPOSIT_PERCENT));

  const totals = totalsFor({
    lines: lines.map((line) => ({
      description: line.description,
      quantity: Number(line.quantity) || 0,
      unitPrice: Number(line.unitPrice) || 0,
    })),
    discount: Number(discount) || 0,
    depositPercent: Number(depositPercent) || 0,
  });

  const setLine = (index, patch) =>
    setLines((current) => current.map((line, i) => (i === index ? { ...line, ...patch } : line)));

  const problems = state.status === 'invalid' ? state.problems : [];

  return (
    <form action={submit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <input type="hidden" name="ref" value={refId} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {lines.map((line, index) => (
          <div key={index} className={c.quoteLine}>
            <Input
              name="lineDescription"
              placeholder="Hotel, twin sharing · 2 nights"
              value={line.description}
              onChange={(e) => setLine(index, { description: e.target.value })}
            />
            <Input
              name="lineQuantity"
              type="number"
              inputMode="numeric"
              placeholder="Qty"
              value={line.quantity}
              onChange={(e) => setLine(index, { quantity: e.target.value })}
            />
            <Input
              name="lineUnitPrice"
              type="number"
              inputMode="numeric"
              placeholder="৳ each"
              value={line.unitPrice}
              onChange={(e) => setLine(index, { unitPrice: e.target.value })}
            />
            <span className={c.quoteLineAmount}>{formatTaka(totals.lines[index]?.amount ?? 0)}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={lines.length === 1}
              onClick={() => setLines((current) => current.filter((_, i) => i !== index))}
            >
              Remove
            </Button>
          </div>
        ))}
        <div>
          <Button type="button" variant="outline" size="sm" iconLeft={<Icon name="plus" size={15} />}
            onClick={() => setLines((current) => [...current, { ...BLANK_LINE }])}>
            Add a line
          </Button>
        </div>
      </div>

      <div className={c.quoteMeta}>
        <Input label="Discount (৳)" name="discount" type="number" inputMode="numeric" value={discount} onChange={(e) => setDiscount(e.target.value)} />
        <Input
          label="Deposit to hold (%)"
          name="depositPercent"
          type="number"
          inputMode="numeric"
          value={depositPercent}
          onChange={(e) => setDepositPercent(e.target.value)}
          helperText="Default 30% — the brief's figure, not yet confirmed"
        />
        <Input label="Valid until" name="validUntil" type="date" defaultValue={defaultValidUntil} required />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label htmlFor="quotation-notes" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--gray-700)' }}>
          What the customer should know
        </label>
        <textarea
          id="quotation-notes"
          name="notes"
          rows={3}
          placeholder="Price holds for 34 travellers. Hotel can be swapped for Sayeman at ৳900 more per head."
          style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', padding: '9px 11px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', resize: 'vertical', background: 'var(--color-bg-surface)' }}
        />
      </div>

      <dl className={c.quoteTotals}>
        <div><dt>Subtotal</dt><dd>{formatTaka(totals.subtotal)}</dd></div>
        {totals.discount ? <div><dt>Discount</dt><dd>−{formatTaka(totals.discount)}</dd></div> : null}
        <div className={c.quoteTotalRow}><dt>Total</dt><dd>{formatTaka(totals.total)}</dd></div>
        <div><dt>{totals.depositPercent}% to hold</dt><dd>{formatTaka(totals.depositAmount)}</dd></div>
        <div><dt>Balance before departure</dt><dd>{formatTaka(totals.balance)}</dd></div>
      </dl>

      {problems.length ? (
        <div role="alert" style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', background: 'rgba(220,38,38,.06)', color: 'var(--color-danger)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
          {problems.map((problem) => <span key={`${problem.field}-${problem.message}`}>{problem.message}</span>)}
        </div>
      ) : null}

      {state.status === 'error' ? (
        <div role="alert" style={{ padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', background: 'rgba(220,38,38,.06)', color: 'var(--color-danger)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>{state.message}</div>
      ) : null}

      {state.status === 'sent' ? (
        <div role="status" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', background: 'var(--teal-50)', color: 'var(--teal-700)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
          <Icon name="check-circle" size={16} />
          Quotation recorded at {formatTaka(state.total)}. Delivery to the customer arrives with M1.3.
        </div>
      ) : null}

      <div>
        <Button type="submit" disabled={pending}>{pending ? 'Saving…' : 'Send quotation'}</Button>
      </div>
    </form>
  );
}
