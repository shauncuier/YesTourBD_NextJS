'use client';

import React from 'react';
import Link from 'next/link';
import { Badge, Button, Card, Icon, Input, Select, Tabs, Tag } from '../index.js';
import { SectionHead, Stars } from '../site/chrome.jsx';
import { ListingCard } from './ListingCard.jsx';
import { useGo, ROUTES } from '../../lib/routes.js';
import { IMG, LISTINGS, POSTS, REVIEWS, SERVICES } from '../../lib/site-data.js';
import s from '../../styles/layout.module.css';

const SEARCH_TABS = [
  { id: 'hotels', label: 'Hotels', icon: <Icon name="bed-double" size={15} /> },
  { id: 'houseboat', label: 'Houseboats', icon: <Icon name="ship" size={15} /> },
  { id: 'ship', label: 'Ship', icon: <Icon name="sailboat" size={15} /> },
  { id: 'air', label: 'Air', icon: <Icon name="plane" size={15} /> },
  { id: 'bus', label: 'Bus', icon: <Icon name="bus" size={15} /> },
  { id: 'car', label: 'Rent a car', icon: <Icon name="car-front" size={15} /> },
];

function HeroSearch({ go }) {
  const [tab, setTab] = React.useState('hotels');
  return (
    <div style={{ background: 'var(--color-bg-surface)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <Tabs items={SEARCH_TABS} value={tab} onChange={setTab} style={{ overflowX: 'auto' }} />
      <div className={s.searchGrid}>
        <Input key={tab} label={tab === 'hotels' ? 'Destination or property' : 'Route'} iconLeft={<Icon name="map-pin" size={16} />} defaultValue={tab === 'hotels' ? "Cox's Bazar" : 'Teknaf → Saint Martin'} />
        <Input label="Check in" type="date" defaultValue="2026-03-12" />
        <Input label="Check out" type="date" defaultValue="2026-03-14" />
        <Select label="Guests" options={[{ label: '2 adults', value: '2' }, { label: '2 adults, 1 child', value: '3' }, { label: '4 adults', value: '4' }]} defaultValue="2" />
        <div className={s.searchAction}>
          <Button size="md" fullWidth iconLeft={<Icon name="search" size={18} />} onClick={() => go('search')} style={{ paddingLeft: 'var(--space-6)', paddingRight: 'var(--space-6)' }}>Search</Button>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginRight: 4 }}>Popular:</span>
        {["Cox's Bazar", 'Saint Martin', 'Sajek', 'Tanguar Haor', 'Bandarban'].map((p) => <Tag key={p} label={p} onClick={() => go('search')} />)}
      </div>
    </div>
  );
}

function Hero({ go }) {
  return (
    <section style={{ position: 'relative', paddingTop: 'var(--space-16)', paddingBottom: 'var(--space-12)' }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMG.hero} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,30,61,.82) 0%, rgba(5,30,61,.62) 45%, rgba(247,249,251,1) 100%)' }} />
      </div>
      <div className={s.container} style={{ position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: 720, marginBottom: 'var(--space-10)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, alignSelf: 'flex-start', padding: '6px 12px', borderRadius: 'var(--radius-full)', background: 'rgba(255,255,255,.14)', border: '1px solid rgba(255,255,255,.22)', color: '#fff', fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-semibold)', letterSpacing: 'var(--tracking-wide)' }}>
            <Icon name="shield-check" size={14} />12 travel services · one account
          </span>
          <h1 className={s.heroTitle}>Book the whole trip, not just the ticket.</h1>
          <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', lineHeight: 'var(--leading-relaxed)', color: 'rgba(255,255,255,.86)', maxWidth: 560 }}>Hotels, houseboats, ship and air tickets you can confirm right now — plus corporate tours, packages and visa help handled by a real person.</p>
        </div>
        <HeroSearch go={go} />
      </div>
    </section>
  );
}

function ServiceTile({ s }) {
  const [hover, setHover] = React.useState(false);
  const instant = s.mode === 'instant';
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 'var(--space-5)', height: '100%', boxSizing: 'border-box', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)', transform: hover ? 'translateY(-2px)' : 'none', transition: 'all var(--duration-normal) var(--ease-standard)' }}>
      <span style={{ width: 42, height: 42, borderRadius: 'var(--radius-md)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: instant ? 'var(--teal-50)' : 'var(--navy-50)', color: instant ? 'var(--teal-600)' : 'var(--navy-700)' }}><Icon name={s.icon} size={21} /></span>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--weight-semibold)', color: 'var(--navy-900)' }}>{s.label}</div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-normal)', flex: 1 }}>{s.blurb}</div>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-semibold)', color: instant ? 'var(--teal-700)' : 'var(--navy-700)', letterSpacing: 'var(--tracking-wide)' }}>
        {instant ? 'Book instantly' : 'Request a quote'}<Icon name="arrow-right" size={13} />
      </span>
    </div>
  );
}

function ServiceGrid() {
  return (
    <section className={`${s.container} ${s.section}`}>
      <SectionHead eyebrow="Everything we do" title="Twelve services, two ways to book"
        action={<span style={{ display: 'flex', gap: 8 }}><Badge tone="teal" variant="solid">Instant</Badge><Badge tone="brand" variant="outline">On request</Badge></span>} />
      <div className={s.grid4}>
        {SERVICES.map((s) => (
          <Link key={s.id} href={s.mode === 'instant' ? ROUTES.search : ROUTES.request} style={{ textDecoration: 'none' }}>
            <ServiceTile s={s} />
          </Link>
        ))}
      </div>
    </section>
  );
}

function OfferBand({ go }) {
  return (
    <section className={`${s.container} ${s.section}`}>
      <div className={s.offerBand}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: 560, position: 'relative' }}>
          <Badge tone="gold" variant="solid" size="md">Eid offer · ends 20 Mar</Badge>
          <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 'var(--weight-bold)', color: '#fff', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-tight)' }}>Up to 25% off Cox’s Bazar resorts + free houseboat day tour</h3>
          <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,.85)', lineHeight: 'var(--leading-relaxed)' }}>Two nights minimum. Applies to 40+ partner properties on Kolatoli and Marine Drive.</p>
          <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
            <Button variant="secondary" size="lg" onClick={() => go('search')}>See offer hotels</Button>
            <Button variant="ghost" size="lg" style={{ color: '#fff', border: '1px solid rgba(255,255,255,.35)' }} onClick={() => go('request')}>Ask on WhatsApp</Button>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={s.offerBandImage} src={IMG.sunset} alt="" />
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className={`${s.container} ${s.section}`}>
      <SectionHead eyebrow="Reviews" title="What travellers say" />
      <div className={s.grid3}>
        {REVIEWS.map((r) => (
          <div key={r.name} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', padding: 'var(--space-5)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
            <Stars value={r.rating} />
            <p style={{ margin: 0, fontFamily: 'var(--font-accent)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', color: 'var(--gray-800)' }}>“{r.text}”</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 'auto' }}>
              <span style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--navy-50)', color: 'var(--navy-700)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-semibold)', fontSize: 'var(--text-sm)' }}>{r.name[0]}</span>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
                <div style={{ fontWeight: 'var(--weight-semibold)', color: 'var(--navy-900)' }}>{r.name}</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{r.place}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BlogTeasers() {
  return (
    <section className={`${s.container} ${s.section}`}>
      <SectionHead eyebrow="Travel guides" title="Plan before you pay" action={<Button variant="outline" size="sm" iconRight={<Icon name="arrow-right" size={15} />}>All guides</Button>} />
      <div className={s.grid3}>
        {POSTS.map((p) => (
          <Card key={p.title} image={p.img} imageHeight={150} padding="sm" href="#" onClick={(e) => e.preventDefault()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--teal-700)', fontWeight: 'var(--weight-semibold)', letterSpacing: 'var(--tracking-wide)' }}>{p.cat}<span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>· {p.read} read</span></div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--weight-semibold)', color: 'var(--navy-900)', lineHeight: 'var(--leading-snug)' }}>{p.title}</div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    { icon: 'zap', title: 'Confirmed in minutes', body: 'Instant services issue tickets and vouchers straight to your account.' },
    { icon: 'message-square-quote', title: 'Quotes within 2 hours', body: 'Corporate, group and visa requests get a written quotation, not a call-back maybe.' },
    { icon: 'lock', title: 'Payments you recognise', body: 'bKash, Nagad and cards through SSLCommerz. No cash-in-advance to strangers.' },
    { icon: 'headset', title: 'Humans on WhatsApp', body: 'Same team that took the booking answers the questions.' },
  ];
  return (
    <section className={`${s.container} ${s.section}`} style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', paddingBlock: 'var(--space-8)' }}>
      <div className={`${s.grid4} ${s.gridWideGap}`}>
        {items.map((i) => (
          <div key={i.title} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ color: 'var(--teal-600)' }}><Icon name={i.icon} size={22} /></span>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--weight-semibold)', color: 'var(--navy-900)' }}>{i.title}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-normal)' }}>{i.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HomeScreen() {
  const go = useGo();
  return (
    <div>
      <Hero go={go} />
      <ServiceGrid />
      <section className={`${s.container} ${s.section}`}>
        <SectionHead eyebrow="Booked most this week" title="Popular right now" action={<Button variant="outline" size="sm" onClick={() => go('search')} iconRight={<Icon name="arrow-right" size={15} />}>See all</Button>} />
        <div className={s.grid3}>
          {LISTINGS.slice(0, 3).map((l) => <ListingCard key={l.id} l={l} />)}
        </div>
      </section>
      <OfferBand go={go} />
      <TrustStrip />
      <Reviews />
      <BlogTeasers />
    </div>
  );
}
