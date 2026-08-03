'use client';

import React from 'react';
import { Icon } from '../foundation/Icon.jsx';

/** Native styled select — dropdowns for city, service type, sort order, passenger count. */
export function Select({ label, helperText, error, disabled = false, value, defaultValue, onChange, options = [], placeholder, required = false, labelColor = 'default', style, id, name }) {
  const [focus, setFocus] = React.useState(false);
  const reactId = React.useId();
  const selectId = id || reactId;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-body)', width: '100%', boxSizing: 'border-box', ...style }}>
      {label && (
        <label htmlFor={selectId} style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: labelColor === 'light' ? 'var(--color-text-inverse)' : 'var(--color-text-primary)' }}>
          {label}{required && <span style={{ color: 'var(--color-danger)' }}> *</span>}
        </label>
      )}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <select
          id={selectId}
          name={name}
          required={required}
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            width: '100%', boxSizing: 'border-box', appearance: 'none', fontFamily: 'var(--font-body)',
            padding: '10px 38px 10px 12px', fontSize: 'var(--text-base)', color: 'var(--color-text-primary)',
            background: disabled ? 'var(--color-bg-sunken)' : 'var(--color-bg-surface)',
            border: `1px solid ${error ? 'var(--color-danger)' : focus ? 'var(--teal-500)' : 'var(--color-border)'}`,
            borderRadius: 'var(--radius-md)', outline: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
            boxShadow: focus ? 'var(--shadow-focus)' : 'none', transition: `all var(--duration-fast) var(--ease-standard)`,
          }}
        >
          {placeholder && <option value="" disabled={required}>{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <span style={{ position: 'absolute', right: 12, display: 'flex', pointerEvents: 'none', color: 'var(--color-text-muted)' }}>
          <Icon name="chevron-down" size={16} />
        </span>
      </div>
      {(helperText || error) && (
        <span style={{ fontSize: 'var(--text-xs)', color: error ? 'var(--color-danger)' : 'var(--color-text-muted)' }}>{error || helperText}</span>
      )}
    </div>
  );
}
