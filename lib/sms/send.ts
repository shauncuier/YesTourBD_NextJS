import { prisma } from '../db';

// The SMS seam, mirroring lib/email/send.ts. No provider is chosen yet (D7), so the default
// transport prints to the terminal — the OTP flow is fully exercisable locally, and picking a
// provider later is a branch in `deliver()`.

export type SmsTransport = 'console' | 'bulksmsbd';

/** The gateway is only used once a key exists; without one, messages print to the terminal. */
function activeTransport(): SmsTransport {
  return process.env.SMS_API_KEY ? 'bulksmsbd' : 'console';
}

const DEFAULT_ENDPOINT = 'https://bulksmsbd.net/api/smsapi';

/**
 * BulkSMSBD answers 200 whatever happened and puts the verdict in the body:
 * `response_code` 202 means accepted, anything else is a failure with a reason (1001 bad
 * number, 1002 wrong sender id, 1007 no balance). Trusting the HTTP status alone would file
 * every one of those as delivered.
 */
function assertAccepted(payload: string) {
  let code: unknown;
  try {
    code = (JSON.parse(payload) as { response_code?: unknown }).response_code;
  } catch {
    // Some errors come back as bare text rather than JSON.
    throw new Error(`SMS gateway said: ${payload.slice(0, 200)}`);
  }
  if (code !== 202) throw new Error(`SMS gateway rejected it (response_code ${String(code)}): ${payload.slice(0, 200)}`);
}

async function deliver(transport: SmsTransport, to: string, body: string) {
  if (transport === 'bulksmsbd') {
    // Endpoint defaults to https: the key travels in the query string, so plain http would
    // put both it and the one-time code on the wire in clear.
    const url = new URL(process.env.SMS_API_URL ?? DEFAULT_ENDPOINT);
    url.searchParams.set('api_key', process.env.SMS_API_KEY as string);
    url.searchParams.set('type', 'text');
    // The gateway wants 8801XXXXXXXXX, while everything else here stores 01XXXXXXXXX.
    url.searchParams.set('number', to.replace(/^0/, '880'));
    url.searchParams.set('senderid', process.env.SMS_SENDER_ID ?? '');
    url.searchParams.set('message', body);

    const response = await fetch(url, { method: 'POST' });
    const payload = await response.text();
    if (!response.ok) throw new Error(`SMS gateway refused it: ${response.status} ${payload.slice(0, 200)}`);
    assertAccepted(payload);
    return;
  }

  console.log(`\n[sms → ${to}] ${body}\n`);
}

export async function sendSms(params: {
  to: string;
  body: string;
  template: string;
}): Promise<{ sent: boolean; reason?: string }> {
  const transport = activeTransport();

  // An OTP in a database row is a working credential sitting in plain sight. It is kept only
  // for the console transport, where it is already on the developer's screen and there is no
  // other way to read the code locally; with a real gateway the body is redacted.
  const storedBody = transport === 'console' ? params.body : `[redacted ${params.template}]`;

  try {
    const record = await prisma.smsMessage.create({
      data: { to: params.to, body: storedBody, template: params.template, transport },
      select: { id: true },
    });

    try {
      await deliver(transport, params.to, params.body);
      await prisma.smsMessage.update({ where: { id: record.id }, data: { status: 'sent', sentAt: new Date() } });
      return { sent: true };
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      await prisma.smsMessage.update({ where: { id: record.id }, data: { status: 'failed', error: reason } });
      console.error(`[sms] ${params.template} to ${params.to} failed: ${reason}`);
      return { sent: false, reason };
    }
  } catch (error) {
    console.error('[sms] could not record the message', error);
    return { sent: false, reason: 'not recorded' };
  }
}

export function otpMessage(code: string): string {
  // No link, and it says the one thing that matters: nobody legitimate will ask for this.
  return `${code} is your YesTourBD sign-in code. It expires in 5 minutes. We will never ask you for it.`;
}
