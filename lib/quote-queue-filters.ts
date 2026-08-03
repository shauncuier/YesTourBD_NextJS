// Pure, import-free: the page, the query and the tests all need these, and only the query
// may pull in the database client.

export const QUEUE_STATUSES = [
  'submitted',
  'reviewing',
  'quoted',
  'negotiating',
  'accepted',
  'booked',
  'expired',
  'lost',
] as const;
export type QueueStatus = (typeof QUEUE_STATUSES)[number];

/** Anything a coordinator still has work to do on. */
export const OPEN_STATUSES: QueueStatus[] = ['submitted', 'reviewing', 'quoted', 'negotiating'];

export const SORTS = {
  oldest: 'Oldest first',
  newest: 'Newest first',
} as const;
export type QueueSort = keyof typeof SORTS;

export type QueueFilters = {
  /** 'all', 'open' (anything still needing work), or one status. */
  status: 'all' | 'open' | QueueStatus;
  search: string;
  sort: QueueSort;
};

/** URL params are user input; anything unrecognised falls back rather than throwing. */
export function parseQueueFilters(
  params: Record<string, string | string[] | undefined>,
): QueueFilters {
  const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

  const rawStatus = first(params.status);
  const status =
    rawStatus === 'all' || rawStatus === 'open' || QUEUE_STATUSES.includes(rawStatus as QueueStatus)
      ? (rawStatus as QueueFilters['status'])
      : 'open';

  const rawSort = first(params.sort);
  const sort: QueueSort = rawSort === 'newest' ? 'newest' : 'oldest';

  return { status, search: (first(params.q) ?? '').trim().slice(0, 80), sort };
}
