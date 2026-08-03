'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { auth } from '@/auth';
import { prisma } from '@/lib/db';
import { encryptField, encryptionAvailable } from '@/lib/field-crypto';

export type ProfileState =
  | { status: 'idle' }
  | { status: 'saved' }
  | { status: 'invalid'; errors: Record<string, string> }
  | { status: 'error'; message: string };

const profileSchema = z.object({
  name: z.string().trim().min(2, 'We need a name to put on your bookings').max(120),
  email: z
    .string()
    .trim()
    .transform((value) => (value === '' ? undefined : value))
    .optional()
    .pipe(z.email('Check the email address').optional()),
  // Deliberately loose: NID is 10, 13 or 17 digits, passports vary by country, and rejecting
  // a real document because the format surprised us is worse than storing an odd string.
  nidPassport: z
    .string()
    .trim()
    .max(40, 'That is longer than any document number')
    .transform((value) => (value === '' ? undefined : value))
    .optional(),
});

export async function saveProfile(_previous: ProfileState, formData: FormData): Promise<ProfileState> {
  const session = await auth();
  if (!session?.user) return { status: 'error', message: 'Your session has expired. Sign in again.' };

  const parsed = profileSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    nidPassport: formData.get('nidPassport'),
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0] ?? '');
      if (field && !errors[field]) errors[field] = issue.message;
    }
    return { status: 'invalid', errors };
  }

  const { name, email, nidPassport } = parsed.data;

  // Refuse rather than quietly storing an identity document in clear. A missing key is a
  // deployment mistake, and the only safe way to surface it is to fail the save.
  if (nidPassport && !encryptionAvailable()) {
    return {
      status: 'error',
      message: 'We cannot store identity documents right now. Everything else was saved.',
    };
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        email: email ?? null,
        // Absent means "leave what is there"; the form sends the field only when it changed.
        ...(nidPassport === undefined ? {} : { nidPassport: encryptField(nidPassport) }),
        notifyBookingUpdates: formData.get('notifyBookingUpdates') === 'on',
        notifyOffers: formData.get('notifyOffers') === 'on',
        notifyNewsletter: formData.get('notifyNewsletter') === 'on',
      },
    });
  } catch (error) {
    // Never log the payload: it carries the document number.
    console.error('profile save failed', error instanceof Error ? error.message : 'unknown error');

    // A duplicate email is the one failure a customer can act on.
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return { status: 'invalid', errors: { email: 'That email is already on another account.' } };
    }
    return { status: 'error', message: 'That did not save. Try again in a moment.' };
  }

  revalidatePath('/account');
  return { status: 'saved' };
}
