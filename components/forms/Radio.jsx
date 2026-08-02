'use client';

import React from 'react';

/** Radio button with label — single choice within a group (seat class, payment method). */
export function Radio({ label, checked, onChange, name, value, disabled = false, style, id }) {
  const [focus, setFocus] = React.useState(false);
  const radioId = id || `${name}-${value}`;
  return (
    <label htmlFor={radioId} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, fontFamily: 'var(--font-body)', ...style }}>
      <span style={{ position: 'relative', display: 'inline-flex', width: 20, height: 20, flex: '0 0 auto' }}>
        <input
          id={radioId} type="radio" name={name} value={value} checked={checked} onChange={onChange} disabled={disabled}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{ position: 'absolute', inset: 0, opacity: 0, margin: 0, cursor: 'inherit' }}
        />
        <span style={{
          width: 20, height: 20, borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: `1px solid ${checked ? 'var(--color-brand-secondary)' : 'var(--color-border-strong)'}`,
          background: 'var(--color-bg-surface)', boxShadow: focus ? 'var(--shadow-focus)' : 'none',
          transition: `all var(--duration-fast) var(--ease-standard)`,
        }}>
          {checked && <span style={{ width: 10, height: 10, borderRadius: 'var(--radius-full)', background: 'var(--color-brand-secondary)' }} />}
        </span>
      </span>
      {label && <span style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-primary)' }}>{label}</span>}
    </label>
  );
}
