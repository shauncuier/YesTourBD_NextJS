import { prisma } from './db';
import { slaStateFor, type SlaState } from './sla';
import { OPEN_STATUSES, type QueueFilters } from './quote-queue-filters';

// Reading side of the request pipeline. Filters are driven by the URL so a coordinator can
// bookmark "everything overdue" and share it; parsing them lives in quote-queue-filters.ts,
// which stays free of the database client.
export * from './quote-queue-filters';

export type QueueRow = {
  id: string;
  ref: string;
  name: string;
  phone: string;
  email: string | null;
  requestType: string;
  destinations: string;
  paxBand: string;
  startDate: Date | null;
  nights: number | null;
  status: string;
  createdAt: Date;
  sla: SlaState;
};

export async function listQuoteRequests(
  filters: QueueFilters,
  options: { take?: number; now?: Date } = {},
): Promise<{ rows: QueueRow[]; total: number; overdue: number }> {
  const take = options.take ?? 100;
  const now = options.now ?? new Date();

  const statusWhere =
    filters.status === 'all' ? {} : filters.status === 'open' ? { status: { in: OPEN_STATUSES } } : { status: filters.status };

  // Ref, name and phone are what a coordinator has in front of them when a customer rings.
  // Phone is matched with the separators stripped, because the stored form has none.
  const search = filters.search;
  const searchWhere = search
    ? {
        OR: [
          { ref: { contains: search, mode: 'insensitive' as const } },
          { name: { contains: search, mode: 'insensitive' as const } },
          { phone: { contains: search.replace(/[\s().+-]/g, '') } },
        ],
      }
    : {};

  const where = { ...statusWhere, ...searchWhere };

  const [requests, total] = await Promise.all([
    prisma.quoteRequest.findMany({
      where,
      orderBy: { createdAt: filters.sort === 'newest' ? 'desc' : 'asc' },
      take,
      select: {
        id: true, ref: true, name: true, phone: true, email: true, requestType: true,
        destinations: true, paxBand: true, startDate: true, nights: true, status: true, createdAt: true,
      },
    }),
    prisma.quoteRequest.count({ where }),
  ]);

  const rows: QueueRow[] = requests.map((request) => ({
    ...request,
    sla: slaStateFor({ createdAt: request.createdAt, status: request.status, now }),
  }));

  return { rows, total, overdue: rows.filter((row) => row.sla.overdue).length };
}

/** Counts for the status tabs, so the queue shows what it is hiding. */
export async function queueCounts(now = new Date()) {
  const grouped = await prisma.quoteRequest.groupBy({ by: ['status'], _count: { _all: true } });
  const byStatus = Object.fromEntries(grouped.map((row) => [row.status, row._count._all]));

  const awaiting = await prisma.quoteRequest.findMany({
    where: { status: { in: ['submitted', 'reviewing'] } },
    select: { createdAt: true, status: true },
  });

  return {
    byStatus,
    all: grouped.reduce((sum, row) => sum + row._count._all, 0),
    open: OPEN_STATUSES.reduce((sum, status) => sum + (byStatus[status] ?? 0), 0),
    overdue: awaiting.filter((row) => slaStateFor({ ...row, now }).overdue).length,
  };
}
