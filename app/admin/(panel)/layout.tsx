import type { Metadata } from 'next';
import { AdminShell } from '@/components/admin/AdminShell.jsx';
import { signOutStaff } from '../login/actions';
import { requireStaff, initialsOf } from '@/lib/staff';

export const metadata: Metadata = {
  title: 'Admin — YesTourBD',
  robots: { index: false, follow: false },
};

// Every /admin page renders inside this, so the guard runs before any of them. Pages still
// call requireStaff() themselves — see lib/staff.ts.
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const staff = await requireStaff();

  return (
    <AdminShell
      staff={{ name: staff.name ?? staff.email ?? 'Staff', role: staff.role, initials: initialsOf(staff.name) }}
      signOutAction={signOutStaff}
      title="Admin"
    >
      {children}
    </AdminShell>
  );
}
