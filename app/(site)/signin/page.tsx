import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { SignInScreen } from '@/components/screens/SignInScreen.jsx';
import { auth } from '@/auth';
import { requestCode, verifyCode } from './actions';

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in with your mobile number. We send a six-digit code; there is no password.',
  // A sign-in form is not a search result. It also takes a `?next=` parameter, which would
  // otherwise put a page in the index for every destination anyone ever linked to.
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function SignInPage(props: PageProps<'/signin'>) {
  const session = await auth();
  const { next } = await props.searchParams;
  const destination = typeof next === 'string' && next.startsWith('/') && !next.startsWith('//') ? next : '/account';

  if (session?.user) redirect(destination);

  return <SignInScreen requestAction={requestCode} verifyAction={verifyCode} next={destination} />;
}
