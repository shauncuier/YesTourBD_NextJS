'use server';

import { headers } from 'next/headers';
import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/auth';
import { requestOtp } from '@/lib/otp';
import { clientIpFrom, hashIp } from '@/lib/rate-limit';
import { normalisePhone } from '@/lib/tracking';

export type SignInState =
  | { status: 'phone' }
  | { status: 'code'; phone: string; note?: string }
  | { status: 'error'; message: string; phone?: string };

const BD_MOBILE = /^01[3-9]\d{8}$/;

/** Step one: prove you can receive SMS at this number. */
export async function requestCode(_previous: SignInState, formData: FormData): Promise<SignInState> {
  const phone = normalisePhone(String(formData.get('phone') ?? ''));
  if (!BD_MOBILE.test(phone)) {
    return { status: 'error', message: 'Enter a Bangladeshi mobile number, e.g. 01712-345678.' };
  }

  const ip = clientIpFrom(await headers());
  const result = await requestOtp({ phone, ipHash: ip ? hashIp(ip) : null });

  if (!result.sent) return { status: 'error', message: result.reason, phone };

  return { status: 'code', phone, note: 'We sent a six-digit code. It expires in five minutes.' };
}

/** Step two: the code. Auth.js does the verifying through the phone-otp provider. */
export async function verifyCode(_previous: SignInState, formData: FormData): Promise<SignInState> {
  const phone = normalisePhone(String(formData.get('phone') ?? ''));
  const code = String(formData.get('code') ?? '').trim();
  const next = String(formData.get('next') ?? '/account');

  try {
    await signIn('phone-otp', {
      phone,
      code,
      redirectTo: next.startsWith('/') && !next.startsWith('//') ? next : '/account',
    });
    return { status: 'code', phone };
  } catch (error) {
    // A successful sign-in reports itself by throwing NEXT_REDIRECT.
    if (error instanceof AuthError) {
      return {
        status: 'error',
        message: 'That code is wrong or has expired. Ask for a new one.',
        phone,
      };
    }
    throw error;
  }
}

export async function signOutCustomer() {
  await signOut({ redirectTo: '/' });
}
