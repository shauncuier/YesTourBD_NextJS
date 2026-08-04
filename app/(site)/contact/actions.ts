'use server';

import { headers } from 'next/headers';
import { prisma } from '@/lib/db';
import { checkQuoteRequestRate, clientIpFrom, hashIp } from '@/lib/rate-limit';
import { deskAddresses, sendEmail } from '@/lib/email/send';
import { quoteRequestInternal, quoteRequestReceived } from '@/lib/email/templates';
import { siteUrl } from '@/lib/site-url';
import { parseSupportMessage, supportNote, type SupportFieldErrors } from '@/lib/support';

/**
 * `values` carries the submission back to the form on a failure. React 19 resets an
 * uncontrolled form once its action returns, so without this a customer who mistypes their
 * phone number loses the message they just wrote — on a phone, that is the end of the
 * enquiry.
 */
export type SupportValues = Record<'name' | 'phone' | 'email' | 'topic' | 'ref' | 'message', string>;

export type SupportState =
  | { status: 'idle' }
  | { status: 'sent'; ref: string }
  | { status: 'invalid'; errors: SupportFieldErrors; values: SupportValues }
  | { status: 'error'; message: string; values: SupportValues };

/**
 * A support enquiry becomes a request in the same queue as everything else. It gets a
 * reference, the two-working-hour clock, the audit trail and the assignment — none of which
 * a separate contact inbox would have.
 */
export async function submitSupportMessage(
  _previous: SupportState,
  formData: FormData,
): Promise<SupportState> {
  const submitted: SupportValues = {
    name: String(formData.get('name') ?? ''),
    phone: String(formData.get('phone') ?? ''),
    email: String(formData.get('email') ?? ''),
    topic: String(formData.get('topic') ?? ''),
    ref: String(formData.get('ref') ?? ''),
    message: String(formData.get('message') ?? ''),
  };

  const parsed = parseSupportMessage(formData);
  if (!parsed.ok) return { status: 'invalid', errors: parsed.errors, values: submitted };

  const input = parsed.data;

  const ip = clientIpFrom(await headers());
  const ipHash = ip ? hashIp(ip) : null;

  // Same limiter as the quote form: this is the same table and the same abuse.
  const verdict = await checkQuoteRequestRate({ ipHash, phone: input.phone });
  if (!verdict.allowed) return { status: 'error', message: verdict.reason, values: submitted };

  try {
    const created = await prisma.quoteRequest.create({
      data: {
        requestType: 'support',
        // No destination or traveller count: this is a question, not a trip.
        notes: supportNote(input),
        name: input.name,
        phone: input.phone,
        email: input.email ?? null,
        contactPref: input.email ? 'email' : 'whatsapp',
        ipHash,
      },
      select: { ref: true },
    });

    await Promise.all([
      sendEmail({
        to: input.email,
        contextRef: created.ref,
        template: quoteRequestReceived({
          ref: created.ref,
          name: input.name,
          destinations: 'your message',
          contactPref: input.email ? 'email' : 'whatsapp',
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
          requestType: 'support',
          destinations: '—',
          paxBand: '—',
          notes: supportNote(input),
          queueUrl: `${siteUrl()}/admin/requests/${created.ref}`,
        }),
      }),
    ]);

    return { status: 'sent', ref: created.ref };
  } catch (error) {
    console.error('support message failed', error);
    return { status: 'error', message: 'That did not send. Please call us — the number is above.', values: submitted };
  }
}
