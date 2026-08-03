import { NextResponse, type NextRequest } from 'next/server';
import { auth } from '@/auth';
import { isStaffRole } from '@/lib/staff-roles';

// Next 16 renamed middleware to proxy; the runtime is nodejs only, so this can use the same
// auth() the pages do. It is the outer turnstile — the real guard is requireStaff() inside
// each /admin entry point (see lib/staff.ts for why both exist).
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/admin/login') return NextResponse.next();

  const session = await auth();
  if (session?.user && isStaffRole(session.user.role)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = '/admin/login';
  url.search = '';
  // Only ever a path from this request, so it cannot be pointed at another origin.
  url.searchParams.set('next', pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/admin/:path*'],
};
