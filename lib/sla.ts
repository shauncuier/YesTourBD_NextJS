// The brief promises a reply "within two working hours". That promise is only enforceable
// if "working hours" is defined, so: the corporate desk hours the site itself advertises —
// 9 AM to 10 PM, seven days a week, Asia/Dhaka. There is no weekend exclusion because the
// desk does not take one.
//
// ASSUMPTION, flagged in docs/MILESTONES.md: the client has not confirmed these as the SLA
// window. If they differ, change them here — nothing else encodes them.
export const WORKDAY_START_HOUR = 9;
export const WORKDAY_END_HOUR = 22;
export const SLA_WORKING_MINUTES = 120;

// Bangladesh is UTC+6 year round; it has not observed DST since a single 2009 trial. A fixed
// offset keeps this dependency-free — revisit if that ever changes.
const DHAKA_OFFSET_MINUTES = 6 * 60;
const MINUTE = 60_000;
const DAY_MINUTES = 24 * 60;

/** Minutes since Dhaka midnight for an instant. */
function dhakaMinutesOfDay(date: Date): number {
  const shifted = new Date(date.getTime() + DHAKA_OFFSET_MINUTES * MINUTE);
  return shifted.getUTCHours() * 60 + shifted.getUTCMinutes() + shifted.getUTCSeconds() / 60;
}

/** Dhaka midnight on the day an instant falls in, as an instant. */
function dhakaStartOfDay(date: Date): Date {
  return new Date(date.getTime() - dhakaMinutesOfDay(date) * MINUTE);
}

/**
 * Minutes of desk time between two instants. Time outside 09:00–22:00 does not count, so a
 * request that lands at 21:50 is one working hour old at 09:50 the next morning, not twelve.
 */
export function workingMinutesBetween(from: Date, to: Date): number {
  if (to <= from) return 0;

  const openMinute = WORKDAY_START_HOUR * 60;
  const closeMinute = WORKDAY_END_HOUR * 60;

  let total = 0;
  let dayStart = dhakaStartOfDay(from);
  const limit = to.getTime();

  // One iteration per calendar day spanned. Bounded by the range itself; a request older
  // than a year would loop 365 times, which is fine and never happens in the queue.
  while (dayStart.getTime() < limit) {
    const dayOpen = dayStart.getTime() + openMinute * MINUTE;
    const dayClose = dayStart.getTime() + closeMinute * MINUTE;

    const windowStart = Math.max(dayOpen, from.getTime());
    const windowEnd = Math.min(dayClose, limit);
    if (windowEnd > windowStart) total += (windowEnd - windowStart) / MINUTE;

    dayStart = new Date(dayStart.getTime() + DAY_MINUTES * MINUTE);
  }

  return Math.round(total);
}

/** Statuses where the customer is still waiting for their first written reply. */
const AWAITING_FIRST_REPLY = new Set(['submitted', 'reviewing']);

export type SlaState = {
  /** Desk minutes elapsed since submission. */
  workingMinutes: number;
  /** True only while a first reply is still owed and the two hours have run out. */
  overdue: boolean;
  /** Desk minutes left before it goes overdue; negative once it has. */
  minutesRemaining: number;
  awaitingReply: boolean;
};

export function slaStateFor(params: { createdAt: Date; status: string; now?: Date }): SlaState {
  const now = params.now ?? new Date();
  const workingMinutes = workingMinutesBetween(params.createdAt, now);
  const awaitingReply = AWAITING_FIRST_REPLY.has(params.status);

  return {
    workingMinutes,
    awaitingReply,
    overdue: awaitingReply && workingMinutes > SLA_WORKING_MINUTES,
    minutesRemaining: SLA_WORKING_MINUTES - workingMinutes,
  };
}

/** "3h 12m", "48m", "just now" — the queue's Waiting column. */
export function formatDuration(minutes: number): string {
  const whole = Math.max(0, Math.round(minutes));
  if (whole < 1) return 'just now';
  if (whole < 60) return `${whole}m`;

  const hours = Math.floor(whole / 60);
  const rest = whole % 60;
  if (hours < 24) return rest ? `${hours}h ${rest}m` : `${hours}h`;

  const days = Math.floor(hours / 24);
  const restHours = hours % 24;
  return restHours ? `${days}d ${restHours}h` : `${days}d`;
}
