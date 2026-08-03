import { Panel } from '@/components/admin/chrome.jsx';
import { prisma } from '@/lib/db';
import { requireStaff } from '@/lib/staff';

// M1.4 delivers the shell and the guard. The dashboard itself — KPI cards, revenue chart,
// latest bookings — is M1.5, and the design for it is in the design system's
// ui_kits/admin/DashboardScreen.jsx. Until then this shows the one number that is real.
export default async function AdminDashboardPage() {
  const staff = await requireStaff();
  const openRequests = await prisma.quoteRequest.count({ where: { status: 'submitted' } });

  return (
    <>
      <Panel title="Signed in">
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
          {staff.name ?? staff.email} · {staff.role}
        </div>
      </Panel>

      <Panel title="Quote requests">
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 'var(--weight-bold)', color: 'var(--navy-900)', lineHeight: 1 }}>{openRequests}</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>awaiting a first reply</span>
        </div>
        <p style={{ margin: '12px 0 0', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 'var(--leading-relaxed)' }}>
          The queue that works this list is M1.5; the pipeline board and quotation builder follow it.
        </p>
      </Panel>
    </>
  );
}
