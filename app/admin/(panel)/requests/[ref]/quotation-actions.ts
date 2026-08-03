'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { getStaff } from '@/lib/staff';
import { canTransition, type RequestStatus } from '@/lib/request-pipeline';
import {
  MAX_LINE_ITEMS,
  totalsFor,
  validateQuotation,
  type LineItemInput,
} from '@/lib/quotation';

export type QuotationState =
  | { status: 'idle' }
  | { status: 'sent'; total: number }
  | { status: 'invalid'; problems: { field: string; message: string }[] }
  | { status: 'error'; message: string };

/** Line items arrive as parallel arrays from the repeated form rows. */
function readLines(formData: FormData): LineItemInput[] {
  const descriptions = formData.getAll('lineDescription').map(String);
  const quantities = formData.getAll('lineQuantity').map(String);
  const prices = formData.getAll('lineUnitPrice').map(String);

  return descriptions.slice(0, MAX_LINE_ITEMS).map((description, index) => ({
    description: description.trim(),
    quantity: Number(quantities[index] ?? 0),
    unitPrice: Number(prices[index] ?? 0),
  }));
}

/**
 * Writes a quotation and sends it. "Sending" is currently the record of it — the customer
 * email and WhatsApp message are M1.3, which needs a provider. The row, the status move and
 * the history entry are all real, so nothing has to be redone when the transport lands.
 */
export async function sendQuotation(
  _previous: QuotationState,
  formData: FormData,
): Promise<QuotationState> {
  const staff = await getStaff();
  if (!staff) return { status: 'error', message: 'Your session has expired. Sign in again.' };

  const ref = String(formData.get('ref') ?? '');
  const draft = {
    lines: readLines(formData),
    discount: Number(formData.get('discount') ?? 0),
    depositPercent: Number(formData.get('depositPercent') ?? 30),
    validUntil: String(formData.get('validUntil') ?? ''),
    notes: String(formData.get('notes') ?? '').trim().slice(0, 2000),
  };

  const problems = validateQuotation(draft);
  if (problems.length) return { status: 'invalid', problems };

  const request = await prisma.quoteRequest.findUnique({
    where: { ref },
    select: { id: true, status: true },
  });
  if (!request) return { status: 'error', message: 'That request no longer exists.' };

  const usableLines = draft.lines.filter((line) => line.description !== '');
  const totals = totalsFor({
    lines: usableLines,
    discount: draft.discount,
    depositPercent: draft.depositPercent,
  });

  const from = request.status as RequestStatus;
  // Sending from `reviewing` or `negotiating` moves the request on; sending a revised price
  // while already `quoted` leaves the status alone but still records a new quotation.
  const moves = canTransition(from, 'quoted');

  await prisma.$transaction([
    // Older quotations are superseded rather than edited: what was sent on which day has to
    // stay answerable.
    prisma.quotation.updateMany({
      where: { requestId: request.id, status: { in: ['draft', 'sent'] } },
      data: { status: 'superseded' },
    }),
    prisma.quotation.create({
      data: {
        requestId: request.id,
        lineItems: totals.lines,
        subtotal: totals.subtotal,
        discount: totals.discount,
        total: totals.total,
        depositPercent: totals.depositPercent,
        depositAmount: totals.depositAmount,
        validUntil: new Date(`${draft.validUntil}T00:00:00+06:00`),
        notes: draft.notes || null,
        status: 'sent',
        sentAt: new Date(),
        createdById: staff.id,
        createdByName: staff.name ?? staff.email ?? 'Staff',
      },
    }),
    ...(moves
      ? [prisma.quoteRequest.update({ where: { id: request.id }, data: { status: 'quoted' } })]
      : []),
    prisma.quoteRequestEvent.create({
      data: {
        requestId: request.id,
        type: 'quotation_sent',
        actorId: staff.id,
        actorName: staff.name ?? staff.email ?? 'Staff',
        fromStatus: moves ? from : null,
        toStatus: moves ? 'quoted' : null,
        body: `Quotation ৳${totals.total.toLocaleString('en-US')} · ${totals.depositPercent}% deposit ৳${totals.depositAmount.toLocaleString('en-US')} · valid to ${draft.validUntil}`,
      },
    }),
  ]);

  revalidatePath(`/admin/requests/${ref}`);
  revalidatePath('/admin/requests');
  return { status: 'sent', total: totals.total };
}
