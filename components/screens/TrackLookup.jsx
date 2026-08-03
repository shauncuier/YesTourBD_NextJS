'use client';

import React from 'react';
import { Badge, Button, Icon, Input } from '../index.js';
import layout from '../../styles/layout.module.css';

const IDLE = { status: 'idle' };

// Request-based, so navy rather than teal — the brand contract's rule, and the customer is
// looking up something a human is handling, not something they bought.
export function TrackLookup({ action = async () => IDLE }) {
  const [state, submit, pending] = React.useActionState(action, IDLE);

  return (
    <div style={{ background: 'var(--color-bg-page)', paddingBottom: 'var(--space-16)' }}>
      <div style={{ background: 'var(--gradient-dusk, var(--navy-900))', padding: 'var(--space-12) 0' }}>
        <div className={layout.containerNarrow} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <Badge tone="brand" variant="outline" size="md" style={{ alignSelf: 'flex-start' }}>Request based</Badge>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 'var(--weight-semibold)', color: '#fff', letterSpacing: 'var(--tracking-tight)' }}>
            Follow your request
          </h1>
          <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', color: 'var(--navy-200)', lineHeight: 'var(--leading-relaxed)', maxWidth: 520 }}>
            Your reference is in the message we sent when the request came in. No account needed.
          </p>
        </div>
      </div>

      <div className={layout.containerNarrow} style={{ marginTop: 'var(--space-8)' }}>
        <form action={submit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: 420, padding: 'var(--space-6)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
          <Input label="Reference" name="ref" required placeholder="REQ-2261" />
          <Input label="Mobile you used" name="phone" type="tel" inputMode="tel" required placeholder="+880 1XXX-XXXXXX" helperText="The same number you gave on the form." />

          {state.status === 'error' ? (
            <div role="alert" style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', background: 'rgba(220,38,38,.06)', color: 'var(--color-danger)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
              <Icon name="alert-circle" size={16} />
              <span>{state.message}</span>
            </div>
          ) : null}

          <Button type="submit" size="lg" disabled={pending}>{pending ? 'Looking…' : 'Find my request'}</Button>
        </form>
      </div>
    </div>
  );
}
