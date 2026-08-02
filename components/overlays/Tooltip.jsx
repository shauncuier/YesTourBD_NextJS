'use client';

import React from 'react';

const OFFSET = 8;

/** Small hover/focus hint for icon-only controls and truncated values. */
export function Tooltip({ label, placement = 'top', children, style }) {
  const [open, setOpen] = React.useState(false);

  const pos = {
    top: { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: OFFSET },
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: OFFSET },
    left: { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: OFFSET },
    right: { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: OFFSET },
  }[placement] || {};

  return (
    <span
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      {open && label ? (
        <span role="tooltip" style={{
          position: 'absolute', zIndex: 60, pointerEvents: 'none', whiteSpace: 'nowrap',
          padding: '6px 10px', fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)',
          fontWeight: 'var(--weight-medium)', lineHeight: 1.4,
          background: 'var(--navy-900)', color: 'var(--color-text-inverse)',
          borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-md)',
          ...pos, ...style,
        }}>{label}</span>
      ) : null}
    </span>
  );
}
