import { Badge } from '@/components/index.js';
import { Panel, StatCard } from '@/components/admin/chrome.jsx';
import { QueueFilters } from '@/components/admin/QueueFilters.jsx';
import { QueueTable } from '@/components/admin/QueueTable.jsx';
import { listQuoteRequests, parseQueueFilters, queueCounts } from '@/lib/quote-queue';
import { formatDuration } from '@/lib/sla';
import { requireStaff } from '@/lib/staff';

// The queue the two-working-hour promise is enforced from. Always fresh: a coordinator
// refreshing to see whether anything new came in must not be served a cached page.
export const dynamic = 'force-dynamic';

export default async function AdminRequestsPage(props: PageProps<'/admin/requests'>) {
  await requireStaff();

  const filters = parseQueueFilters(await props.searchParams);
  const now = new Date();
  const [{ rows, total, overdue }, counts] = await Promise.all([
    listQuoteRequests(filters, { now }),
    queueCounts(now),
  ]);

  const tableRows = rows.map((row) => ({
    id: row.id,
    ref: row.ref,
    name: row.name,
    phone: row.phone,
    requestType: row.requestType,
    paxBand: row.paxBand,
    destinations: row.destinations,
    startDate: row.startDate ? row.startDate.toISOString() : null,
    nights: row.nights,
    status: row.status,
    waiting: formatDuration(row.sla.workingMinutes),
    overdue: row.sla.overdue,
  }));

  return (
    <>
      <div style={{ display: 'grid', gap: 'var(--space-4)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))' }}>
        <StatCard icon="message-square-quote" label="Open requests" value={counts.open} />
        <StatCard icon="clock" label="Past the 2-hour reply" value={counts.overdue} tone={counts.overdue ? 'gold' : 'navy'} />
        <StatCard icon="ticket" label="All time" value={counts.all} tone="navy" />
      </div>

      <QueueFilters status={filters.status} sort={filters.sort} search={filters.search} />

      <Panel
        title={`${total} ${total === 1 ? 'request' : 'requests'}`}
        padding="0"
        action={overdue ? <Badge tone="danger" dot>{overdue} overdue</Badge> : null}
      >
        <QueueTable rows={tableRows} />
      </Panel>

      <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 'var(--leading-relaxed)' }}>
        Waiting time counts desk hours only — 9 AM to 10 PM, seven days. A request that arrives
        at 21:50 is not overdue at 09:00 the next morning. Opening a request, assigning it and
        sending a quotation are M1.6.
      </p>
    </>
  );
}
