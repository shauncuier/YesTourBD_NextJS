'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { trackingCookieName, verifyTrackingToken } from '@/lib/tracking';

export type DecisionState = { status: 'idle' } | { status: 'error'; message: string };

/**
 * The customer's own actions on a quotation. Every one re-checks the tracking cookie: the
 * page having rendered is not authorisation, and a form post can arrive from anywhere.
 */
async function authorised(ref: string): Promise<boolean> {
  const store = await cookies();
  return verifyTrackingToken(ref, store.get(trackingCookieName(ref))?.value);
}

export async function acceptQuotation(
  _previous: DecisionState,
  formData: FormData,
): Promise<DecisionState> {
  const ref = String(formData.get('ref') ?? '');
  if (!(await authorised(ref))) return { status: 'error', message: 'Look up your request again to continue.' };

  const request = await prisma.quoteRequest.findUnique({
    where: { ref },
    select: { id: true, status: true, name: true, quotations: { where: { status: 'sent' }, orderBy: { createdAt: 'desc' }, take: 1 } },
  });
  const quotation = request?.quotations[0];
  if (!request || !quotation) return { status: 'error', message: 'There is no quotation waiting on this request.' };

  if (new Date(quotation.validUntil).getTime() < Date.now() - 24 * 60 * 60 * 1000) {
    return { status: 'error', message: 'That quotation has expired. Ask us and we will re-quote it.' };
  }

  await prisma.$transaction([
    prisma.quotation.update({
      where: { id: quotation.id },
      data: { status: 'accepted', acceptedAt: new Date() },
    }),
    prisma.quoteRequest.update({ where: { id: request.id }, data: { status: 'accepted' } }),
    prisma.quoteRequestEvent.create({
      data: {
        requestId: request.id,
        type: 'status_changed',
        // No staff actor: the customer did this, and the history should say so rather than
        // silently crediting whoever happened to be signed in.
        actorName: `${request.name} (customer)`,
        fromStatus: request.status,
        toStatus: 'accepted',
        body: 'Customer accepted the quotation from the tracking page.',
      },
    }),
  ]);

  revalidatePath(`/track/${ref}`);
  revalidatePath(`/admin/requests/${ref}`);
  revalidatePath('/admin/requests');
  return { status: 'idle' };
}

/** Not a rejection — a request for changes, which is how most of these actually go. */
export async function requestChanges(
  _previous: DecisionState,
  formData: FormData,
): Promise<DecisionState> {
  const ref = String(formData.get('ref') ?? '');
  if (!(await authorised(ref))) return { status: 'error', message: 'Look up your request again to continue.' };

  const message = String(formData.get('message') ?? '').trim().slice(0, 2000);
  if (!message) return { status: 'error', message: 'Tell us what you would like changed.' };

  const request = await prisma.quoteRequest.findUnique({ where: { ref }, select: { id: true, status: true, name: true } });
  if (!request) return { status: 'error', message: 'That request no longer exists.' };

  const moves = request.status === 'quoted';

  await prisma.$transaction([
    ...(moves
      ? [prisma.quoteRequest.update({ where: { id: request.id }, data: { status: 'negotiating' } })]
      : []),
    prisma.quoteRequestEvent.create({
      data: {
        requestId: request.id,
        type: moves ? 'status_changed' : 'note',
        actorName: `${request.name} (customer)`,
        fromStatus: moves ? request.status : null,
        toStatus: moves ? 'negotiating' : null,
        body: message,
      },
    }),
  ]);

  revalidatePath(`/track/${ref}`);
  revalidatePath(`/admin/requests/${ref}`);
  revalidatePath('/admin/requests');
  return { status: 'idle' };
}
