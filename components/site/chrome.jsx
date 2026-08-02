'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, Icon } from '../index.js';
import { ROUTES } from '../../lib/routes.js';

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
  const isOn = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(255,255,255,.92)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--color-border)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--space-6)', height: 72, display: 'flex', alignItems: 'center', gap: 'var(--space-8)' }}>
        <Link href={ROUTES.home} style={{ textDecoration: 'none' }}><Logo /></Link>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', marginRight: 'auto' }}>
          {NAV.map((n) => {
            const on = isOn(n.href);
            return (
              <Link key={n.id} href={n.href}
                style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: on ? 'var(--weight-semibold)' : 'var(--weight-medium)', color: on ? 'var(--navy-800)' : 'var(--color-text-secondary)', textDecoration: 'none', whiteSpace: 'nowrap', paddingBottom: 3, borderBottom: `2px solid ${on ? 'var(--teal-400)' : 'transparent'}` }}>{n.label}</Link>
            );
          })}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <a href="tel:+8801000000000" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)', color: 'var(--teal-700)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            <Icon name="phone-call" size={16} />+880 1XXX-XXXXXX
          </a>
          <Link href={ROUTES.account} style={{ textDecoration: 'none' }}>
            <Button variant="outline" size="sm" style={{ whiteSpace: 'nowrap' }}>Sign in</Button>
          </Link>
        </div>
      </div>
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
    <footer style={{ background: 'var(--gradient-dusk)', color: '#fff', marginTop: 'var(--space-20)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--space-16) var(--space-6) var(--space-8)', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 'var(--space-10)' }}>
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
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--space-5) var(--space-6)', display: 'flex', justifyContent: 'space-between', gap: 'var(--space-4)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--navy-200)' }}>
          <span>© 2026 YesTourBD. All rights reserved.</span>
          <span style={{ display: 'flex', gap: 'var(--space-4)' }}><span>bKash</span><span>Nagad</span><span>Visa</span><span>Mastercard</span><span>SSLCommerz</span></span>
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
