import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { SignInScreen } from '@/components/screens/SignInScreen.jsx';
import { auth } from '@/auth';
import { requestCode, verifyCode } from './actions';

export const metadata: Metadata = {
  title: 'Sign in — YesTourBD',
  description: 'Sign in with your mobile number. We send a six-digit code; there is no password.',
};

export const dynamic = 'force-dynamic';

export default async function SignInPage(props: PageProps<'/signin'>) {
  const session = await auth();
  const { next } = await props.searchParams;
  const destination = typeof next === 'string' && next.startsWith('/') && !next.startsWith('//') ? next : '/account';

  if (session?.user) redirect(destination);

  return <SignInScreen requestAction={requestCode} verifyAction={verifyCode} next={destination} />;
}
