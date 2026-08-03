'use client';

import React from 'react';

const SIZES = {
  sm: { padding: '6px 14px', fontSize: 'var(--text-sm)', gap: 6, height: 34 },
  md: { padding: '10px 18px', fontSize: 'var(--text-base)', gap: 8, height: 44 },
  lg: { padding: '13px 24px', fontSize: 'var(--text-md)', gap: 8, height: 52 },
};

function variantStyle(variant, { hover, active }) {
  switch (variant) {
    case 'secondary':
      return {
        background: active ? 'var(--teal-700)' : hover ? 'var(--color-brand-secondary-hover)' : 'var(--color-brand-secondary)',
        color: 'var(--color-text-inverse)',
        border: '1px solid transparent',
      };
    case 'outline':
      return {
        background: active ? 'var(--navy-100)' : hover ? 'var(--navy-50)' : 'transparent',
        color: 'var(--color-brand-primary)',
        border: '1px solid var(--color-border-strong)',
      };
    case 'ghost':
      return {
        background: active ? 'var(--gray-200)' : hover ? 'var(--gray-100)' : 'transparent',
        color: 'var(--color-brand-primary)',
        border: '1px solid transparent',
      };
    case 'danger':
      return {
        background: active ? 'var(--red-700)' : hover ? 'var(--red-600)' : 'var(--color-danger)',
        color: '#fff',
        border: '1px solid transparent',
      };
    default:
      return {
        background: active ? 'var(--navy-950)' : hover ? 'var(--color-brand-primary-hover)' : 'var(--color-brand-primary)',
        color: 'var(--color-text-inverse)',
        border: '1px solid transparent',
      };
  }
}

/** Primary interactive control — CTAs, form submits, toolbar actions. */
export function Button({
  variant = 'primary', size = 'md', disabled = false, fullWidth = false,
  iconLeft, iconRight, type = 'button', onClick, children, style, name, value,
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const vs = variantStyle(variant, { hover, active });

  return (
    <button
      type={type}
      name={name}
      value={value}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: fullWidth ? '100%' : 'auto',
        gap: s.gap, padding: s.padding, fontSize: s.fontSize, height: s.height,
        fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-semibold)',
        borderRadius: 'var(--radius-md)', cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1, transition: `all var(--duration-fast) var(--ease-standard)`,
        boxShadow: focus ? 'var(--shadow-focus)' : 'none', boxSizing: 'border-box',
        ...vs, ...style,
      }}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
