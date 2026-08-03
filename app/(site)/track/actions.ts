'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { clientIpFrom, hashIp } from '@/lib/rate-limit';
import { issueTrackingToken, normalisePhone, trackingCookieName } from '@/lib/tracking';

export type LookupState = { status: 'idle' } | { status: 'error'; message: string };

const WINDOW_MINUTES = 15;
const MAX_ATTEMPTS = 10;

/**
 * Reference plus the mobile it was submitted with. Both must match, and the reply is the
 * same either way — telling a stranger that REQ-2262 exists but the number is wrong is
 * telling them which references are real.
 */
export async function lookupRequest(_previous: LookupState, formData: FormData): Promise<LookupState> {
  const ref = String(formData.get('ref') ?? '').trim().toUpperCase();
  const phone = normalisePhone(String(formData.get('phone') ?? ''));

  const wrong: LookupState = {
    status: 'error',
    message: 'No request matches that reference and mobile number.',
  };

  if (!ref || !phone) return wrong;

  // References are sequential, so a lookup form is a guessing machine unless it is slowed
  // down. Attempts are counted per IP, not per reference.
  const ip = clientIpFrom(await headers());
  const ipHash = ip ? hashIp(ip) : null;
  if (ipHash) {
    const since = new Date(Date.now() - WINDOW_MINUTES * 60_000);
    const attempts = await prisma.trackingAttempt.count({ where: { ipHash, createdAt: { gte: since } } });
    if (attempts >= MAX_ATTEMPTS) {
      return { status: 'error', message: 'Too many attempts. Wait a few minutes, or call us.' };
    }
    await prisma.trackingAttempt.create({ data: { ipHash, ref } });
  }

  const request = await prisma.quoteRequest.findUnique({ where: { ref }, select: { ref: true, phone: true } });
  if (!request || request.phone !== phone) return wrong;

  const store = await cookies();
  store.set(trackingCookieName(request.ref), issueTrackingToken(request.ref), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/track',
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect(`/track/${request.ref}`);
}
