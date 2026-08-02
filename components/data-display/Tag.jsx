'use client';

import React from 'react';

/** Interactive chip — filters, selected facets, removable inputs. */
export function Tag({ label, icon, selected = false, removable = false, onClick, onRemove, disabled = false, children, style }) {
  const [hover, setHover] = React.useState(false);
  const content = children ?? label;
  const interactive = Boolean(onClick) && !disabled;

  return (
    <span
      onClick={interactive ? onClick : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px',
        fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)',
        borderRadius: 'var(--radius-full)', boxSizing: 'border-box', userSelect: 'none',
        cursor: interactive ? 'pointer' : 'default', opacity: disabled ? 0.5 : 1,
        transition: 'all var(--duration-fast) var(--ease-standard)',
        background: selected ? 'var(--navy-800)' : hover && interactive ? 'var(--gray-100)' : 'var(--color-bg-surface)',
        color: selected ? 'var(--color-text-inverse)' : 'var(--color-text-primary)',
        border: `1px solid ${selected ? 'var(--navy-800)' : 'var(--color-border-strong)'}`,
        ...style,
      }}
    >
      {icon}
      {content}
      {removable ? (
        <button
          type="button"
          aria-label="Remove"
          onClick={(e) => { e.stopPropagation(); if (onRemove) onRemove(e); }}
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 16,
            marginLeft: 2, marginRight: -4, padding: 0, border: 'none', borderRadius: '50%',
            background: selected ? 'rgba(255,255,255,.2)' : 'var(--gray-200)', color: 'inherit',
            cursor: 'pointer', fontSize: 11, lineHeight: 1, fontFamily: 'var(--font-body)',
          }}
        >&#10005;</button>
      ) : null}
    </span>
  );
}
