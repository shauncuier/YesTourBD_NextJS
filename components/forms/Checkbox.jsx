'use client';

import React from 'react';
import { Icon } from '../foundation/Icon.jsx';

/** Checkbox with label — trip add-ons, terms acceptance, filter facets. */
export function Checkbox({ label, checked, defaultChecked, onChange, disabled = false, style, id }) {
  const [focus, setFocus] = React.useState(false);
  const reactId = React.useId();
  const boxId = id || reactId;
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const isControlled = checked !== undefined;
  const isOn = isControlled ? checked : internal;
  return (
    <label htmlFor={boxId} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, fontFamily: 'var(--font-body)', ...style }}>
      <span style={{ position: 'relative', display: 'inline-flex', width: 20, height: 20, flex: '0 0 auto' }}>
        <input
          id={boxId} type="checkbox" checked={isOn} disabled={disabled}
          onChange={(e) => { if (!isControlled) setInternal(e.target.checked); if (onChange) onChange(e); }}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{ position: 'absolute', inset: 0, opacity: 0, margin: 0, cursor: 'inherit' }}
        />
        <span style={{
          width: 20, height: 20, borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: `1px solid ${isOn ? 'var(--color-brand-secondary)' : 'var(--color-border-strong)'}`,
          background: isOn ? 'var(--color-brand-secondary)' : 'var(--color-bg-surface)',
          boxShadow: focus ? 'var(--shadow-focus)' : 'none', transition: `all var(--duration-fast) var(--ease-standard)`,
        }}>
          {isOn && <Icon name="check" size={14} color="#fff" strokeWidth={3} />}
        </span>
      </span>
      {label && <span style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-primary)' }}>{label}</span>}
    </label>
  );
}
