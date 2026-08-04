'use client';

import React from 'react';
import Link from 'next/link';
import { Badge, Icon } from '../index.js';
import { TD, TH } from './chrome.jsx';
import c from './admin.module.css';

// The list view from the design system's ui_kits/admin/RequestsScreen.jsx. Owner and the
// detail dialog belong to M1.6, so the columns stop at what a first reply needs.

const STATUS_TONE = {
  submitted: 'warning',
  reviewing: 'brand',
  quoted: 'teal',
  negotiating: 'gold',
  accepted: 'success',
  booked: 'success',
  expired: 'neutral',
  lost: 'danger',
};

const TYPE_LABEL = {
  support: 'Support',
  corporate: 'Corporate',
  group: 'Group / student',
  visa: 'Visa',
  package: 'Custom package',
  car: 'Rent a car',
};

const HEADS = ['Ref', 'Customer', 'Type', 'Pax', 'Destination', 'When', 'Waiting', 'Owner', 'Status', ''];

function formatWhen(startDate, nights) {
  if (!startDate) return '—';
  const date = new Date(startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  return nights ? `${date} · ${nights}N` : date;
}

export function QueueTable({ rows }) {
  if (!rows.length) {
    return (
      <div style={{ padding: 'var(--space-8)', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
        Nothing matches those filters.
      </div>
    );
  }

  return (
    <div className={c.tableScroll}>
      <table className={c.queueTable}>
        <thead>
          <tr>{HEADS.map((head) => <th key={head} style={TH}>{head}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} style={row.overdue ? { background: 'rgba(220,38,38,.035)' } : undefined}>
              <td style={{ ...TD, fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--navy-700)', whiteSpace: 'nowrap' }}>{row.ref}</td>
              <td style={{ ...TD, fontWeight: 'var(--weight-medium)', color: 'var(--navy-900)' }}>
                {row.name}
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-regular)', color: 'var(--color-text-muted)' }}>{row.phone}</div>
              </td>
              <td style={{ ...TD, color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>{TYPE_LABEL[row.requestType] ?? row.requestType}</td>
              <td style={{ ...TD, whiteSpace: 'nowrap' }}>{row.paxBand ?? '—'}</td>
              <td style={{ ...TD, color: 'var(--color-text-secondary)' }}>{row.destinations ?? 'Support enquiry'}</td>
              <td style={{ ...TD, whiteSpace: 'nowrap' }}>{formatWhen(row.startDate, row.nights)}</td>
              <td style={{ ...TD, whiteSpace: 'nowrap' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: row.overdue ? 'var(--color-danger)' : 'inherit', fontWeight: row.overdue ? 'var(--weight-semibold)' : 'var(--weight-regular)' }}>
                  {row.overdue ? <Icon name="alert-circle" size={15} /> : null}
                  {row.waiting}
                </span>
                {row.overdue ? (
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-danger)' }}>past the 2-hour reply</div>
                ) : null}
              </td>
              <td style={{ ...TD, whiteSpace: 'nowrap' }}>
                {row.assignee ? row.assignee : <Badge tone="warning">Unassigned</Badge>}
              </td>
              <td style={{ ...TD, whiteSpace: 'nowrap' }}>
                <Badge tone={STATUS_TONE[row.status] ?? 'neutral'} dot>{row.status}</Badge>
              </td>
              <td style={{ ...TD, whiteSpace: 'nowrap' }}>
                <Link href={`/admin/requests/${encodeURIComponent(row.ref)}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--color-link)', textDecoration: 'none' }}>
                  Open<Icon name="chevron-right" size={15} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
