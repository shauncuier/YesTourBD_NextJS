'use client';

import React from 'react';

const WIDTHS = { sm: 400, md: 520, lg: 720 };

/** Modal surface — booking confirmation, quotation forms, destructive confirms. */
const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function Dialog({ open = false, title, description, size = 'md', showClose = true, onClose, footer, children, style }) {
  const surfaceRef = React.useRef(null);

  // Escape closes, Tab is trapped inside the surface, focus enters on open and returns to
  // whatever opened it on close, and the page behind stops scrolling. `aria-modal` alone
  // promises all of this to a screen reader; the browser does not implement any of it.
  React.useEffect(() => {
    if (!open) return undefined;
    const opener = document.activeElement;

    const onKey = (e) => {
      if (e.key === 'Escape') { if (onClose) onClose(); return; }
      if (e.key !== 'Tab' || !surfaceRef.current) return;
      const items = Array.from(surfaceRef.current.querySelectorAll(FOCUSABLE)).filter((el) => !el.disabled);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const inside = surfaceRef.current.contains(document.activeElement);
      if (e.shiftKey && (document.activeElement === first || !inside)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && (document.activeElement === last || !inside)) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const target = surfaceRef.current && (surfaceRef.current.querySelector(FOCUSABLE) || surfaceRef.current);
    if (target) target.focus();

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      if (opener && typeof opener.focus === 'function') opener.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'var(--space-6)', background: 'rgba(5,30,61,.55)', backdropFilter: 'blur(3px)',
        fontFamily: 'var(--font-body)',
      }}
    >
      <div
        ref={surfaceRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: WIDTHS[size] || WIDTHS.md, maxHeight: '86vh', overflow: 'auto',
          background: 'var(--color-bg-surface)', borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)', boxSizing: 'border-box',
          animation: 'ytb-dialog-in var(--duration-normal) var(--ease-out)',
          ...style,
        }}
      >
        <style>{'@keyframes ytb-dialog-in{from{opacity:0;transform:translateY(8px) scale(.985)}to{opacity:1;transform:none}}'}</style>
        {(title || showClose) ? (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)', padding: 'var(--space-6)', paddingBottom: description ? 'var(--space-3)' : 'var(--space-4)' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {title ? <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--weight-semibold)', color: 'var(--color-text-primary)', lineHeight: 'var(--leading-snug)' }}>{title}</h2> : null}
              {description ? <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-normal)' }}>{description}</p> : null}
            </div>
            {showClose ? (
              <button type="button" aria-label="Close" onClick={onClose} style={{
                flex: '0 0 auto', width: 32, height: 32, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', background: 'transparent',
                color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: 14, lineHeight: 1,
              }}>&#10005;</button>
            ) : null}
          </div>
        ) : null}
        {children ? <div style={{ padding: '0 var(--space-6) var(--space-6)' }}>{children}</div> : null}
        {footer ? (
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', padding: 'var(--space-4) var(--space-6)', borderTop: '1px solid var(--color-border)', background: 'var(--gray-50)', borderRadius: '0 0 var(--radius-lg) var(--radius-lg)' }}>
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
