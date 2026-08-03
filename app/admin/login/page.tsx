import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/admin/LoginForm.jsx';
import { signInStaff } from './actions';
import { getStaff } from '@/lib/staff';

export const metadata: Metadata = {
  title: 'Staff sign in — YesTourBD',
  robots: { index: false, follow: false },
};

// Outside the (panel) route group, so it does not inherit the guarded layout — otherwise
// signing in would redirect to the page that redirects to signing in.
export default async function AdminLoginPage(props: PageProps<'/admin/login'>) {
  if (await getStaff()) redirect('/admin');

  // searchParams is a Promise in Next 16.
  const { next } = await props.searchParams;
  const destination = typeof next === 'string' && next.startsWith('/admin') ? next : '/admin';

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-6)', background: 'var(--gradient-dusk, var(--navy-900))' }}>
      <LoginForm action={signInStaff} next={destination} />
    </main>
  );
}
