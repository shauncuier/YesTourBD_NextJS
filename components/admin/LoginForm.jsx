'use client';

import React from 'react';
import { Button, Icon, Input } from '../index.js';

const IDLE = { status: 'idle' };

// `action` is the server action; a prop rather than an import so this renders in a test.
export function LoginForm({ action = async () => IDLE, next = '/admin' }) {
  const [state, submit, pending] = React.useActionState(action, IDLE);

  return (
    <form
      action={submit}
      style={{ width: '100%', maxWidth: 380, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', padding: 'var(--space-6)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', boxSizing: 'border-box' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--weight-semibold)', color: 'var(--navy-900)' }}>Staff sign in</span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>The admin panel is for YesTourBD staff.</span>
      </div>

      <input type="hidden" name="next" value={next} />
      <Input label="Work email" name="email" type="email" required autoComplete="username" placeholder="you@yestourbd.com" />
      <Input label="Password" name="password" type="password" required autoComplete="current-password" placeholder="••••••••" />

      {state.status === 'invalid' ? (
        <div role="alert" style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', background: 'var(--red-50, rgba(220,38,38,.06))', color: 'var(--color-danger)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
          <Icon name="alert-circle" size={17} />
          <span>{state.message}</span>
        </div>
      ) : null}

      <Button type="submit" size="lg" fullWidth disabled={pending}>{pending ? 'Signing in…' : 'Sign in'}</Button>
    </form>
  );
}
