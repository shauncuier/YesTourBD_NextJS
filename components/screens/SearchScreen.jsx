'use client';

import React from 'react';
import { Badge, Button, Checkbox, Icon, IconButton, Input, Select, Switch, Tabs, Tag, Tooltip } from '../index.js';
import { Price, Stars } from '../site/chrome.jsx';
import { ListingCard } from './ListingCard.jsx';
import { useGo } from '../../lib/routes.js';
import { LISTINGS } from '../../lib/site-data.js';

function FilterBlock({ title, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', paddingBottom: 'var(--space-5)', borderBottom: '1px solid var(--color-border)' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)', color: 'var(--navy-900)' }}>{title}</div>
      {children}
    </div>
  );
}

function ResultRow({ l, go }) {
  const [hover, setHover] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'grid', gridTemplateColumns: '260px 1fr 220px', gap: 0, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)', transition: 'box-shadow var(--duration-normal) var(--ease-standard)' }}>
      <div style={{ position: 'relative', background: 'var(--gray-200)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={l.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
          {l.offer ? <Badge tone="gold" variant="solid">{l.offer}</Badge> : <Badge tone="teal" variant="solid">Instant</Badge>}
        </div>
        <div style={{ position: 'absolute', top: 8, right: 8 }}>
          <IconButton icon={<Icon name="heart" size={16} color={saved ? 'var(--red-500)' : 'currentColor'} />} aria-label="Save" variant="solid" size="sm" onClick={() => setSaved(!saved)} style={{ background: 'rgba(255,255,255,.9)', color: 'var(--navy-800)' }} />
        </div>
      </div>
      <div style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}><Icon name="map-pin" size={13} />{l.place}</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)', fontWeight: 'var(--weight-semibold)', color: 'var(--navy-900)' }}>{l.title}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
          <Stars value={l.rating} size={13} /><strong style={{ color: 'var(--navy-800)' }}>{l.rating}</strong>({l.reviews} reviews)
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 2 }}>{l.tags.map((t) => <Badge key={t} tone="neutral">{t}</Badge>)}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 'auto', fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--teal-700)', fontWeight: 'var(--weight-semibold)' }}>
          <Icon name="check-circle" size={14} />Free cancellation up to 48 hours before
        </div>
      </div>
      <div style={{ padding: 'var(--space-5)', borderLeft: '1px solid var(--color-border)', background: 'var(--gray-50)', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
        <div style={{ textAlign: 'right' }}>
          <Price amount={l.price} was={l.was} />
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 4 }}>৳{(l.price * 2).toLocaleString('en-US')} total · 2 guests</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
          <Button fullWidth onClick={() => go(`/tours/${l.slug}`)}>Book now</Button>
          <Button variant="ghost" size="sm" fullWidth onClick={() => go(`/tours/${l.slug}`)}>View details</Button>
        </div>
      </div>
    </div>
  );
}

export function SearchScreen() {
  const go = useGo();
  const [sort, setSort] = React.useState('popular');
  const [view, setView] = React.useState('list');
  const [instantOnly, setInstantOnly] = React.useState(false);
  const [chips, setChips] = React.useState(["Cox's Bazar", '12–14 Mar', '2 adults']);
  const listings = LISTINGS;

  return (
    <div style={{ background: 'var(--color-bg-page)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--navy-900)', padding: 'var(--space-8) 0' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--space-6)', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr .9fr auto', gap: 'var(--space-4)', alignItems: 'end' }}>
          <Input label="Destination" labelColor="light" iconLeft={<Icon name="map-pin" size={16} />} defaultValue="Cox's Bazar" />
          <Input label="Check in" labelColor="light" type="date" defaultValue="2026-03-12" />
          <Input label="Check out" labelColor="light" type="date" defaultValue="2026-03-14" />
          <Select label="Guests" labelColor="light" defaultValue="2" options={[{ label: '2 adults', value: '2' }, { label: '4 adults', value: '4' }]} />
          <Button size="md" variant="secondary" iconLeft={<Icon name="search" size={18} />} style={{ paddingLeft: 'var(--space-6)', paddingRight: 'var(--space-6)' }}>Update</Button>
        </div>
      </div>

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--space-8) var(--space-6)', display: 'grid', gridTemplateColumns: '260px 1fr', gap: 'var(--space-8)', alignItems: 'start' }}>
        <aside style={{ position: 'sticky', top: 88, display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', padding: 'var(--space-5)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)', fontWeight: 'var(--weight-semibold)', color: 'var(--navy-900)' }}>Filters</span>
            <Button variant="ghost" size="sm" onClick={() => setChips([])}>Clear</Button>
          </div>
          <FilterBlock title="Booking type">
            <Switch label="Instant booking only" checked={instantOnly} onChange={(_, v) => setInstantOnly(v)} />
          </FilterBlock>
          <FilterBlock title="Service">
            {['Hotels & resorts', 'Houseboat tours', 'Ship tickets', 'Day tours', 'Attractions'].map((s, i) => <Checkbox key={s} label={s} defaultChecked={i < 2} />)}
          </FilterBlock>
          <FilterBlock title="Price per person">
            <div style={{ display: 'flex', gap: 8 }}><Input placeholder="৳ min" /><Input placeholder="৳ max" /></div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{['Under ৳3,000', '৳3–6k', '৳6k+'].map((p) => <Tag key={p} label={p} />)}</div>
          </FilterBlock>
          <FilterBlock title="Guest rating">
            {['4.5 and above', '4.0 and above', '3.5 and above'].map((r) => <Checkbox key={r} label={r} />)}
          </FilterBlock>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)', color: 'var(--navy-900)' }}>Can’t find it?</div>
            <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-normal)' }}>Tell us what you need and we’ll quote it.</p>
            <Button variant="outline" size="sm" fullWidth onClick={() => go('request')}>Request a quote</Button>
          </div>
        </aside>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
            <div>
              <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 'var(--weight-semibold)', color: 'var(--navy-900)', letterSpacing: 'var(--tracking-tight)' }}>Cox’s Bazar · 12–14 Mar</h1>
              <div style={{ marginTop: 4, fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>{listings.length} results · prices include VAT</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Tabs variant="pill" items={[{ id: 'popular', label: 'Popular' }, { id: 'price', label: 'Price' }, { id: 'rating', label: 'Rating' }]} value={sort} onChange={setSort} />
              <Tooltip label={view === 'grid' ? 'List view' : 'Grid view'}>
                <IconButton icon={<Icon name={view === 'grid' ? 'list' : 'layout-grid'} size={18} />} aria-label={view === 'grid' ? 'List view' : 'Grid view'}
                  variant={view === 'grid' ? 'solid' : 'outline'} onClick={() => setView(view === 'grid' ? 'list' : 'grid')} />
              </Tooltip>
              <Tooltip label="Map view">
                <IconButton icon={<Icon name="map" size={18} />} aria-label="Map view"
                  variant={view === 'map' ? 'solid' : 'ghost'} onClick={() => setView(view === 'map' ? 'list' : 'map')} />
              </Tooltip>
            </div>
          </div>

          {chips.length ? (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {chips.map((c) => <Tag key={c} label={c} removable onRemove={() => setChips(chips.filter((x) => x !== c))} />)}
            </div>
          ) : null}

          {view === 'map' ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-16) var(--space-6)', textAlign: 'center', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
              <span style={{ color: 'var(--gray-300)' }}><Icon name="map" size={40} /></span>
              <strong style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)', color: 'var(--navy-900)' }}>Map view is not part of this UI kit</strong>
              <p style={{ margin: 0, maxWidth: 380, fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>No map design was supplied, so nothing was invented for it. The toggle is wired and ready for a real map surface.</p>
              <Button variant="outline" size="sm" onClick={() => setView('list')}>Back to results</Button>
            </div>
          ) : view === 'grid' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'var(--space-4)' }}>
              {listings.map((l) => <ListingCard key={l.id} l={l} />)}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {listings.map((l) => <ResultRow key={l.id} l={l} go={go} />)}
            </div>
          )}

          {view === 'map' ? null : (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-4)' }}>
              <Button variant="outline">Load more results</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
