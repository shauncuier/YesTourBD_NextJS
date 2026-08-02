'use client';

import React from 'react';

const TONES = {
  info: { bar: 'var(--color-brand-secondary)', bg: 'var(--color-bg-surface)', text: 'var(--color-text-primary)' },
  success: { bar: 'var(--color-success)', bg: 'var(--color-bg-surface)', text: 'var(--color-text-primary)' },
  warning: { bar: 'var(--color-warning)', bg: 'var(--color-bg-surface)', text: 'var(--color-text-primary)' },
  danger: { bar: 'var(--color-danger)', bg: 'var(--color-bg-surface)', text: 'var(--color-text-primary)' },
};

/** Transient confirmation / error notice, anchored bottom-right by default. */
export function Toast({ tone = 'info', title, message, icon, action, onClose, style }) {
  const t = TONES[tone] || TONES.info;
  return (
    <div role="status" style={{
      display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', minWidth: 280, maxWidth: 420,
      padding: 'var(--space-4)', paddingLeft: 'var(--space-4)', boxSizing: 'border-box',
      fontFamily: 'var(--font-body)', background: t.bg, color: t.text,
      border: '1px solid var(--color-border)', borderLeft: `4px solid ${t.bar}`,
      borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)',
      ...style,
    }}>
      {icon ? <span style={{ color: t.bar, display: 'inline-flex', flex: '0 0 auto', marginTop: 1 }}>{icon}</span> : null}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
        {title ? <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)', lineHeight: 'var(--leading-snug)' }}>{title}</div> : null}
        {message ? <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-normal)' }}>{message}</div> : null}
        {action ? <div style={{ marginTop: 6 }}>{action}</div> : null}
      </div>
      {onClose ? (
        <button type="button" aria-label="Dismiss" onClick={onClose} style={{
          flex: '0 0 auto', border: 'none', background: 'transparent', color: 'var(--color-text-muted)',
          cursor: 'pointer', fontSize: 13, lineHeight: 1, padding: 2,
        }}>&#10005;</button>
      ) : null}
    </div>
  );
}
