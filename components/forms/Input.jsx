'use client';

import React from 'react';

/** Single-line text input with label, helper text, error state, and optional icon. */
export function Input({
  label, placeholder, helperText, error, disabled = false, type = 'text',
  value, defaultValue, onChange, iconLeft, required = false, labelColor = 'default', style, id,
}) {
  const [focus, setFocus] = React.useState(false);
  const reactId = React.useId();
  const inputId = id || reactId;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-body)', width: '100%', boxSizing: 'border-box', ...style }}>
      {label && (
        <label htmlFor={inputId} style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: labelColor === 'light' ? 'var(--color-text-inverse)' : 'var(--color-text-primary)' }}>
          {label}{required && <span style={{ color: 'var(--color-danger)' }}> *</span>}
        </label>
      )}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {iconLeft && <span style={{ position: 'absolute', left: 12, display: 'flex', color: 'var(--color-text-muted)' }}>{iconLeft}</span>}
        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            width: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-body)',
            padding: iconLeft ? '10px 12px 10px 38px' : '10px 12px',
            fontSize: 'var(--text-base)', color: 'var(--color-text-primary)',
            background: disabled ? 'var(--color-bg-sunken)' : 'var(--color-bg-surface)',
            border: `1px solid ${error ? 'var(--color-danger)' : focus ? 'var(--teal-500)' : 'var(--color-border)'}`,
            borderRadius: 'var(--radius-md)', outline: 'none',
            boxShadow: focus ? 'var(--shadow-focus)' : 'none',
            transition: `all var(--duration-fast) var(--ease-standard)`,
          }}
        />
      </div>
      {(helperText || error) && (
        <span style={{ fontSize: 'var(--text-xs)', color: error ? 'var(--color-danger)' : 'var(--color-text-muted)' }}>
          {error || helperText}
        </span>
      )}
    </div>
  );
}
