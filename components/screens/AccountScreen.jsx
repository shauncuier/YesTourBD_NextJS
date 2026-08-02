'use client';

import React from 'react';
import { Badge, Button, Icon, IconButton, Input, Switch, Tabs, Tooltip } from '../index.js';
import { useGo } from '../../lib/routes.js';
import { BOOKINGS } from '../../lib/site-data.js';

const STATUS = {
  confirmed: { tone: 'success', label: 'Confirmed' },
  paid: { tone: 'success', label: 'Paid' },
  request: { tone: 'warning', label: 'Awaiting quotation' },
  cancelled: { tone: 'danger', label: 'Cancelled' },
};

function BookingRow({ b }) {
  const s = STATUS[b.status] || STATUS.confirmed;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto', gap: 'var(--space-5)', padding: 'var(--space-4)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', alignItems: 'center' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={b.img} alt="" style={{ width: '100%', height: 84, objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Badge tone={s.tone} dot>{s.label}</Badge>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{b.ref}</span>
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--weight-semibold)', color: 'var(--navy-900)' }}>{b.title}</div>
        <div style={{ display: 'flex', gap: 'var(--space-4)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Icon name="calendar" size={14} />{b.date}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Icon name="users" size={14} />{b.pax}</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
        {b.total != null ? <strong style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)', color: 'var(--navy-900)' }}>৳{b.total.toLocaleString('en-US')}</strong> : <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>Quote pending</span>}
        <div style={{ display: 'flex', gap: 8 }}>
          {b.total != null ? <Button size="sm" variant="outline" iconLeft={<Icon name="download" size={15} />}>Voucher</Button> : <Button size="sm" variant="outline">View request</Button>}
          <Tooltip label="Chat about this booking"><IconButton icon={<Icon name="message-circle" size={17} />} aria-label="Chat" variant="ghost" size="sm" /></Tooltip>
        </div>
      </div>
    </div>
  );
}

export function AccountScreen() {
  const go = useGo();
  const [tab, setTab] = React.useState('upcoming');
  const upcoming = BOOKINGS.filter((b) => b.status !== 'request');
  const requests = BOOKINGS.filter((b) => b.status === 'request');
  const shown = tab === 'requests' ? requests : tab === 'past' ? [] : upcoming;

  return (
    <div style={{ background: 'var(--color-bg-page)', minHeight: '100vh', paddingBottom: 'var(--space-12)' }}>
      <div style={{ background: 'var(--navy-900)', padding: 'var(--space-10) 0 var(--space-12)' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
          <span style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--teal-500)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-semibold)' }}>NJ</span>
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 'var(--weight-semibold)', color: '#fff', letterSpacing: 'var(--tracking-tight)' }}>Nusrat Jahan</h1>
            <div style={{ marginTop: 4, fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--navy-200)' }}>nusrat@example.com · +880 1712-345678 · Member since 2024</div>
          </div>
          <Button variant="secondary" onClick={() => go('home')}>Book something new</Button>
        </div>
      </div>

      <div style={{ maxWidth: 'var(--container-max)', margin: '-32px auto 0', padding: '0 var(--space-6)', display: 'grid', gridTemplateColumns: '1fr 300px', gap: 'var(--space-8)', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', padding: 'var(--space-6)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
          <Tabs items={[{ id: 'upcoming', label: 'Upcoming', count: upcoming.length }, { id: 'past', label: 'Past trips' }, { id: 'requests', label: 'Requests', count: requests.length }]} value={tab} onChange={setTab} />
          {shown.length ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {shown.map((b) => <BookingRow key={b.ref} b={b} />)}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-16) 0', textAlign: 'center' }}>
              <span style={{ color: 'var(--gray-300)' }}><Icon name="luggage" size={40} /></span>
              <strong style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)', color: 'var(--navy-900)' }}>No past trips yet</strong>
              <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', maxWidth: 320, lineHeight: 'var(--leading-normal)' }}>Once a trip is over it moves here with its invoice and photos.</p>
              <Button variant="outline" size="sm" onClick={() => go('search')}>Browse tours</Button>
            </div>
          )}
        </div>

        <aside style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ padding: 'var(--space-5)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <strong style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', color: 'var(--navy-900)' }}>Traveller profile</strong>
            <Input label="Full name" defaultValue="Nusrat Jahan" />
            <Input label="NID / Passport" defaultValue="A0123456" helperText="Needed for ship and air tickets." />
            <Button variant="outline" size="sm">Save changes</Button>
          </div>
          <div style={{ padding: 'var(--space-5)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <strong style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', color: 'var(--navy-900)' }}>Notifications</strong>
            <Switch label="Booking updates on WhatsApp" defaultChecked />
            <Switch label="Offers and promotions" />
            <Switch label="Travel guide newsletter" defaultChecked />
          </div>
        </aside>
      </div>
    </div>
  );
}
