'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, Icon } from '../index.js';
import { ROUTES } from '../../lib/routes.js';
import layout from '../../styles/layout.module.css';
import c from './chrome.module.css';

const NAV = [
  { id: 'home', label: 'Home', href: ROUTES.home },
  { id: 'search', label: 'Hotels & Tours', href: ROUTES.search },
  { id: 'tickets', label: 'Tickets', href: ROUTES.tickets },
  { id: 'request', label: 'Corporate & Visa', href: ROUTES.request },
  { id: 'blog', label: 'Travel guides', href: ROUTES.blog },
];

export function Logo({ height = 34, reverse = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-mark.png" alt="" style={{ height, width: height, objectFit: 'contain', borderRadius: 8, background: reverse ? 'rgba(255,255,255,.08)' : 'transparent' }} />
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-bold)', fontSize: 18, letterSpacing: 'var(--tracking-tight)', color: reverse ? '#fff' : 'var(--navy-800)' }}>YesTour<span style={{ color: 'var(--teal-400)' }}>BD</span></span>
        <span style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: 10.5, letterSpacing: 'var(--tracking-wide)', color: reverse ? 'var(--navy-200)' : 'var(--color-text-muted)', marginTop: 3 }}>all-in-one travel marketplace</span>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const isOn = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  // Close the disclosure panel on navigation, otherwise it stays open over the new page.
  // Adjusted during render rather than in an effect — this is the React-recommended way to
  // reset state when a value changes, and it covers back/forward as well as link clicks.
  const [lastPath, setLastPath] = React.useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <header className={c.header}>
      <div className={`${layout.container} ${c.headerInner}`}>
        <Link href={ROUTES.home} style={{ textDecoration: 'none' }}><Logo /></Link>
        <nav className={c.nav}>
          {NAV.map((n) => {
            const on = isOn(n.href);
            return (
              <Link key={n.id} href={n.href}
                style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: on ? 'var(--weight-semibold)' : 'var(--weight-medium)', color: on ? 'var(--navy-800)' : 'var(--color-text-secondary)', textDecoration: 'none', whiteSpace: 'nowrap', paddingBottom: 3, borderBottom: `2px solid ${on ? 'var(--teal-400)' : 'transparent'}` }}>{n.label}</Link>
            );
          })}
        </nav>
        <div className={c.headerActions}>
          <a href="tel:+8801000000000" className={c.phoneLink}>
            <Icon name="phone-call" size={16} />+880 1XXX-XXXXXX
          </a>
          <Link href={ROUTES.account} style={{ textDecoration: 'none' }}>
            <Button variant="outline" size="sm" style={{ whiteSpace: 'nowrap' }}>Sign in</Button>
          </Link>
          <button
            type="button"
            className={c.menuButton}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="site-mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'x' : 'menu'} size={20} />
          </button>
        </div>
      </div>
      {open ? (
        <div id="site-mobile-nav" className={layout.container}>
          <nav className={c.mobileNav}>
            {NAV.map((n) => (
              <Link key={n.id} href={n.href} className={isOn(n.href) ? c.mobileNavLinkActive : c.mobileNavLink}>
                {n.label}
              </Link>
            ))}
            <a href="tel:+8801000000000" className={c.mobileNavPhone}>
              <Icon name="phone-call" size={16} />+880 1XXX-XXXXXX
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function SocialLink({ label, slug }) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  return (
    <a href="#" onClick={(e) => e.preventDefault()} title={label} aria-label={label}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        width: 34, height: 34, borderRadius: 'var(--radius-sm)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: active ? 'var(--teal-600)' : hover ? 'var(--teal-500)' : 'transparent',
        border: `1px solid ${hover || active ? 'transparent' : 'rgba(255,255,255,.18)'}`,
        transition: 'background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)',
      }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`https://cdn.simpleicons.org/${slug}/ffffff`} alt="" style={{ width: 16, height: 16, display: 'block' }} />
    </a>
  );
}

export function SiteFooter() {
  const col = (title, items) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)', color: '#fff', letterSpacing: 'var(--tracking-wide)' }}>{title}</div>
      {items.map((i) => <a key={i} href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 'var(--text-sm)', color: 'var(--navy-200)', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>{i}</a>)}
    </div>
  );
  return (
    <footer className={c.footer}>
      <div className={`${layout.container} ${c.footerGrid}`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <Logo reverse />
          <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)', color: 'var(--navy-200)', maxWidth: 300 }}>Every major travel service in Bangladesh, booked or quoted in one place. Talk to a human any time on WhatsApp.</p>
          <div style={{ display: 'flex', gap: 8 }}>
            {[['Facebook', 'facebook'], ['Instagram', 'instagram'], ['YouTube', 'youtube']].map(([label, slug]) => (
              <SocialLink key={slug} label={label} slug={slug} />
            ))}
          </div>
        </div>
        {col('Instant booking', ['Hotels & resorts', 'Houseboat tours', 'Saint Martin ship', 'Air tickets', 'Bus tickets', 'Fish World tickets'])}
        {col('On request', ['Corporate tours', 'Group tours', 'Event management', 'Visa assistance', 'Custom packages', 'Rent a car'])}
        {col('Company', ['About YesTourBD', 'Travel guides', 'Offers', 'Contact & support', 'Refund policy', 'Terms'])}
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,.12)' }}>
        <div className={`${layout.container} ${c.footerBar}`}>
          <span>© 2026 YesTourBD. All rights reserved.</span>
          <span className={c.footerPayments}><span>bKash</span><span>Nagad</span><span>Visa</span><span>Mastercard</span><span>SSLCommerz</span></span>
        </div>
      </div>
    </footer>
  );
}

export function ContactDock() {
  return (
    <div style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 50, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <a href="#" onClick={(e) => e.preventDefault()} title="WhatsApp" style={{ width: 52, height: 52, borderRadius: 'var(--radius-full)', background: 'var(--teal-500)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-lg)' }}><Icon name="message-circle" size={24} /></a>
      <a href="#" onClick={(e) => e.preventDefault()} title="Call" style={{ width: 52, height: 52, borderRadius: 'var(--radius-full)', background: 'var(--navy-800)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-lg)' }}><Icon name="phone" size={22} /></a>
    </div>
  );
}

export function SectionHead({ eyebrow, title, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {eyebrow ? <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-semibold)', letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', color: 'var(--teal-600)' }}>{eyebrow}</span> : null}
        <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 'var(--weight-semibold)', letterSpacing: 'var(--tracking-tight)', color: 'var(--navy-900)' }}>{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function Stars({ value = 5, size = 14 }) {
  return (
    <span style={{ display: 'inline-flex', gap: 1, color: 'var(--gold-500)' }}>
      {[1, 2, 3, 4, 5].map((i) => {
        const on = i <= Math.round(value);
        return <Icon key={i} name="star" size={size} color={on ? 'var(--gold-500)' : 'var(--gray-300)'} filled={on} />;
      })}
    </span>
  );
}

export function Price({ amount, was, suffix = 'per person' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, flexWrap: 'wrap' }}>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--weight-bold)', color: 'var(--navy-800)' }}>৳{amount.toLocaleString('en-US')}</span>
      {was ? <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>৳{was.toLocaleString('en-US')}</span> : null}
      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{suffix}</span>
    </div>
  );
}
