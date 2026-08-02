'use client';

import React from 'react';

const SIZES = { sm: 32, md: 40, lg: 48 };

function variantStyle(variant, { hover, active }) {
  switch (variant) {
    case 'outline':
      return { background: active ? 'var(--navy-100)' : hover ? 'var(--navy-50)' : 'transparent', color: 'var(--color-brand-primary)', border: '1px solid var(--color-border-strong)' };
    case 'solid':
      return { background: active ? 'var(--navy-950)' : hover ? 'var(--color-brand-primary-hover)' : 'var(--color-brand-primary)', color: '#fff', border: '1px solid transparent' };
    default:
      return { background: active ? 'var(--gray-200)' : hover ? 'var(--gray-100)' : 'transparent', color: 'var(--color-text-secondary)', border: '1px solid transparent' };
  }
}

/** Icon-only button — pair with an accessible `aria-label`. */
export function IconButton({ icon, variant = 'ghost', size = 'md', disabled = false, onClick, 'aria-label': ariaLabel, style }) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const dim = SIZES[size] || SIZES.md;
  const vs = variantStyle(variant, { hover, active });
  return (
    <button
      aria-label={ariaLabel}
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
        width: dim, height: dim, borderRadius: 'var(--radius-md)', cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1, transition: `all var(--duration-fast) var(--ease-standard)`,
        boxShadow: focus ? 'var(--shadow-focus)' : 'none', boxSizing: 'border-box', padding: 0,
        ...vs, ...style,
      }}
    >
      {icon}
    </button>
  );
}
