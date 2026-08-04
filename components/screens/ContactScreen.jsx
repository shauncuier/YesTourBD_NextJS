'use client';

import React from 'react';
import Link from 'next/link';
import { Badge, Button, Icon, Input, Select, Toast } from '../index.js';
import { SUPPORT_TOPICS } from '../../lib/support';
import layout from '../../styles/layout.module.css';
import c from './screens.module.css';

const IDLE = { status: 'idle' };

function Method({ icon, label, value, href, note }) {
  return (
    <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
      <span style={{ width: 38, height: 38, flex: '0 0 auto', borderRadius: 'var(--radius-md)', background: 'var(--teal-50)', color: 'var(--teal-600)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={icon} size={18} />
      </span>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>{label}</div>
        {href ? (
          <a href={href} style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)', fontWeight: 'var(--weight-semibold)', color: 'var(--navy-900)', textDecoration: 'none' }}>{value}</a>
        ) : (
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)', fontWeight: 'var(--weight-semibold)', color: 'var(--navy-900)' }}>{value}</div>
        )}
        {note ? <div style={{ marginTop: 2, fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>{note}</div> : null}
      </div>
    </div>
  );
}

/**
 * Request-based, so navy rather than teal: nothing here is booked instantly, a person answers
 * it. The form posts into the same queue as a quote request — same reference, same
 * two-working-hour promise.
 */
export function ContactScreen({ action = async () => IDLE }) {
  const [state, submit, pending] = React.useActionState(action, IDLE);
  const errors = state.status === 'invalid' ? state.errors : {};
  // React 19 clears an uncontrolled form when its action returns, so a rejected submission
  // would otherwise wipe everything typed. The server hands the values back and they go
  // straight into the fields again.
  const kept = state.status === 'invalid' || state.status === 'error' ? state.values : null;

  // The text fields come back through `defaultValue`, which a form reset honours. A <select>
  // does not — reset restores it from its option attributes — so it is remounted with a key
  // when the server hands values back, which re-applies its defaultValue.
  const topicKey = `topic-${kept?.topic ?? ''}`;

  return (
    <div style={{ background: 'var(--color-bg-page)', paddingBottom: 'var(--space-16)' }}>
      <div className={c.requestHero}>
        <div className={layout.containerNarrow} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <Badge tone="brand" variant="outline" size="md" style={{ alignSelf: 'flex-start' }}>A person answers this</Badge>
          <h1 className={c.requestTitle}>Talk to us</h1>
          <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', color: 'var(--navy-200)', lineHeight: 'var(--leading-relaxed)', maxWidth: 560 }}>
            The desk is open 9 AM to 10 PM, seven days. Messages sent after hours are answered
            the next morning — we would rather say that than pretend otherwise.
          </p>
        </div>
      </div>

      <div className={`${layout.container} ${c.requestLayout}`}>
        <form action={submit} className={c.requestCard} noValidate>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)', fontWeight: 'var(--weight-semibold)', color: 'var(--navy-900)' }}>Send a message</span>

            <div className={c.pairGrid} style={{ gap: 'var(--space-4)' }}>
              <Input label="Your name" name="name" defaultValue={kept?.name ?? ''} required placeholder="Full name" autoComplete="name" error={errors.name} />
              <Input label="Mobile" name="phone" defaultValue={kept?.phone ?? ''} type="tel" inputMode="tel" required placeholder="+880 1XXX-XXXXXX" autoComplete="tel" error={errors.phone} />
              <Input label="Email" name="email" defaultValue={kept?.email ?? ''} type="email" placeholder="you@example.com" autoComplete="email" helperText="Optional. We reply here if you give one." error={errors.email} />
              <Select key={topicKey} label="What is this about?" name="topic" defaultValue={kept?.topic ?? ''} required placeholder="Choose one" options={SUPPORT_TOPICS.map((t) => ({ label: t.label, value: t.value }))} error={errors.topic} />
              <Input label="Reference" name="ref" defaultValue={kept?.ref ?? ''} placeholder="REQ-2261" helperText="If your message is about an existing request." error={errors.ref} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label htmlFor="support-message" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--gray-700)' }}>
                Your message <span style={{ color: 'var(--color-danger)' }}>*</span>
              </label>
              <textarea
                id="support-message"
                name="message"
                defaultValue={kept?.message ?? ''}
                rows={5}
                placeholder="We booked the Saint Martin ship for 12 March and need to move it a week later — is that possible?"
                style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', color: 'var(--color-text-primary)', padding: '10px 12px', border: `1px solid ${errors.message ? 'var(--color-danger)' : 'var(--color-border)'}`, borderRadius: 'var(--radius-md)', resize: 'vertical', background: 'var(--color-bg-surface)' }}
              />
              {errors.message ? <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-danger)' }}>{errors.message}</span> : null}
            </div>

            {state.status === 'error' ? (
              <div role="alert" style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', background: 'rgba(220,38,38,.06)', color: 'var(--color-danger)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
                <Icon name="alert-circle" size={16} /><span>{state.message}</span>
              </div>
            ) : null}

            <div className={c.actionRow}>
              <Button size="lg" type="submit" disabled={pending}>{pending ? 'Sending…' : 'Send message'}</Button>
              <Button size="lg" variant="outline" iconLeft={<Icon name="message-circle" size={17} />}>Ask on WhatsApp instead</Button>
            </div>
          </div>
        </form>

        <aside className={c.requestAside}>
          <div style={{ padding: 'var(--space-5)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <strong style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', color: 'var(--navy-900)' }}>Reach us directly</strong>
            <Method icon="phone-call" label="Phone" value="+880 1XXX-XXXXXX" href="tel:+8801000000000" note="9 AM – 10 PM, seven days" />
            <Method icon="message-circle" label="WhatsApp" value="+880 1XXX-XXXXXX" href="#" note="Usually the fastest" />
            <Method icon="headset" label="Corporate desk" value="corporate@yestourbd.com" href="mailto:corporate@yestourbd.com" note="Groups, events and invoicing" />
          </div>

          <div style={{ padding: 'var(--space-5)', background: 'var(--navy-900)', borderRadius: 'var(--radius-lg)', color: '#fff', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ color: 'var(--teal-300)' }}><Icon name="clock" size={20} /></span>
            <strong style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)' }}>Already asked for a quote?</strong>
            <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--navy-200)', lineHeight: 'var(--leading-relaxed)' }}>
              Follow it with your reference and the mobile you used — no account needed.
            </p>
            <Link href="/track" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)', fontWeight: 'var(--weight-semibold)', color: '#fff', textDecoration: 'none' }}>Track a request →</Link>
          </div>
        </aside>
      </div>

      {state.status === 'sent' ? (
        <div style={{ position: 'fixed', right: 20, bottom: 92, zIndex: 60 }}>
          <Toast
            tone="success"
            icon={<Icon name="check-circle" size={18} />}
            title={`Message sent — ${state.ref}`}
            message="A coordinator replies within two working hours. Keep the reference if you call before then."
          />
        </div>
      ) : null}
    </div>
  );
}
