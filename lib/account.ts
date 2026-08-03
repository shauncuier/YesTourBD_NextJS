import { prisma } from './db';
import { formatTaka } from './quotation';
import { customerStatus } from './tracking';

// The signed-in customer's own view of their requests. Everything here is scoped by user id —
// never by phone or reference from a URL — because this is the one place where getting the
// scope wrong shows one customer another's trip.

export type AccountRequestView = {
  ref: string;
  title: string;
  statusLabel: string;
  statusTone: 'success' | 'warning' | 'teal' | 'brand' | 'danger' | 'neutral' | 'gold';
  submitted: string;
  paxBand: string;
  totalLabel: string | null;
  open: boolean;
};

const TONE: Record<string, AccountRequestView['statusTone']> = {
  submitted: 'warning',
  reviewing: 'warning',
  quoted: 'teal',
  negotiating: 'gold',
  accepted: 'success',
  booked: 'success',
  expired: 'neutral',
  lost: 'neutral',
};

const OPEN_STATUSES = new Set(['submitted', 'reviewing', 'quoted', 'negotiating', 'accepted']);

const dhakaDate = (value: Date) =>
  value.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Dhaka' });

/**
 * Attaches requests submitted before this account existed.
 *
 * Someone who asked for a quote in March and signs in for the first time in June should find
 * it waiting, not an empty account. Matching is on the phone number the request was submitted
 * with — which is the same number they just proved they control by receiving a code, so this
 * claims nothing they have not already demonstrated.
 */
export async function linkRequestsByPhone(userId: string, phone: string): Promise<number> {
  const result = await prisma.quoteRequest.updateMany({
    where: { phone, userId: null },
    data: { userId },
  });
  return result.count;
}

export async function getAccountRequests(userId: string): Promise<AccountRequestView[]> {
  const requests = await prisma.quoteRequest.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    select: {
      ref: true,
      destinations: true,
      requestType: true,
      paxBand: true,
      status: true,
      createdAt: true,
      quotations: {
        where: { status: { in: ['sent', 'accepted'] } },
        orderBy: { createdAt: 'desc' },
        take: 1,
        select: { total: true },
      },
    },
  });

  return requests.map((request) => {
    const total = request.quotations[0]?.total ?? null;
    return {
      ref: request.ref,
      title: request.destinations,
      statusLabel: customerStatus(request.status).label,
      statusTone: TONE[request.status] ?? 'neutral',
      submitted: dhakaDate(request.createdAt),
      paxBand: request.paxBand,
      totalLabel: total === null ? null : formatTaka(total),
      open: OPEN_STATUSES.has(request.status),
    };
  });
}

export type AccountProfile = {
  name: string;
  phone: string;
  email: string | null;
  memberSince: string;
  initials: string;
};

export async function getAccountProfile(userId: string): Promise<AccountProfile | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true, phone: true, email: true, createdAt: true },
  });
  if (!user) return null;

  // A customer created by OTP has their number as a name until they set one (M2.4).
  const named = user.name && user.name !== user.phone ? user.name : null;

  return {
    name: named ?? 'Traveller',
    phone: user.phone,
    email: user.email,
    memberSince: user.createdAt.toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'Asia/Dhaka' }),
    initials: (named ?? 'Traveller')
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join(''),
  };
}
