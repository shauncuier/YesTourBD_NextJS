'use server';

import { headers } from 'next/headers';
import { prisma } from '@/lib/db';
import { parseQuoteRequest, type FieldErrors } from '@/lib/quote-requests';
import { checkQuoteRequestRate, clientIpFrom, hashIp } from '@/lib/rate-limit';
import { deskAddresses, sendEmail } from '@/lib/email/send';
import { quoteRequestInternal, quoteRequestReceived } from '@/lib/email/templates';
import { siteUrl } from '@/lib/site-url';

export type QuoteRequestState =
  | { status: 'idle' }
  | { status: 'sent'; ref: string }
  | { status: 'invalid'; errors: FieldErrors }
  | { status: 'error'; message: string };

export async function submitQuoteRequest(
  _previous: QuoteRequestState,
  formData: FormData,
): Promise<QuoteRequestState> {
  const parsed = parseQuoteRequest(formData);
  if (!parsed.ok) return { status: 'invalid', errors: parsed.errors };

  const { consent, startDate, ...input } = parsed.data;
  // The tick is required to submit but is not stored: the row's existence is the record of it.
  void consent;

  // `headers()` is a Promise in Next 16 — synchronous access was removed.
  const ip = clientIpFrom(await headers());
  const ipHash = ip ? hashIp(ip) : null;

  const verdict = await checkQuoteRequestRate({ ipHash, phone: input.phone });
  if (!verdict.allowed) return { status: 'error', message: verdict.reason };

  try {
    // `ref` is left to the database: a sequence default cannot collide the way a
    // generate-then-insert in application code can.
    const created = await prisma.quoteRequest.create({
      data: {
        ...input,
        startDate: startDate ? new Date(startDate) : null,
        ipHash,
      },
      select: { ref: true },
    });

    // Mail goes out after the row is safely written, and its failure is never the
    // customer's problem — sendEmail records the attempt and swallows the error.
    await Promise.all([
      sendEmail({
        to: input.email,
        contextRef: created.ref,
        template: quoteRequestReceived({
          ref: created.ref,
          name: input.name,
          destinations: input.destinations,
          contactPref: input.contactPref,
          trackUrl: `${siteUrl()}/track`,
        }),
      }),
      sendEmail({
        to: deskAddresses(),
        contextRef: created.ref,
        template: quoteRequestInternal({
          ref: created.ref,
          name: input.name,
          phone: input.phone,
          email: input.email ?? null,
          requestType: input.requestType,
          destinations: input.destinations,
          paxBand: input.paxBand,
          notes: input.notes ?? null,
          queueUrl: `${siteUrl()}/admin/requests/${created.ref}`,
        }),
      }),
    ]);

    return { status: 'sent', ref: created.ref };
  } catch (error) {
    console.error('quote request failed', error);
    return {
      status: 'error',
      message: 'Something broke on our side. Please call us — the number is in the sidebar.',
    };
  }
}
