import { createHash } from 'node:crypto';
import { prisma } from './db';

// The quote form is unauthenticated and writes to the database, so it needs a brake. This
// one counts recent rows rather than keeping counters in memory: the app is deployed
// serverless, where each instance would otherwise have its own private idea of the limit.
//
// It is a floor, not a wall. Someone determined can change IP and phone. It stops the
// accidental double-submit and the trivially scripted flood, which is what M1.2 needs; a
// real limiter (Upstash or similar) belongs with the rest of the abuse work.

const WINDOW_MINUTES = 60;
const MAX_PER_IP = 5;
const MAX_PER_PHONE = 3;

/** SHA-256 so the table never stores an address that identifies a person. */
export function hashIp(ip: string): string {
  return createHash('sha256').update(ip).digest('hex');
}

/**
 * Reads the caller's IP from the proxy headers Vercel sets. Returns null when there is
 * none — a direct localhost request during development, typically.
 */
export function clientIpFrom(headers: Headers): string | null {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  return headers.get('x-real-ip');
}

export type RateLimitVerdict = { allowed: true } | { allowed: false; reason: string };

export async function checkQuoteRequestRate(params: {
  ipHash: string | null;
  phone: string;
}): Promise<RateLimitVerdict> {
  const since = new Date(Date.now() - WINDOW_MINUTES * 60_000);

  if (params.ipHash) {
    const fromIp = await prisma.quoteRequest.count({
      where: { ipHash: params.ipHash, createdAt: { gte: since } },
    });
    if (fromIp >= MAX_PER_IP) {
      return {
        allowed: false,
        reason: 'Too many requests from this connection. Try again in an hour, or call us.',
      };
    }
  }

  const fromPhone = await prisma.quoteRequest.count({
    where: { phone: params.phone, createdAt: { gte: since } },
  });
  if (fromPhone >= MAX_PER_PHONE) {
    return {
      allowed: false,
      reason: 'We already have your recent requests. A coordinator will reply shortly.',
    };
  }

  return { allowed: true };
}
