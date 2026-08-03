import { prisma } from '../db';

// The SMS seam, mirroring lib/email/send.ts. No provider is chosen yet (D7), so the default
// transport prints to the terminal — the OTP flow is fully exercisable locally, and picking a
// provider later is a branch in `deliver()`.

export type SmsTransport = 'console' | 'bulksmsbd';

/**
 * The gateway is used in production once a key exists. In development it is not, even with a
 * key present — a test run should never spend credits or put a message on a stranger's
 * handset because a fake number happened to be valid. Set SMS_LIVE=true to override for a
 * deliberate end-to-end check.
 */
function activeTransport(): SmsTransport {
  if (!process.env.SMS_API_KEY) return 'console';
  if (process.env.NODE_ENV === 'production' || process.env.SMS_LIVE === 'true') return 'bulksmsbd';
  return 'console';
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
    // POST with the fields in the body, not the query string: a URL carrying the api key and
    // a live one-time code ends up in proxy logs, browser history and error reports. And
    // https by default, so neither crosses the wire in clear.
    const form = new URLSearchParams({
      api_key: process.env.SMS_API_KEY as string,
      senderid: process.env.SMS_SENDER_ID ?? '',
      // The gateway wants 8801XXXXXXXXX; everything else here stores 01XXXXXXXXX.
      number: to.replace(/^0/, '880'),
      message: body,
    });

    const response = await fetch(process.env.SMS_API_URL ?? DEFAULT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form,
    });
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

export { otpMessage } from './message';
