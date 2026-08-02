'use client';

import React from 'react';
import Link from 'next/link';
import { Badge, Button, Dialog, Icon, IconButton, Input, Radio, Tabs, Toast } from '../index.js';
import { Price, Stars } from '../site/chrome.jsx';
import { useGo, ROUTES } from '../../lib/routes.js';
import { IMG, REVIEWS } from '../../lib/site-data.js';
import layout from '../../styles/layout.module.css';
import c from './screens.module.css';

export function DetailScreen({ listing }) {
  const go = useGo();
  const [tab, setTab] = React.useState('overview');
  const [pax, setPax] = React.useState(2);
  const [confirm, setConfirm] = React.useState(false);
  const [toast, setToast] = React.useState(false);
  const [pay, setPay] = React.useState('bkash');
  const l = listing;
  const unit = l.price;
  const fee = 120;
  const total = unit * pax + fee;

  return (
    <div style={{ background: 'var(--color-bg-page)', paddingBottom: 'var(--space-12)' }}>
      <div className={layout.container} style={{ paddingTop: 'var(--space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>
          <Link href={ROUTES.home} style={{ color: 'var(--color-link)', textDecoration: 'none' }}>Home</Link><Icon name="chevron-right" size={12} />
          <Link href={ROUTES.search} style={{ color: 'var(--color-link)', textDecoration: 'none' }}>Houseboat tours</Link><Icon name="chevron-right" size={12} />
          <span>{l.title}</span>
        </div>

        {/* Row tracks are minmax(0,1fr), not the implicit auto: the <img> children are direct grid
            items whose min-content contribution is their intrinsic height, which otherwise grows
            the track past the gallery height and overlaps the heading below. */}
        <div className={c.gallery}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={l.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }} />
          <div className={c.galleryThumbs}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.marine} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }} />
            <div style={{ position: 'relative' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG.sunset} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-lg)', display: 'block' }} />
              <button type="button" style={{ position: 'absolute', inset: 0, border: 'none', borderRadius: 'var(--radius-lg)', background: 'rgba(5,30,61,.55)', color: '#fff', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <Icon name="images" size={18} />+14 photos
              </button>
            </div>
          </div>
        </div>

        <div className={c.detailLayout}>
          <div className={c.detailMain}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <Badge tone="teal" variant="solid">Instant booking</Badge>
                {l.offer ? <Badge tone="gold" variant="solid">{l.offer}</Badge> : null}
              </div>
              <h1 className={c.detailTitle}>{l.title}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Stars value={l.rating} size={14} /><strong style={{ color: 'var(--navy-800)' }}>{l.rating}</strong>({l.reviews} reviews)</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Icon name="map-pin" size={14} />{l.place}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Icon name="clock" size={14} />9:00 AM – 5:30 PM</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Icon name="users" size={14} />Max 40 guests</span>
              </div>
            </div>

            <Tabs items={[{ id: 'overview', label: 'Overview' }, { id: 'itinerary', label: 'Itinerary' }, { id: 'included', label: 'What’s included' }, { id: 'policy', label: 'Cancellation' }, { id: 'reviews', label: 'Reviews', count: l.reviews }]} value={tab} onChange={setTab} style={{ overflowX: 'auto' }} />

            {tab === 'itinerary' ? (
              <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {[['9:00 AM', 'Pickup from Kolatoli point', 'Our coordinator meets you at the Kolatoli circle with a YesTourBD sign.'],
                  ['10:15 AM', 'Board the houseboat at Nazirartek jetty', 'Life jackets, seating allocation and safety briefing.'],
                  ['12:30 PM', 'Lunch on deck', 'Rice, grilled fish, seasonal vegetables and soft drinks.'],
                  ['3:00 PM', 'Moheshkhali channel & bird watching', 'Roughly 90 minutes of open water and mangrove edges.'],
                  ['5:30 PM', 'Drop off at Kolatoli', 'Back before sunset. Hotel drop-off on request.']].map(([t, h, b]) => (
                  <li key={t} className={c.itineraryRow}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-semibold)', color: 'var(--teal-700)', paddingTop: 3 }}>{t}</span>
                    <div style={{ borderLeft: '2px solid var(--color-border)', paddingLeft: 'var(--space-4)' }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--weight-semibold)', color: 'var(--navy-900)' }}>{h}</div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-normal)', marginTop: 3 }}>{b}</div>
                    </div>
                  </li>
                ))}
              </ol>
            ) : tab === 'included' ? (
              <div className={c.pairGrid} style={{ gap: 'var(--space-6)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {['Return AC transfer from Kolatoli', 'Houseboat cruise, 6 hours', 'Lunch and afternoon snacks', 'Life jackets and safety crew', 'Guide (Bangla / English)'].map((x) => (
                    <span key={x} style={{ display: 'inline-flex', gap: 8, alignItems: 'flex-start', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--gray-800)' }}><span style={{ color: 'var(--teal-600)', marginTop: 2 }}><Icon name="check" size={15} /></span>{x}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {['Hotel accommodation', 'Personal expenses', 'Fish World entry ticket', 'Travel insurance'].map((x) => (
                    <span key={x} style={{ display: 'inline-flex', gap: 8, alignItems: 'flex-start', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}><span style={{ color: 'var(--gray-400)', marginTop: 2 }}><Icon name="x" size={15} /></span>{x}</span>
                  ))}
                </div>
              </div>
            ) : tab === 'policy' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', padding: 'var(--space-5)', background: 'var(--color-success-bg)', border: '1px solid var(--teal-200)', borderRadius: 'var(--radius-lg)' }}>
                <strong style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', color: 'var(--teal-800)' }}>Free cancellation up to 48 hours before departure</strong>
                <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--teal-800)', lineHeight: 'var(--leading-relaxed)' }}>Cancel within 48 hours and 50% of the fare is refunded. No refund for no-shows. Weather cancellations by the operator are refunded in full or moved to any other date you choose.</p>
              </div>
            ) : tab === 'reviews' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {REVIEWS.map((r) => (
                  <div key={r.name} style={{ display: 'flex', gap: 'var(--space-4)', padding: 'var(--space-5)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
                    <span style={{ width: 40, height: 40, flex: '0 0 auto', borderRadius: '50%', background: 'var(--navy-50)', color: 'var(--navy-700)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-semibold)' }}>{r.name[0]}</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <strong style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--navy-900)' }}>{r.name}</strong>
                        <Stars value={r.rating} size={13} />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>· Feb 2026</span>
                      </div>
                      <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--gray-700)', lineHeight: 'var(--leading-relaxed)' }}>{r.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', lineHeight: 'var(--leading-relaxed)', color: 'var(--gray-800)', maxWidth: 640 }}>A full day on the water without the overnight commitment. You leave Kolatoli at nine, board a covered houseboat at Nazirartek, and spend six hours between the channel, the mangrove edge and a long lunch on deck. Back before sunset.</p>
                <div className={layout.grid4}>
                  {[['calendar-check', 'Daily departure', 'Except Fridays in Ramadan'], ['utensils', 'Lunch on board', 'Grilled fish or chicken'], ['baby', 'Family friendly', 'Under 5 travel free'], ['life-buoy', 'Safety certified', 'BIWTA registered boat']].map(([ic, t, s]) => (
                    <div key={t} style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: 'var(--space-4)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                      <span style={{ color: 'var(--teal-600)' }}><Icon name={ic} size={18} /></span>
                      <strong style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--navy-900)' }}>{t}</strong>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className={c.bookingAside}>
            <div style={{ padding: 'var(--space-5)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <Price amount={unit} was={l.was} />
              <Input label="Travel date" type="date" defaultValue="2026-03-12" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--gray-700)' }}>Guests</span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid var(--color-border-strong)', borderRadius: 'var(--radius-md)', padding: '6px 10px' }}>
                  <IconButton icon={<Icon name="minus" size={16} />} aria-label="Fewer guests" variant="ghost" size="sm" onClick={() => setPax(Math.max(1, pax - 1))} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', fontWeight: 'var(--weight-semibold)', color: 'var(--navy-900)' }}>{pax} {pax === 1 ? 'adult' : 'adults'}</span>
                  <IconButton icon={<Icon name="plus" size={16} />} aria-label="More guests" variant="ghost" size="sm" onClick={() => setPax(Math.min(12, pax + 1))} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 'var(--space-3)', borderTop: '1px solid var(--color-border)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}><span>৳{unit.toLocaleString('en-US')} × {pax}</span><span>৳{(unit * pax).toLocaleString('en-US')}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}><span>Service fee</span><span>৳{fee}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 8, borderTop: '1px dashed var(--color-border)' }}>
                  <strong style={{ color: 'var(--navy-900)' }}>Total</strong>
                  <strong style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', color: 'var(--navy-900)' }}>৳{total.toLocaleString('en-US')}</strong>
                </div>
              </div>
              <Button size="lg" fullWidth onClick={() => setConfirm(true)}>Book now</Button>
              <Button variant="outline" fullWidth iconLeft={<Icon name="message-circle" size={17} />}>Ask on WhatsApp</Button>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}><Icon name="lock" size={13} />Secure payment via SSLCommerz</span>
            </div>
            <div style={{ padding: 'var(--space-4)', background: 'var(--navy-50)', border: '1px solid var(--navy-100)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--navy-800)', display: 'flex', gap: 10 }}>
              <span style={{ color: 'var(--navy-600)', flex: '0 0 auto' }}><Icon name="users" size={17} /></span>
              <span>Booking for 10 or more? <Link href={ROUTES.request} style={{ color: 'var(--color-link)', fontWeight: 'var(--weight-semibold)' }}>Request a group quote</Link> instead — it’s usually cheaper.</span>
            </div>
          </aside>
        </div>
      </div>

      <Dialog open={confirm} onClose={() => setConfirm(false)} title="Confirm and pay"
        description={`${l.title} · 12 Mar 2026 · ${pax} ${pax === 1 ? 'adult' : 'adults'}`}
        footer={<><Button variant="ghost" onClick={() => setConfirm(false)}>Back</Button><Button onClick={() => { setConfirm(false); setToast(true); }}>Pay ৳{total.toLocaleString('en-US')}</Button></>}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div className={c.pairGrid}>
            <Input label="Full name" defaultValue="Nusrat Jahan" />
            <Input label="Mobile" iconLeft={<Icon name="phone" size={15} />} defaultValue="+880 1712-345678" />
          </div>
          <Input label="Email for the voucher" defaultValue="nusrat@example.com" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--gray-700)' }}>Payment method</span>
            <div style={{ display: 'flex', gap: 'var(--space-5)', flexWrap: 'wrap' }}>
              {[['bkash', 'bKash'], ['nagad', 'Nagad'], ['card', 'Card']].map(([v, lab]) => (
                <Radio key={v} name="pay" value={v} label={lab} checked={pay === v} onChange={() => setPay(v)} />
              ))}
            </div>
          </div>
        </div>
      </Dialog>

      {toast ? (
        <div style={{ position: 'fixed', right: 20, bottom: 92, zIndex: 60 }}>
          <Toast tone="success" icon={<Icon name="check-circle" size={18} />} title="Booking confirmed — YTB-8H2K41"
            message="The voucher is in your email and under My bookings."
            action={<Button size="sm" variant="outline" onClick={() => { setToast(false); go('account'); }}>View booking</Button>}
            onClose={() => setToast(false)} />
        </div>
      ) : null}
    </div>
  );
}
