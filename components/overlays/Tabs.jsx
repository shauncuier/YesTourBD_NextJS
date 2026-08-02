'use client';

import React from 'react';

/** Horizontal section switcher — service categories, admin detail panes. */
export function Tabs({ items = [], value, onChange, variant = 'underline', fullWidth = false, style }) {
  const [hoverId, setHoverId] = React.useState(null);
  const active = value ?? (items[0] && items[0].id);

  return (
    <div
      role="tablist"
      style={{
        display: 'flex', alignItems: 'stretch', gap: variant === 'pill' ? 6 : 'var(--space-6)',
        fontFamily: 'var(--font-body)', boxSizing: 'border-box',
        borderBottom: variant === 'underline' ? '1px solid var(--color-border)' : 'none',
        background: variant === 'pill' ? 'var(--color-bg-sunken)' : 'transparent',
        padding: variant === 'pill' ? 4 : 0,
        borderRadius: variant === 'pill' ? 'var(--radius-full)' : 0,
        ...style,
      }}
    >
      {items.map((it) => {
        const on = it.id === active;
        const hovered = hoverId === it.id;
        const pill = variant === 'pill';
        return (
          <button
            key={it.id}
            role="tab"
            aria-selected={on}
            onClick={() => onChange && onChange(it.id)}
            onMouseEnter={() => setHoverId(it.id)}
            onMouseLeave={() => setHoverId(null)}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7,
              flex: fullWidth ? 1 : '0 0 auto', border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 'var(--text-sm)',
              fontWeight: on ? 'var(--weight-semibold)' : 'var(--weight-medium)',
              padding: pill ? '8px 16px' : '12px 2px',
              borderRadius: pill ? 'var(--radius-full)' : 0,
              background: pill ? (on ? 'var(--color-bg-surface)' : hovered ? 'rgba(255,255,255,.55)' : 'transparent') : 'transparent',
              boxShadow: pill && on ? 'var(--shadow-sm)' : 'none',
              color: on ? 'var(--color-brand-primary)' : hovered ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
              borderBottom: pill ? 'none' : `2px solid ${on ? 'var(--color-brand-secondary)' : 'transparent'}`,
              marginBottom: pill ? 0 : -1,
              transition: 'all var(--duration-fast) var(--ease-standard)',
              whiteSpace: 'nowrap',
            }}
          >
            {it.icon}
            {it.label}
            {it.count != null ? (
              <span style={{
                fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-semibold)', padding: '1px 7px',
                borderRadius: 'var(--radius-full)', background: on ? 'var(--navy-50)' : 'var(--gray-100)',
                color: on ? 'var(--navy-700)' : 'var(--color-text-secondary)',
              }}>{it.count}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
