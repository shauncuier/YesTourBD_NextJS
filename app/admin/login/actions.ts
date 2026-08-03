'use server';

import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/auth';

export type SignInState = { status: 'idle' } | { status: 'invalid'; message: string };

/** Only ever redirect back inside /admin, never to a URL the query string supplied. */
function safeDestination(next: FormDataEntryValue | null): string {
  const value = typeof next === 'string' ? next : '';
  return value.startsWith('/admin') && !value.startsWith('/admin/login') ? value : '/admin';
}

export async function signInStaff(
  _previous: SignInState,
  formData: FormData,
): Promise<SignInState> {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: safeDestination(formData.get('next')),
    });
    return { status: 'idle' };
  } catch (error) {
    // A successful sign-in reports itself by throwing NEXT_REDIRECT, so only genuine auth
    // failures are handled here and everything else is rethrown.
    if (error instanceof AuthError) {
      return {
        status: 'invalid',
        // Deliberately vague: naming which half was wrong tells a stranger which staff
        // addresses exist.
        message: 'That email and password do not match a staff account.',
      };
    }
    throw error;
  }
}

export async function signOutStaff() {
  await signOut({ redirectTo: '/admin/login' });
}
