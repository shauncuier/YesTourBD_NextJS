import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { isStaffRole } from './staff-roles';

export type StaffSessionUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  role: string;
};

/**
 * The guard every /admin server component, action and route handler calls first.
 *
 * `proxy.ts` already turns anonymous /admin traffic away, but a proxy is a convenience, not
 * a boundary: it does not run for every invocation path and it cannot see what a handler
 * goes on to do. Each entry point re-checks, so an unguarded one is a missing call rather
 * than a silently public endpoint.
 */
export async function requireStaff(): Promise<StaffSessionUser> {
  const session = await auth();
  const user = session?.user;

  if (!user || !isStaffRole(user.role)) redirect('/admin/login');

  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

/** Same check without the redirect, for handlers that need to answer with a status code. */
export async function getStaff(): Promise<StaffSessionUser | null> {
  const session = await auth();
  const user = session?.user;
  if (!user || !isStaffRole(user.role)) return null;
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

export { initialsOf, isStaffRole } from './staff-roles';
