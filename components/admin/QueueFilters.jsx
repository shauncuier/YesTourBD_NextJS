'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button, Icon, Input, Select } from '../index.js';
import c from './admin.module.css';

const STATUS_OPTIONS = [
  { label: 'Open requests', value: 'open' },
  { label: 'All requests', value: 'all' },
  { label: 'Submitted', value: 'submitted' },
  { label: 'Reviewing', value: 'reviewing' },
  { label: 'Quoted', value: 'quoted' },
  { label: 'Negotiating', value: 'negotiating' },
  { label: 'Accepted', value: 'accepted' },
  { label: 'Booked', value: 'booked' },
  { label: 'Expired', value: 'expired' },
  { label: 'Lost', value: 'lost' },
];

const SORT_OPTIONS = [
  { label: 'Oldest first', value: 'oldest' },
  { label: 'Newest first', value: 'newest' },
];

// Filters live in the URL rather than in component state: a coordinator can bookmark or
// paste "everything overdue, oldest first", and a refresh keeps the view they were working.
export function QueueFilters({ status, sort, search }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const push = (patch) => {
    const next = new URLSearchParams(params.toString());
    for (const [key, value] of Object.entries(patch)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    router.push(next.size ? `${pathname}?${next}` : pathname);
  };

  return (
    <form
      className={c.queueFilters}
      action={(formData) => push({ q: String(formData.get('q') ?? '').trim() })}
    >
      <div className={c.queueSearch}>
        <Input name="q" defaultValue={search} placeholder="Search ref, name or phone" iconLeft={<Icon name="search" size={16} />} />
      </div>
      <div className={c.queueSelect}>
        <Select name="status" value={status} onChange={(e) => push({ status: e.target.value })} options={STATUS_OPTIONS} />
      </div>
      <div className={c.queueSelect}>
        <Select name="sort" value={sort} onChange={(e) => push({ sort: e.target.value })} options={SORT_OPTIONS} />
      </div>
      <Button type="submit" variant="outline">Search</Button>
      {search ? <Button type="button" variant="ghost" onClick={() => push({ q: '' })}>Clear</Button> : null}
    </form>
  );
}
