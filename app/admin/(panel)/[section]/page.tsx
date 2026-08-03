import { notFound } from 'next/navigation';
import { Panel } from '@/components/admin/chrome.jsx';
import { NAV_GROUPS } from '@/components/admin/nav.js';
import { requireStaff } from '@/lib/staff';

// The sidebar lists every section in the brief, but only some are built. Rather than let a
// nav item 404, an unbuilt one says so — the same choice the design system's admin kit made
// for sections it had no design for.
//
// Each section gets a real page as its milestone lands, which takes precedence over this
// catch-all automatically.
const SECTIONS = new Map(
  NAV_GROUPS.flatMap((group) => group.items).map((item) => [item.href.replace('/admin/', ''), item]),
);

const MILESTONE: Record<string, string> = {
  requests: 'M1.5 — the request queue, with age and the two-working-hour SLA',
  bookings: 'M3.x — bookings arrive with instant booking and payments',
  services: 'M4.x — the service catalogue editor',
  customers: 'M2.x — customer accounts',
  payments: 'M3.5 — SSLCommerz',
  reports: 'Phase 4',
  offers: 'Phase 4',
  banners: 'Phase 4',
  blog: 'Phase 4',
  staff: 'Phase 4 — staff management',
};

export default async function AdminSectionPage(props: PageProps<'/admin/[section]'>) {
  await requireStaff();
  const { section } = await props.params;

  const item = SECTIONS.get(section);
  if (!item) notFound();

  return (
    <Panel title={item.label}>
      <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
        Not built yet. {MILESTONE[section] ?? 'See docs/MILESTONES.md'}.
      </p>
      <p style={{ margin: '10px 0 0', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 'var(--leading-relaxed)' }}>
        M1.4 delivered the shell, the staff sign-in and the route guard. Nothing has been
        invented for the screens behind these links.
      </p>
    </Panel>
  );
}
