import { randomInt } from 'node:crypto';
import { hash, verify } from '@node-rs/argon2';
import { prisma } from './db';
import { linkRequestsByPhone } from './account';
import { sendSms } from './sms/send';
import { otpMessage } from './sms/message';
import {
  CODE_LENGTH,
  MAX_ATTEMPTS,
  checkChallengeUsable,
  checkSendAllowed,
  codeExpiryFrom,
} from './otp-rules';

// The database half of the OTP flow. The rules live in otp-rules.ts; this is what touches
// rows and the SMS gateway.

function generateCode(): string {
  // randomInt, not Math.random: a predictable sign-in code is not a sign-in code.
  return String(randomInt(0, 10 ** CODE_LENGTH)).padStart(CODE_LENGTH, '0');
}

export type RequestCodeResult = { sent: true } | { sent: false; reason: string; retryAfterSeconds?: number };

export async function requestOtp(params: { phone: string; ipHash: string | null }): Promise<RequestCodeResult> {
  const hourAgo = new Date(Date.now() - 60 * 60_000);

  const [latest, sentToPhoneLastHour, sentFromIpLastHour] = await Promise.all([
    prisma.otpChallenge.findFirst({
      where: { phone: params.phone },
      orderBy: { createdAt: 'desc' },
      select: { createdAt: true },
    }),
    prisma.otpChallenge.count({ where: { phone: params.phone, createdAt: { gte: hourAgo } } }),
    params.ipHash
      ? prisma.otpChallenge.count({ where: { ipHash: params.ipHash, createdAt: { gte: hourAgo } } })
      : Promise.resolve(0),
  ]);

  const verdict = checkSendAllowed({
    lastSentAt: latest?.createdAt ?? null,
    sentToPhoneLastHour,
    sentFromIpLastHour,
  });
  if (!verdict.allowed) return { sent: false, reason: verdict.reason, retryAfterSeconds: verdict.retryAfterSeconds };

  const code = generateCode();

  // Any earlier code stops working the moment a new one is issued: two live codes for one
  // number doubles an attacker's chances for no benefit to anyone.
  await prisma.otpChallenge.updateMany({
    where: { phone: params.phone, consumedAt: null },
    data: { consumedAt: new Date() },
  });

  await prisma.otpChallenge.create({
    data: {
      phone: params.phone,
      codeHash: await hash(code),
      expiresAt: codeExpiryFrom(),
      ipHash: params.ipHash,
    },
  });

  const delivery = await sendSms({ to: params.phone, body: otpMessage(code), template: 'otp' });
  if (!delivery.sent) {
    return { sent: false, reason: 'We could not send the code. Try again in a moment, or call us.' };
  }

  return { sent: true };
}

export type VerifyResult = { ok: true; userId: string } | { ok: false; reason: string };

/**
 * Checks a code and, if it is right, returns the account it belongs to — creating one on
 * first sign-in, because a phone number that has never been seen is a new customer rather
 * than an error.
 */
export async function verifyOtp(params: { phone: string; code: string }): Promise<VerifyResult> {
  const challenge = await prisma.otpChallenge.findFirst({
    where: { phone: params.phone },
    orderBy: { createdAt: 'desc' },
  });

  const usable = checkChallengeUsable(challenge);
  if (!usable.ok) return { ok: false, reason: usable.reason };
  // `usable.ok` implies a challenge exists; TypeScript needs it said again.
  if (!challenge) return { ok: false, reason: usable.ok ? 'unreachable' : '' };

  const matches = await verify(challenge.codeHash, params.code).catch(() => false);

  if (!matches) {
    // Count the miss before answering, so a burst of parallel guesses still runs out.
    await prisma.otpChallenge.update({
      where: { id: challenge.id },
      data: { attempts: { increment: 1 } },
    });
    return { ok: false, reason: 'That code is wrong or has expired. Ask for a new one.' };
  }

  await prisma.otpChallenge.update({ where: { id: challenge.id }, data: { consumedAt: new Date() } });

  const existing = await prisma.user.findUnique({ where: { phone: params.phone }, select: { id: true } });
  if (existing) {
    await prisma.user.update({ where: { id: existing.id }, data: { lastLoginAt: new Date() } });
    // Requests made while signed out still belong to them.
    await linkRequestsByPhone(existing.id, params.phone);
    return { ok: true, userId: existing.id };
  }

  const created = await prisma.user.create({
    data: {
      phone: params.phone,
      // The customer names themselves in M2.4; until then the queue shows the number.
      name: params.phone,
      role: 'customer',
      lastLoginAt: new Date(),
    },
    select: { id: true },
  });

  // Anything they asked for before this account existed is theirs — they have just proved
  // they control the number it was submitted with.
  await linkRequestsByPhone(created.id, params.phone);

  return { ok: true, userId: created.id };
}

export { MAX_ATTEMPTS };
