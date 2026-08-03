'use client';

import React from 'react';
import { Badge, Button, Icon, IconButton, Input, Switch, Tabs, Tooltip } from '../index.js';
import { useGo } from '../../lib/routes.js';
import { BOOKINGS } from '../../lib/site-data.js';
import layout from '../../styles/layout.module.css';
import c from './screens.module.css';

const STATUS = {
  confirmed: { tone: 'success', label: 'Confirmed' },
  paid: { tone: 'success', label: 'Paid' },
  request: { tone: 'warning', label: 'Awaiting quotation' },
  cancelled: { tone: 'danger', label: 'Cancelled' },
};

function BookingRow({ b }) {
  const s = STATUS[b.status] || STATUS.confirmed;
  return (
    <div className={c.bookingRow}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={c.bookingThumb} src={b.img} alt="" loading="lazy" decoding="async" />
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
      <div className={c.bookingActions}>
        {b.total != null ? <strong style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)', color: 'var(--navy-900)' }}>৳{b.total.toLocaleString('en-US')}</strong> : <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>Quote pending</span>}
        <div style={{ display: 'flex', gap: 8 }}>
          {b.total != null ? <Button size="sm" variant="outline" iconLeft={<Icon name="download" size={15} />}>Voucher</Button> : <Button size="sm" variant="outline">View request</Button>}
          <Tooltip label="Chat about this booking"><IconButton icon={<Icon name="message-circle" size={17} />} aria-label="Chat" variant="ghost" size="sm" /></Tooltip>
        </div>
      </div>
    </div>
  );
}

function RequestRow({ r, go }) {
  return (
    <div className={c.bookingRow} style={{ gridTemplateColumns: '1fr auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <Badge tone={r.statusTone} dot>{r.statusLabel}</Badge>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{r.ref}</span>
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--weight-semibold)', color: 'var(--navy-900)' }}>{r.title}</div>
        <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Icon name="calendar" size={14} />Sent {r.submitted}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Icon name="users" size={14} />{r.paxBand}</span>
        </div>
      </div>
      <div className={c.bookingActions}>
        {r.totalLabel ? (
          <strong style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)', color: 'var(--navy-900)' }}>{r.totalLabel}</strong>
        ) : (
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>Quote pending</span>
        )}
        <Button size="sm" variant="outline" onClick={() => go(`/track`)}>View request</Button>
      </div>
    </div>
  );
}

function Empty({ icon, title, blurb, action }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-16) 0', textAlign: 'center' }}>
      <span style={{ color: 'var(--gray-300)' }}><Icon name={icon} size={40} /></span>
      <strong style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)', color: 'var(--navy-900)' }}>{title}</strong>
      <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', maxWidth: 340, lineHeight: 'var(--leading-normal)' }}>{blurb}</p>
      {action}
    </div>
  );
}

/**
 * `profile` and `requests` come from the signed-in customer's own rows. Bookings are still
 * placeholder because there is nothing to book yet — instant booking and payment are Phase 3,
 * so that tab says so rather than showing invented trips.
 */
export function AccountScreen({ profile = null, requests = null }) {
  const go = useGo();
  const [tab, setTab] = React.useState(requests ? 'requests' : 'upcoming');
  const realRequests = requests ?? [];
  const openRequests = realRequests.filter((r) => r.open);
  const upcoming = requests ? [] : BOOKINGS.filter((b) => b.status !== 'request');
  const shown = tab === 'requests' ? realRequests : tab === 'past' ? [] : upcoming;

  return (
    <div style={{ background: 'var(--color-bg-page)', minHeight: '100vh', paddingBottom: 'var(--space-12)' }}>
      <div className={c.accountHeader}>
        <div className={`${layout.container} ${c.accountIdentity}`}>
          <span style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--teal-500)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-semibold)' }}>
            {profile?.initials ?? 'NJ'}
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 'var(--weight-semibold)', color: '#fff', letterSpacing: 'var(--tracking-tight)' }}>
              {profile?.name ?? 'Nusrat Jahan'}
            </h1>
            <div style={{ marginTop: 4, fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--navy-200)' }}>
              {profile
                ? [profile.email, profile.phone, `Member since ${profile.memberSince}`].filter(Boolean).join(' · ')
                : 'nusrat@example.com · +880 1712-345678 · Member since 2024'}
            </div>
          </div>
          <Button variant="secondary" onClick={() => go('home')}>Book something new</Button>
        </div>
      </div>

      <div className={`${layout.container} ${c.accountLayout}`} style={{ marginTop: -32 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', padding: 'var(--space-5)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
          <Tabs
            items={[
              { id: 'upcoming', label: 'Upcoming', count: upcoming.length },
              { id: 'past', label: 'Past trips' },
              { id: 'requests', label: 'Requests', count: openRequests.length || realRequests.length },
            ]}
            value={tab}
            onChange={setTab}
            style={{ overflowX: 'auto' }}
          />

          {tab === 'requests' && requests ? (
            realRequests.length ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {realRequests.map((r) => <RequestRow key={r.ref} r={r} go={go} />)}
              </div>
            ) : (
              <Empty
                icon="message-square-quote"
                title="No requests yet"
                blurb="Corporate trips, group tours, visas and custom packages are quoted by a person. Ask for one and it will show up here."
                action={<Button variant="outline" size="sm" onClick={() => go('request')}>Ask for a quote</Button>}
              />
            )
          ) : shown.length ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {shown.map((b) => <BookingRow key={b.ref} b={b} />)}
            </div>
          ) : tab === 'upcoming' ? (
            <Empty
              icon="luggage"
              title="Nothing booked yet"
              blurb="Instant booking is not switched on yet, so nothing can be confirmed here today. Requests you send are on the Requests tab."
              action={<Button variant="outline" size="sm" onClick={() => go('request')}>Ask for a quote</Button>}
            />
          ) : (
            <Empty
              icon="luggage"
              title="No past trips yet"
              blurb="Once a trip is over it moves here with its invoice and photos."
              action={<Button variant="outline" size="sm" onClick={() => go('search')}>Browse tours</Button>}
            />
          )}
        </div>

        <aside style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ padding: 'var(--space-5)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <strong style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', color: 'var(--navy-900)' }}>Traveller profile</strong>
            <Input label="Full name" defaultValue={profile?.name === 'Traveller' ? '' : profile?.name ?? 'Nusrat Jahan'} placeholder="Your name" />
            <Input label="NID / Passport" defaultValue={profile ? '' : 'A0123456'} helperText="Needed for ship and air tickets." />
            {/* Saving is M2.4, which also encrypts the identity fields at rest. */}
            <Button variant="outline" size="sm" disabled={Boolean(profile)}>Save changes</Button>
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
