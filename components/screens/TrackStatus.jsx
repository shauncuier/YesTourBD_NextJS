'use client';

import React from 'react';
import { Badge, Button, Icon } from '../index.js';
import layout from '../../styles/layout.module.css';
import c from './screens.module.css';

const IDLE = { status: 'idle' };

function Money({ children }) {
  return <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--navy-900)' }}>{children}</span>;
}

/**
 * What the customer sees. Deliberately less than the staff view: no internal notes, no owner,
 * no pipeline vocabulary — only their own request, the price, and the two things they can do
 * about it.
 */
export function TrackStatus({ request, quotation, acceptAction = async () => IDLE, changesAction = async () => IDLE }) {
  const [acceptState, accept, accepting] = React.useActionState(acceptAction, IDLE);
  const [changeState, requestChanges, changing] = React.useActionState(changesAction, IDLE);
  const [showChanges, setShowChanges] = React.useState(false);

  const decidable = quotation && quotation.status === 'sent';

  return (
    <div style={{ background: 'var(--color-bg-page)', paddingBottom: 'var(--space-16)' }}>
      <div style={{ background: 'var(--gradient-dusk, var(--navy-900))', padding: 'var(--space-10) 0' }}>
        <div className={layout.containerNarrow} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--teal-300)' }}>{request.ref}</span>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 'var(--weight-semibold)', color: '#fff', letterSpacing: 'var(--tracking-tight)' }}>
            {request.statusLabel}
          </h1>
          <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', color: 'var(--navy-200)', lineHeight: 'var(--leading-relaxed)', maxWidth: 560 }}>
            {request.statusBlurb}
          </p>
        </div>
      </div>

      <div className={layout.containerNarrow} style={{ marginTop: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        <section style={{ padding: 'var(--space-5)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
          <h2 style={{ margin: '0 0 var(--space-4)', fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)', fontWeight: 'var(--weight-semibold)', color: 'var(--navy-900)' }}>What you asked for</h2>
          <div className={c.pairGrid} style={{ gap: 'var(--space-3)' }}>
            <div><dt style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>Where</dt><dd style={{ margin: '3px 0 0', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--navy-900)' }}>{request.destinations}</dd></div>
            <div><dt style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>Travellers</dt><dd style={{ margin: '3px 0 0', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--navy-900)' }}>{request.paxBand}</dd></div>
            <div><dt style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>Sent</dt><dd style={{ margin: '3px 0 0', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--navy-900)' }}>{request.submitted}</dd></div>
          </div>
        </section>

        {quotation ? (
          <section style={{ padding: 'var(--space-5)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)', fontWeight: 'var(--weight-semibold)', color: 'var(--navy-900)' }}>Your quotation</h2>
              <Badge tone={quotation.status === 'accepted' ? 'success' : 'teal'} dot>{quotation.status === 'accepted' ? 'accepted' : 'awaiting your answer'}</Badge>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
              <tbody>
                {quotation.lines.map((line, index) => (
                  <tr key={index}>
                    <td style={{ padding: '8px 0', color: 'var(--color-text-secondary)' }}>
                      {line.description}
                      <span style={{ color: 'var(--color-text-muted)' }}> · {line.quantity} × <Money>{line.unitPriceLabel}</Money></span>
                    </td>
                    <td style={{ padding: '8px 0', textAlign: 'right' }}><Money>{line.amountLabel}</Money></td>
                  </tr>
                ))}
                {quotation.discountLabel ? (
                  <tr><td style={{ padding: '8px 0', color: 'var(--color-text-secondary)' }}>Discount</td><td style={{ padding: '8px 0', textAlign: 'right' }}><Money>−{quotation.discountLabel}</Money></td></tr>
                ) : null}
                <tr style={{ borderTop: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '10px 0', fontWeight: 'var(--weight-semibold)', color: 'var(--navy-900)' }}>Total</td>
                  <td style={{ padding: '10px 0', textAlign: 'right', fontWeight: 'var(--weight-semibold)' }}><Money>{quotation.totalLabel}</Money></td>
                </tr>
                <tr><td style={{ padding: '4px 0', color: 'var(--color-text-secondary)' }}>{quotation.depositPercent}% to hold</td><td style={{ padding: '4px 0', textAlign: 'right' }}><Money>{quotation.depositLabel}</Money></td></tr>
                <tr><td style={{ padding: '4px 0', color: 'var(--color-text-secondary)' }}>Balance before departure</td><td style={{ padding: '4px 0', textAlign: 'right' }}><Money>{quotation.balanceLabel}</Money></td></tr>
              </tbody>
            </table>

            <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
              This price holds until {quotation.validUntil}.
            </p>

            {quotation.notes ? (
              <p style={{ margin: 0, padding: 'var(--space-4)', background: 'var(--navy-50)', border: '1px solid var(--navy-100)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--navy-800)', lineHeight: 'var(--leading-relaxed)', whiteSpace: 'pre-wrap' }}>{quotation.notes}</p>
            ) : null}

            {decidable ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                  <form action={accept}>
                    <input type="hidden" name="ref" value={request.ref} />
                    <Button type="submit" size="lg" disabled={accepting}>{accepting ? 'Accepting…' : 'Accept this quotation'}</Button>
                  </form>
                  <Button type="button" size="lg" variant="outline" onClick={() => setShowChanges((v) => !v)}>Ask for changes</Button>
                </div>
                <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                  Accepting tells us to hold it. Payment is arranged afterwards — nothing is taken here.
                </p>

                {showChanges ? (
                  <form action={requestChanges} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    <input type="hidden" name="ref" value={request.ref} />
                    <label htmlFor="change-message" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--gray-700)' }}>What would you like different?</label>
                    <textarea id="change-message" name="message" rows={3} placeholder="Can we move it a week later, and swap the hotel for something closer to the beach?"
                      style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', resize: 'vertical', background: 'var(--color-bg-surface)' }} />
                    <div><Button type="submit" variant="secondary" disabled={changing}>{changing ? 'Sending…' : 'Send to the coordinator'}</Button></div>
                  </form>
                ) : null}
              </div>
            ) : null}

            {acceptState.status === 'error' ? (
              <div role="alert" style={{ padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', background: 'rgba(220,38,38,.06)', color: 'var(--color-danger)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>{acceptState.message}</div>
            ) : null}
            {changeState.status === 'error' ? (
              <div role="alert" style={{ padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', background: 'rgba(220,38,38,.06)', color: 'var(--color-danger)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>{changeState.message}</div>
            ) : null}
          </section>
        ) : (
          <section style={{ padding: 'var(--space-5)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
            <span style={{ color: 'var(--teal-600)' }}><Icon name="clock" size={18} /></span>
            <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
              No quotation yet. A coordinator replies within two working hours — the desk is open 9 AM to 10 PM, seven days.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
