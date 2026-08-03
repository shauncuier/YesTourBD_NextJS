'use client';

import React from 'react';
import Image from 'next/image';

const PADS = { none: 0, sm: 'var(--space-4)', md: 'var(--space-5)', lg: 'var(--space-6)' };

/** Surface container for listings, service tiles, dashboard panels. */
export function Card({
  variant = 'elevated', padding = 'md', image, imageAlt = '', imageHeight = 180,
  title, subtitle, badge, footer, onClick, href, children, style,
}) {
  const [hover, setHover] = React.useState(false);
  const interactive = Boolean(onClick || href);

  const base = {
    elevated: { background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', boxShadow: hover && interactive ? 'var(--shadow-lg)' : 'var(--shadow-sm)' },
    outline: { background: 'var(--color-bg-surface)', border: '1px solid var(--color-border-strong)', boxShadow: 'none' },
    flat: { background: 'var(--color-bg-sunken)', border: '1px solid transparent', boxShadow: 'none' },
  }[variant] || {};

  const Element = href ? 'a' : 'div';
  const pad = PADS[padding] ?? PADS.md;

  return (
    <Element
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden',
        borderRadius: 'var(--radius-lg)', textDecoration: 'none', color: 'inherit',
        fontFamily: 'var(--font-body)', boxSizing: 'border-box',
        cursor: interactive ? 'pointer' : 'default',
        transform: hover && interactive ? 'translateY(-2px)' : 'none',
        transition: 'transform var(--duration-normal) var(--ease-standard), box-shadow var(--duration-normal) var(--ease-standard)',
        ...base, ...style,
      }}
    >
      {image ? (
        <div style={{ position: 'relative', height: imageHeight, flex: '0 0 auto', overflow: 'hidden', background: 'var(--gray-200)' }}>
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1100px) 33vw, (min-width: 640px) 50vw, 100vw"
            style={{ objectFit: 'cover', transform: hover && interactive ? 'scale(1.04)' : 'none', transition: 'transform var(--duration-slow) var(--ease-out)' }}
          />
          {badge ? <div style={{ position: 'absolute', top: 'var(--space-3)', left: 'var(--space-3)' }}>{badge}</div> : null}
        </div>
      ) : null}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', padding: pad, flex: 1 }}>
        {!image && badge ? <div>{badge}</div> : null}
        {title ? <div style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-semibold)', fontSize: 'var(--text-md)', color: 'var(--color-text-primary)', lineHeight: 'var(--leading-snug)' }}>{title}</div> : null}
        {subtitle ? <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-normal)' }}>{subtitle}</div> : null}
        {children}
      </div>
      {footer ? <div style={{ padding: pad, paddingTop: 'var(--space-3)', borderTop: '1px solid var(--color-border)', marginTop: 'auto' }}>{footer}</div> : null}
    </Element>
  );
}
