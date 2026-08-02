'use client';

import React from 'react';
import { Badge, Card, Icon } from '../index.js';
import { Price, Stars } from '../site/chrome.jsx';

/** Listing tile used on the home page and in the search grid view. */
export function ListingCard({ l }) {
  return (
    <Card image={l.img} imageHeight={168} href={`/tours/${l.slug}`} padding="sm"
      badge={l.offer ? <Badge tone="gold" variant="solid">{l.offer}</Badge> : <Badge tone="teal" variant="solid">Instant</Badge>}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
        <Icon name="map-pin" size={13} />{l.place}
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--weight-semibold)', color: 'var(--navy-900)', lineHeight: 'var(--leading-snug)' }}>{l.title}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
        <Stars value={l.rating} size={13} /><strong style={{ color: 'var(--navy-800)' }}>{l.rating}</strong>({l.reviews})
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 2 }}>{l.tags.map((t) => <Badge key={t} tone="neutral">{t}</Badge>)}</div>
      <div style={{ marginTop: 'auto', paddingTop: 'var(--space-3)' }}><Price amount={l.price} was={l.was} /></div>
    </Card>
  );
}
