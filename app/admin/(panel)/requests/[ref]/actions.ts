'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { getStaff } from '@/lib/staff';
import { checkTransition, isRequestStatus } from '@/lib/request-pipeline';

export type RequestActionState = { status: 'idle' } | { status: 'error'; message: string };

const NOT_STAFF = { status: 'error', message: 'Your session has expired. Sign in again.' } as const;

/**
 * Moves a request along the pipeline and records who moved it.
 *
 * The status write and its history row go in one transaction: a status that changed with no
 * event explaining it is worse than no audit trail at all, because it looks complete.
 */
export async function changeStatus(
  _previous: RequestActionState,
  formData: FormData,
): Promise<RequestActionState> {
  const staff = await getStaff();
  if (!staff) return NOT_STAFF;

  const ref = String(formData.get('ref') ?? '');
  const to = formData.get('to');
  const note = String(formData.get('note') ?? '').trim().slice(0, 2000);

  if (!isRequestStatus(to)) return { status: 'error', message: 'That is not a status.' };

  const request = await prisma.quoteRequest.findUnique({ where: { ref }, select: { id: true, status: true } });
  if (!request) return { status: 'error', message: 'That request no longer exists.' };

  const verdict = checkTransition(request.status, to);
  if (!verdict.ok) return { status: 'error', message: verdict.reason };

  await prisma.$transaction([
    prisma.quoteRequest.update({ where: { id: request.id }, data: { status: to } }),
    prisma.quoteRequestEvent.create({
      data: {
        requestId: request.id,
        type: 'status_changed',
        actorId: staff.id,
        actorName: staff.name ?? staff.email ?? 'Staff',
        fromStatus: request.status,
        toStatus: to,
        body: note || null,
      },
    }),
  ]);

  revalidatePath(`/admin/requests/${ref}`);
  revalidatePath('/admin/requests');
  return { status: 'idle' };
}

export async function addNote(
  _previous: RequestActionState,
  formData: FormData,
): Promise<RequestActionState> {
  const staff = await getStaff();
  if (!staff) return NOT_STAFF;

  const ref = String(formData.get('ref') ?? '');
  const body = String(formData.get('body') ?? '').trim().slice(0, 2000);
  if (!body) return { status: 'error', message: 'Write something first.' };

  const request = await prisma.quoteRequest.findUnique({ where: { ref }, select: { id: true } });
  if (!request) return { status: 'error', message: 'That request no longer exists.' };

  await prisma.quoteRequestEvent.create({
    data: {
      requestId: request.id,
      type: 'note',
      actorId: staff.id,
      actorName: staff.name ?? staff.email ?? 'Staff',
      body,
    },
  });

  revalidatePath(`/admin/requests/${ref}`);
  return { status: 'idle' };
}

/** Claim a request, or hand it back to the unassigned pile. */
export async function toggleAssignment(
  _previous: RequestActionState,
  formData: FormData,
): Promise<RequestActionState> {
  const staff = await getStaff();
  if (!staff) return NOT_STAFF;

  const ref = String(formData.get('ref') ?? '');
  const release = formData.get('release') === 'true';

  const request = await prisma.quoteRequest.findUnique({
    where: { ref },
    select: { id: true, assignedToId: true },
  });
  if (!request) return { status: 'error', message: 'That request no longer exists.' };

  const assignedToId = release ? null : staff.id;
  if (assignedToId === request.assignedToId) return { status: 'idle' };

  await prisma.$transaction([
    prisma.quoteRequest.update({ where: { id: request.id }, data: { assignedToId } }),
    prisma.quoteRequestEvent.create({
      data: {
        requestId: request.id,
        type: 'assigned',
        actorId: staff.id,
        actorName: staff.name ?? staff.email ?? 'Staff',
        body: release ? 'Released the request' : 'Claimed the request',
      },
    }),
  ]);

  revalidatePath(`/admin/requests/${ref}`);
  revalidatePath('/admin/requests');
  return { status: 'idle' };
}
