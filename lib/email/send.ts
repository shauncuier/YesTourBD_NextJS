import { liveSendingAllowed } from '../deployment';
import { prisma } from '../db';
import type { EmailTemplate } from './templates';

// One seam between the app and whichever provider gets chosen (M1.3's open question). Until
// there is one, mail is written to the database and logged — so the copy, the triggering and
// the audit trail are all real and testable now, and picking Resend or Postmark later is a
// new branch in `deliver()` rather than a change anywhere else.
//
// Nothing here is allowed to throw into the caller. A customer's request must not fail
// because a mail server was down; a failed message is recorded as failed and retried later.

export type Transport = 'console' | 'resend';

/**
 * The provider is used by the production deployment once a key exists, and by nothing else.
 * A preview deploy carries `NODE_ENV=production` while being precisely where a test request
 * gets filed against a made-up address, and mail sent from one reaches a real inbox and a
 * real spam reputation. `EMAIL_LIVE` overrides it either way; see lib/deployment.ts.
 */
function activeTransport(): Transport {
  if (!process.env.RESEND_API_KEY) return 'console';
  return liveSendingAllowed(process.env.EMAIL_LIVE) ? 'resend' : 'console';
}

// A provider that accepts the connection and then stalls would hold the request open until
// the platform kills it. Mail is sent after the row is committed, so a timeout costs the
// message, never the customer's request.
const SEND_TIMEOUT_MS = 10_000;

async function deliver(transport: Transport, message: { to: string; subject: string; body: string }) {
  if (transport === 'resend') {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM ?? 'YesTourBD <no-reply@yestourbd.com>',
        to: message.to,
        subject: message.subject,
        text: message.body,
      }),
      signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
    });

    if (!response.ok) {
      throw new Error(`Resend refused it: ${response.status} ${await response.text()}`);
    }
    return;
  }

  // Console transport: the message is already saved, so this is only for the developer
  // watching the terminal.
  console.log(`\n[email → ${message.to}] ${message.subject}\n${message.body}\n`);
}

export async function sendEmail(params: {
  to: string | null | undefined;
  template: EmailTemplate;
  contextRef?: string;
}): Promise<{ sent: boolean; reason?: string }> {
  // A customer who gave no email address is not an error — email is optional on the form.
  if (!params.to) return { sent: false, reason: 'no address' };

  const transport = activeTransport();

  try {
    const record = await prisma.emailMessage.create({
      data: {
        to: params.to,
        subject: params.template.subject,
        body: params.template.body,
        template: params.template.template,
        contextRef: params.contextRef ?? null,
        transport,
      },
      select: { id: true },
    });

    try {
      await deliver(transport, { to: params.to, subject: params.template.subject, body: params.template.body });
      await prisma.emailMessage.update({
        where: { id: record.id },
        data: { status: 'sent', sentAt: new Date() },
      });
      return { sent: true };
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      await prisma.emailMessage.update({ where: { id: record.id }, data: { status: 'failed', error: reason } });
      console.error(`[email] ${params.template.template} to ${params.to} failed: ${reason}`);
      return { sent: false, reason };
    }
  } catch (error) {
    // Even the bookkeeping failed. Log it and let the caller carry on regardless.
    console.error('[email] could not record the message', error);
    return { sent: false, reason: 'not recorded' };
  }
}

/** Where internal notifications go. Several addresses may be comma-separated. */
export function deskAddresses(): string | null {
  const raw = process.env.DESK_EMAIL?.trim();
  return raw ? raw : null;
}
