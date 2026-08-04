import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { TrackStatus } from '@/components/screens/TrackStatus.jsx';
import { prisma } from '@/lib/db';
import { formatTaka } from '@/lib/quotation';
import { customerStatus, trackingCookieName, verifyTrackingToken } from '@/lib/tracking';
import { acceptQuotation, requestChanges } from './actions';

export const metadata: Metadata = {
  title: 'Your request',
  robots: { index: false, follow: false },
};

// Somebody else's trip and prices; never cached, never prerendered.
export const dynamic = 'force-dynamic';

type QuotationLine = { description: string; quantity: number; unitPrice: number; amount: number };

const dhakaDate = (value: Date) =>
  value.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Dhaka' });

export default async function TrackStatusPage(props: PageProps<'/track/[ref]'>) {
  const { ref: rawRef } = await props.params;
  const ref = decodeURIComponent(rawRef);

  // The cookie is the whole authorisation. Anyone reaching this URL without one goes back to
  // the lookup, which needs the reference and the matching mobile.
  const store = await cookies();
  if (!verifyTrackingToken(ref, store.get(trackingCookieName(ref))?.value)) redirect('/track');

  const request = await prisma.quoteRequest.findUnique({
    where: { ref },
    select: {
      ref: true, destinations: true, paxBand: true, status: true, createdAt: true,
      quotations: { where: { status: { in: ['sent', 'accepted'] } }, orderBy: { createdAt: 'desc' }, take: 1 },
    },
  });
  if (!request) redirect('/track');

  const status = customerStatus(request.status);
  const latest = request.quotations[0];

  const quotation = latest
    ? {
        status: latest.status,
        lines: (latest.lineItems as unknown as QuotationLine[]).map((line) => ({
          description: line.description,
          quantity: line.quantity,
          unitPriceLabel: formatTaka(line.unitPrice),
          amountLabel: formatTaka(line.amount),
        })),
        discountLabel: latest.discount ? formatTaka(latest.discount) : null,
        totalLabel: formatTaka(latest.total),
        depositPercent: latest.depositPercent,
        depositLabel: formatTaka(latest.depositAmount),
        balanceLabel: formatTaka(latest.total - latest.depositAmount),
        validUntil: dhakaDate(latest.validUntil),
        notes: latest.notes,
      }
    : null;

  return (
    <TrackStatus
      request={{
        ref: request.ref,
        destinations: request.destinations,
        paxBand: request.paxBand,
        submitted: dhakaDate(request.createdAt),
        statusLabel: status.label,
        statusBlurb: status.blurb,
      }}
      quotation={quotation}
      acceptAction={acceptQuotation}
      changesAction={requestChanges}
    />
  );
}
