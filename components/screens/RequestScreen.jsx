'use client';

import React from 'react';
import { Badge, Button, Checkbox, Icon, Input, Radio, Select, Tag, Toast } from '../index.js';
import { useGo } from '../../lib/routes.js';
import layout from '../../styles/layout.module.css';
import c from './screens.module.css';

const REQUEST_TYPES = [
  { id: 'corporate', icon: 'briefcase', label: 'Corporate tour or event', blurb: 'Retreats, conferences, dealer meets' },
  { id: 'group', icon: 'users', label: 'Group / student tour', blurb: '10 guests or more' },
  { id: 'visa', icon: 'stamp', label: 'Visa assistance', blurb: 'Documents, appointment, submission' },
  { id: 'package', icon: 'package', label: 'Custom package', blurb: 'Built around your dates and budget' },
  { id: 'car', icon: 'car-front', label: 'Rent a car', blurb: 'Chader Gari, microbus, sedan' },
];

const NEEDS = ['Need transport', 'Need hotel', 'Need meals', 'Need event setup', 'Need guide'];

const CONTACT_LABEL = { whatsapp: 'WhatsApp', call: 'a phone call', email: 'email' };

const IDLE = { status: 'idle' };

// `action` is the server action from app/request/page.tsx. It is a prop rather than an import
// so this screen can be rendered in a test without a server or a database; the default is a
// no-op that leaves the form in its idle state.
export function RequestScreen({ action = async () => IDLE }) {
  const go = useGo();
  const [state, submit, pending] = React.useActionState(action, IDLE);
  const errors = state.status === 'invalid' ? state.errors : {};
  const [type, setType] = React.useState('corporate');
  const [contact, setContact] = React.useState('whatsapp');
  const [needs, setNeeds] = React.useState([]);
  const toggleNeed = (need) =>
    setNeeds((current) => (current.includes(need) ? current.filter((n) => n !== need) : [...current, need]));
  // The notes field is a bare <textarea> rather than a design-system component, so it has to
  // carry Input's focus treatment itself — it suppresses the UA outline and would otherwise
  // show a keyboard user nothing at all.
  const [notesFocus, setNotesFocus] = React.useState(false);

  return (
    <div style={{ background: 'var(--color-bg-page)', paddingBottom: 'var(--space-12)' }}>
      <div className={c.requestHero}>
        <div className={layout.containerNarrow} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {/* alignSelf keeps the pill hugging its text — as a flex item in a column it would
              otherwise stretch to the container's full width. */}
          <Badge tone="teal" variant="solid" size="md" style={{ alignSelf: 'flex-start' }}>Request based · no payment now</Badge>
          <h1 className={c.requestTitle}>Tell us the trip. We’ll send the quotation.</h1>
          <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', color: 'var(--navy-200)', lineHeight: 'var(--leading-relaxed)', maxWidth: 560 }}>Some trips are too specific for a booking form — 34 people, three hotels, one bus. Fill this in and a coordinator replies within two working hours.</p>
        </div>
      </div>

      <div className={`${layout.container} ${c.requestLayout}`}>
        <form action={submit} className={c.requestCard} noValidate>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)', fontWeight: 'var(--weight-semibold)', color: 'var(--navy-900)' }}>1 · What do you need?</span>
            {/* The picker is a row of buttons, so the chosen id rides along as a hidden field. */}
            <input type="hidden" name="requestType" value={type} />
            <div className={c.requestTypes}>
              {REQUEST_TYPES.map((t) => {
                const on = t.id === type;
                return (
                  <button key={t.id} type="button" onClick={() => setType(t.id)} style={{ textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 6, padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', background: on ? 'var(--navy-50)' : 'var(--color-bg-surface)', border: `1px solid ${on ? 'var(--navy-400)' : 'var(--color-border)'}`, boxShadow: on ? 'var(--shadow-sm)' : 'none', transition: 'all var(--duration-fast) var(--ease-standard)' }}>
                    <span style={{ color: on ? 'var(--navy-700)' : 'var(--color-text-muted)' }}><Icon name={t.icon} size={19} /></span>
                    <strong style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--navy-900)' }}>{t.label}</strong>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 'var(--leading-normal)' }}>{t.blurb}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)', fontWeight: 'var(--weight-semibold)', color: 'var(--navy-900)' }}>2 · The details</span>
            <div className={c.pairGrid} style={{ gap: 'var(--space-4)' }}>
              <Input label="Destination(s)" name="destinations" required placeholder="e.g. Sylhet + Sreemangal" error={errors.destinations} />
              <Select label="Number of travellers" name="paxBand" required placeholder="Select" error={errors.paxBand}
                options={[{ label: '1–9', value: '1-9' }, { label: '10–24', value: '10-24' }, { label: '25–49', value: '25-49' }, { label: '50+', value: '50+' }]} />
              <Input label="Preferred start date" name="startDate" type="date" error={errors.startDate} />
              <Input label="Nights" name="nights" type="number" placeholder="3" error={errors.nights} />
              <Select label="Budget per person" name="budgetBand" placeholder="Optional" error={errors.budgetBand}
                options={[{ label: 'Under ৳5,000', value: 'under-5k' }, { label: '৳5,000–15,000', value: '5k-15k' }, { label: '৳15,000+', value: '15k-plus' }]} />
              <Input label="Company / institution" name="org" placeholder="Optional" error={errors.org} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label htmlFor="request-notes" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--gray-700)' }}>Anything else we should plan around?</label>
              <textarea id="request-notes" name="notes" rows={4} placeholder="Transport from Dhaka, one vegetarian meal per day, conference room for 40 on the second morning…"
                onFocus={() => setNotesFocus(true)} onBlur={() => setNotesFocus(false)}
                style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', color: 'var(--color-text-primary)', padding: '10px 12px', border: `1px solid ${notesFocus ? 'var(--teal-500)' : 'var(--color-border)'}`, borderRadius: 'var(--radius-md)', outline: 'none', boxShadow: notesFocus ? 'var(--shadow-focus)' : 'none', transition: 'all var(--duration-fast) var(--ease-standard)', resize: 'vertical', background: 'var(--color-bg-surface)' }} />
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {NEEDS.map((x) => <Tag key={x} label={x} selected={needs.includes(x)} onClick={() => toggleNeed(x)} />)}
            </div>
            {/* Tags are spans, so each selected one contributes its own hidden field. */}
            {needs.map((need) => <input key={need} type="hidden" name="needs" value={need} />)}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)', fontWeight: 'var(--weight-semibold)', color: 'var(--navy-900)' }}>3 · How do we reach you?</span>
            <div className={c.pairGrid} style={{ gap: 'var(--space-4)' }}>
              <Input label="Your name" name="name" required placeholder="Full name" autoComplete="name" error={errors.name} />
              <Input label="Mobile" name="phone" required iconLeft={<Icon name="phone" size={15} />} placeholder="+880 1XXX-XXXXXX"
                type="tel" inputMode="tel" autoComplete="tel" error={errors.phone} />
              <Input label="Email" name="email" type="email" placeholder="you@example.com" autoComplete="email"
                helperText="We send the written quotation here." error={errors.email} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--gray-700)' }}>Reply on</span>
                <div style={{ display: 'flex', gap: 'var(--space-5)' }}>
                  <Radio name="contactPref" value="whatsapp" label="WhatsApp" checked={contact === 'whatsapp'} onChange={() => setContact('whatsapp')} />
                  <Radio name="contactPref" value="call" label="Phone call" checked={contact === 'call'} onChange={() => setContact('call')} />
                  <Radio name="contactPref" value="email" label="Email" checked={contact === 'email'} onChange={() => setContact('email')} />
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Checkbox name="consent" label="I agree to be contacted about this request." defaultChecked />
              {errors.consent ? <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-danger)' }}>{errors.consent}</span> : null}
            </div>
            <div className={c.actionRow}>
              <Button size="lg" type="submit" disabled={pending}>{pending ? 'Sending…' : 'Send request'}</Button>
              <Button size="lg" variant="outline" iconLeft={<Icon name="message-circle" size={17} />}>Send on WhatsApp instead</Button>
            </div>
          </div>
        </form>

        <aside className={c.requestAside}>
          <div style={{ padding: 'var(--space-5)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <strong style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', color: 'var(--navy-900)' }}>What happens next</strong>
            {[['1', 'We read it', 'A coordinator, not a bot.'], ['2', 'Quotation in 2 hours', 'Written, itemised, in working hours.'], ['3', 'Adjust freely', 'Swap hotels, dates or transport.'], ['4', 'Pay 30% to hold', 'Balance before departure.']].map(([n, t, b]) => (
              <div key={n} style={{ display: 'flex', gap: 'var(--space-3)' }}>
                <span style={{ width: 24, height: 24, flex: '0 0 auto', borderRadius: '50%', background: 'var(--teal-50)', color: 'var(--teal-700)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-semibold)' }}>{n}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)', color: 'var(--navy-900)' }}>{t}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{b}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: 'var(--space-5)', background: 'var(--navy-900)', borderRadius: 'var(--radius-lg)', color: '#fff', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ color: 'var(--teal-300)' }}><Icon name="headset" size={20} /></span>
            <strong style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)' }}>Rather just talk?</strong>
            <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--navy-200)', lineHeight: 'var(--leading-relaxed)' }}>Corporate desk, 9 AM – 10 PM, seven days.</p>
            <a href="tel:+8801000000000" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)', fontWeight: 'var(--weight-semibold)', color: '#fff', textDecoration: 'none' }}>+880 1XXX-XXXXXX</a>
          </div>
        </aside>
      </div>

      {state.status === 'sent' ? (
        <div style={{ position: 'fixed', right: 20, bottom: 92, zIndex: 60 }}>
          <Toast tone="success" icon={<Icon name="check-circle" size={18} />} title={`Request sent — ${state.ref}`}
            message={`A coordinator will reply on ${CONTACT_LABEL[contact]} within two working hours.`}
            action={<Button size="sm" variant="outline" onClick={() => go('/track')}>Track request</Button>} />
        </div>
      ) : null}

      {state.status === 'error' ? (
        <div style={{ position: 'fixed', right: 20, bottom: 92, zIndex: 60 }}>
          <Toast tone="danger" icon={<Icon name="alert-circle" size={18} />} title="Not sent" message={state.message} />
        </div>
      ) : null}
    </div>
  );
}
