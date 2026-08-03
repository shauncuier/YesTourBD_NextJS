'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon, IconButton, Input, Tooltip } from '../index.js';
import { NAV_GROUPS } from './nav.js';
import c from './admin.module.css';

// Ported from the design system's ui_kits/admin/admin-chrome.jsx. Deviations, all forced by
// this being a real app rather than a click-through: nav items are <Link>s to routes instead
// of go(id) calls, the staff footer shows the signed-in user rather than a fixed name, and
// the sidebar collapses below 900px — the kit was drawn at 1440 and has no small layout.

function NavItem({ item, on, onNavigate }) {
  const [hover, setHover] = React.useState(false);
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-current={on ? 'page' : undefined}
      style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '9px 10px', textDecoration: 'none', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: on ? 'var(--weight-semibold)' : 'var(--weight-regular)', color: on || hover ? '#fff' : 'var(--navy-200)', background: on ? 'rgba(40,177,161,.16)' : hover ? 'rgba(255,255,255,.06)' : 'transparent', boxShadow: on ? 'inset 2px 0 0 var(--teal-400)' : 'none', transition: 'all var(--duration-fast) var(--ease-standard)', boxSizing: 'border-box' }}
    >
      <span style={{ color: on ? 'var(--teal-300)' : 'inherit', display: 'inline-flex' }}><Icon name={item.icon} size={17} /></span>
      <span style={{ flex: 1, minWidth: 0 }}>{item.label}</span>
      {item.count ? (
        <span style={{ fontSize: 11, fontWeight: 'var(--weight-semibold)', padding: '1px 7px', borderRadius: 'var(--radius-full)', background: on ? 'var(--teal-500)' : 'rgba(255,255,255,.12)', color: '#fff' }}>{item.count}</span>
      ) : null}
    </Link>
  );
}

export function AdminSidebar({ staff, open, onClose, signOutAction }) {
  const pathname = usePathname();
  const isOn = (href) => (href === '/admin' ? pathname === '/admin' : pathname.startsWith(href));

  return (
    <aside className={c.sidebar} data-open={open ? 'true' : 'false'}>
      <div className={c.sidebarHead}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-mark.png" alt="" style={{ width: 30, height: 30, objectFit: 'contain', borderRadius: 6 }} />
        <div style={{ lineHeight: 1.15, flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-bold)', fontSize: 15, color: '#fff' }}>YesTour<span style={{ color: 'var(--teal-400)' }}>BD</span></div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 10.5, letterSpacing: 'var(--tracking-wide)', color: 'var(--navy-300)', textTransform: 'uppercase' }}>Admin panel</div>
        </div>
        <span className={c.sidebarClose}>
          <IconButton icon={<Icon name="x" size={18} />} aria-label="Close menu" variant="ghost" size="sm" onClick={onClose} style={{ color: 'var(--navy-200)' }} />
        </span>
      </div>

      <nav style={{ flex: 1, overflow: 'auto', padding: 'var(--space-4) var(--space-3)' }}>
        {NAV_GROUPS.map((group) => (
          <div key={group.title} style={{ marginBottom: 'var(--space-5)' }}>
            <div style={{ padding: '0 10px 8px', fontFamily: 'var(--font-body)', fontSize: 10.5, fontWeight: 'var(--weight-semibold)', letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', color: 'var(--navy-400)' }}>{group.title}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {group.items.map((item) => (
                <NavItem key={item.id} item={item} on={isOn(item.href)} onNavigate={onClose} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div style={{ padding: 'var(--space-4)', borderTop: '1px solid rgba(255,255,255,.09)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 32, height: 32, flex: '0 0 auto', borderRadius: '50%', background: 'var(--teal-500)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-semibold)' }}>{staff.initials}</span>
        <div style={{ flex: 1, minWidth: 0, lineHeight: 1.25 }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{staff.name}</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--navy-300)', textTransform: 'capitalize' }}>{staff.role}</div>
        </div>
        <form action={signOutAction}>
          <IconButton icon={<Icon name="log-out" size={16} />} aria-label="Sign out" variant="ghost" size="sm" type="submit" style={{ color: 'var(--navy-300)' }} />
        </form>
      </div>
    </aside>
  );
}

export function AdminTopBar({ title, subtitle, actions, onOpenMenu }) {
  return (
    <header className={c.topBar}>
      <span className={c.menuButton}>
        <IconButton icon={<Icon name="menu" size={18} />} aria-label="Open menu" variant="outline" onClick={onOpenMenu} />
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h1 className={c.topTitle}>{title}</h1>
        {subtitle ? <div style={{ marginTop: 3, fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>{subtitle}</div> : null}
      </div>
      <div className={c.topSearch}><Input placeholder="Search ref, phone, customer" iconLeft={<Icon name="search" size={16} />} /></div>
      <span className={c.topBell}>
        <Tooltip label="Notifications"><IconButton icon={<Icon name="bell" size={18} />} aria-label="Notifications" variant="outline" /></Tooltip>
      </span>
      {actions}
    </header>
  );
}

export function StatCard({ icon, label, value, delta, tone = 'teal' }) {
  const up = delta && delta.startsWith('+');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 'var(--space-5)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>{label}</span>
        <span style={{ width: 32, height: 32, borderRadius: 'var(--radius-sm)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: tone === 'teal' ? 'var(--teal-50)' : tone === 'gold' ? 'var(--gold-100)' : 'var(--navy-50)', color: tone === 'teal' ? 'var(--teal-600)' : tone === 'gold' ? 'var(--gold-700)' : 'var(--navy-700)' }}><Icon name={icon} size={17} /></span>
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 'var(--weight-bold)', color: 'var(--navy-900)', lineHeight: 1 }}>{value}</div>
      {delta ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: up ? 'var(--teal-700)' : 'var(--color-danger)' }}>
          <Icon name={up ? 'trending-up' : 'trending-down'} size={14} />{delta}<span style={{ color: 'var(--color-text-muted)' }}>vs last week</span>
        </div>
      ) : null}
    </div>
  );
}

export function Panel({ title, action, children, padding = 'var(--space-5)' }) {
  return (
    <section style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)', padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--color-border)' }}>
        <strong style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--weight-semibold)', color: 'var(--navy-900)' }}>{title}</strong>
        {action}
      </div>
      <div style={{ padding }}>{children}</div>
    </section>
  );
}

export const TH = { textAlign: 'left', padding: '10px 14px', fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-semibold)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--color-text-muted)', borderBottom: '1px solid var(--color-border)', whiteSpace: 'nowrap' };
export const TD = { padding: '13px 14px', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--gray-800)', borderBottom: '1px solid var(--color-border)', verticalAlign: 'middle' };

export const STATUS_TONE = { confirmed: 'success', completed: 'teal', pending: 'warning', cancelled: 'danger', new: 'warning', quoted: 'brand', negotiating: 'gold', won: 'success' };
