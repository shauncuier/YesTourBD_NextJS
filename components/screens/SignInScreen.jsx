'use client';

import React from 'react';
import { Badge, Button, Icon, Input } from '../index.js';
import layout from '../../styles/layout.module.css';

const PHONE_STEP = { status: 'phone' };

/**
 * Two steps, one screen: the number, then the code. The phone step's state is what decides
 * which is shown, so a failed code does not throw the customer back to the beginning and
 * make them wait out the resend cooldown.
 */
export function SignInScreen({ requestAction = async () => PHONE_STEP, verifyAction = async () => PHONE_STEP, next = '/account' }) {
  const [requestState, request, requesting] = React.useActionState(requestAction, PHONE_STEP);
  const [verifyState, verify, verifying] = React.useActionState(verifyAction, PHONE_STEP);

  // Either action can put us on the code step; an error from verifying keeps us there.
  const phone = verifyState.phone ?? requestState.phone ?? '';
  const onCodeStep = Boolean(phone) && requestState.status !== 'error';
  const error = verifyState.status === 'error' ? verifyState.message : requestState.status === 'error' ? requestState.message : null;

  return (
    <div style={{ background: 'var(--color-bg-page)', minHeight: '70vh', paddingBottom: 'var(--space-16)' }}>
      <div style={{ background: 'var(--gradient-dusk, var(--navy-900))', padding: 'var(--space-10) 0' }}>
        <div className={layout.containerNarrow} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <Badge tone="teal" variant="solid" size="md" style={{ alignSelf: 'flex-start' }}>No password</Badge>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 'var(--weight-semibold)', color: '#fff', letterSpacing: 'var(--tracking-tight)' }}>
            Sign in with your mobile
          </h1>
          <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', color: 'var(--navy-200)', lineHeight: 'var(--leading-relaxed)', maxWidth: 520 }}>
            We send a six-digit code. Same number you book with, so your requests and bookings are already there.
          </p>
        </div>
      </div>

      <div className={layout.containerNarrow} style={{ marginTop: 'var(--space-8)' }}>
        <div style={{ maxWidth: 400, padding: 'var(--space-6)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {onCodeStep ? (
            <>
              <form action={verify} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <input type="hidden" name="phone" value={phone} />
                <input type="hidden" name="next" value={next} />
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                  Code sent to <strong style={{ color: 'var(--navy-900)' }}>{phone}</strong>.
                </div>
                <Input
                  label="Six-digit code"
                  name="code"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  required
                  placeholder="000000"
                />
                {error ? (
                  <div role="alert" style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', background: 'rgba(220,38,38,.06)', color: 'var(--color-danger)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
                    <Icon name="alert-circle" size={16} /><span>{error}</span>
                  </div>
                ) : null}
                <Button type="submit" size="lg" fullWidth disabled={verifying}>{verifying ? 'Checking…' : 'Sign in'}</Button>
              </form>

              <form action={request}>
                <input type="hidden" name="phone" value={phone} />
                <Button type="submit" variant="ghost" size="sm" disabled={requesting}>
                  {requesting ? 'Sending…' : 'Send another code'}
                </Button>
              </form>
            </>
          ) : (
            <form action={request} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <Input
                label="Mobile number"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                placeholder="+880 1XXX-XXXXXX"
                defaultValue={requestState.phone ?? ''}
              />
              {error ? (
                <div role="alert" style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', background: 'rgba(220,38,38,.06)', color: 'var(--color-danger)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
                  <Icon name="alert-circle" size={16} /><span>{error}</span>
                </div>
              ) : null}
              <Button type="submit" size="lg" fullWidth disabled={requesting}>{requesting ? 'Sending…' : 'Send me a code'}</Button>
              <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 'var(--leading-relaxed)' }}>
                We will never ask you for the code. Anyone who does is not us.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
