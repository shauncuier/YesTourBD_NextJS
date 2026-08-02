'use client';

import React from 'react';

const TONES = {
  neutral: { solid: ['var(--gray-700)', '#fff'], soft: ['var(--gray-100)', 'var(--gray-700)'], border: 'var(--gray-300)' },
  brand: { solid: ['var(--color-brand-primary)', '#fff'], soft: ['var(--navy-50)', 'var(--navy-700)'], border: 'var(--navy-200)' },
  teal: { solid: ['var(--color-brand-secondary)', '#fff'], soft: ['var(--teal-50)', 'var(--teal-700)'], border: 'var(--teal-200)' },
  success: { solid: ['var(--color-success)', '#fff'], soft: ['var(--color-success-bg)', 'var(--teal-800)'], border: 'var(--teal-200)' },
  warning: { solid: ['var(--color-warning)', '#fff'], soft: ['var(--color-warning-bg)', 'var(--gold-700)'], border: 'var(--gold-300)' },
  danger: { solid: ['var(--color-danger)', '#fff'], soft: ['var(--color-danger-bg)', 'var(--red-700)'], border: 'var(--red-100)' },
  gold: { solid: ['var(--color-accent-gold)', '#fff'], soft: ['var(--gold-100)', 'var(--gold-700)'], border: 'var(--gold-300)' },
};

const SIZES = { sm: { fontSize: 'var(--text-xs)', padding: '2px 8px', gap: 4 }, md: { fontSize: 'var(--text-sm)', padding: '4px 10px', gap: 5 } };

/** Small status / metadata label — booking state, promo flags, availability. */
export function Badge({ tone = 'neutral', variant = 'soft', size = 'sm', icon, dot = false, children, style }) {
  const t = TONES[tone] || TONES.neutral;
  const s = SIZES[size] || SIZES.sm;
  const look = variant === 'solid'
    ? { background: t.solid[0], color: t.solid[1], border: '1px solid transparent' }
    : variant === 'outline'
      ? { background: 'transparent', color: t.soft[1], border: `1px solid ${t.border}` }
      : { background: t.soft[0], color: t.soft[1], border: '1px solid transparent' };

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: s.gap, padding: s.padding,
      fontFamily: 'var(--font-body)', fontSize: s.fontSize, fontWeight: 'var(--weight-semibold)',
      lineHeight: 1.4, borderRadius: 'var(--radius-full)', whiteSpace: 'nowrap',
      letterSpacing: 'var(--tracking-wide)', ...look, ...style,
    }}>
      {dot ? <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', flex: '0 0 auto' }} /> : null}
      {icon}
      {children}
    </span>
  );
}
