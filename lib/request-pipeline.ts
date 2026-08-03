// The request pipeline from docs/ARCHITECTURE.md, as rules rather than prose:
//
//   submitted → reviewing → quoted → negotiating → accepted → booked
//                               ↘ expired
//                               ↘ lost
//
// Pure and import-free so the server action, the UI and the tests share one definition of
// what may follow what. A status column with no rules is a free-text field with extra steps.

export const REQUEST_STATUSES = [
  'submitted',
  'reviewing',
  'quoted',
  'negotiating',
  'accepted',
  'booked',
  'expired',
  'lost',
] as const;
export type RequestStatus = (typeof REQUEST_STATUSES)[number];

/** What a coordinator sees on the button, and what the history reads back as. */
export const STATUS_LABEL: Record<RequestStatus, string> = {
  submitted: 'Submitted',
  reviewing: 'Reviewing',
  quoted: 'Quoted',
  negotiating: 'Negotiating',
  accepted: 'Accepted',
  booked: 'Booked',
  expired: 'Expired',
  lost: 'Lost',
};

/**
 * Allowed moves. Two deliberate choices:
 *
 * - `quoted` can go back to `reviewing`, and `negotiating` back to `quoted`, because a
 *   customer coming back with changes is the normal case, not an exception.
 * - `lost` and `expired` reopen to `reviewing`. People change their minds, and forcing a
 *   duplicate request to record that loses the history on the original.
 */
const TRANSITIONS: Record<RequestStatus, RequestStatus[]> = {
  submitted: ['reviewing', 'quoted', 'lost', 'expired'],
  reviewing: ['quoted', 'lost', 'expired'],
  quoted: ['negotiating', 'accepted', 'reviewing', 'lost', 'expired'],
  negotiating: ['quoted', 'accepted', 'lost', 'expired'],
  accepted: ['booked', 'lost'],
  booked: [],
  expired: ['reviewing'],
  lost: ['reviewing'],
};

export function isRequestStatus(value: unknown): value is RequestStatus {
  return typeof value === 'string' && (REQUEST_STATUSES as readonly string[]).includes(value);
}

export function nextStatuses(from: RequestStatus): RequestStatus[] {
  return TRANSITIONS[from];
}

export function canTransition(from: RequestStatus, to: RequestStatus): boolean {
  return TRANSITIONS[from].includes(to);
}

/** A status nothing follows — the request is finished, one way or another. */
export function isTerminal(status: RequestStatus): boolean {
  return TRANSITIONS[status].length === 0;
}

export type TransitionCheck = { ok: true } | { ok: false; reason: string };

export function checkTransition(from: RequestStatus, to: RequestStatus): TransitionCheck {
  if (from === to) return { ok: false, reason: `Already ${STATUS_LABEL[to].toLowerCase()}.` };
  if (canTransition(from, to)) return { ok: true };

  const allowed = nextStatuses(from);
  if (!allowed.length) {
    return { ok: false, reason: `${STATUS_LABEL[from]} is final — nothing follows it.` };
  }
  return {
    ok: false,
    reason: `${STATUS_LABEL[from]} can only become ${allowed.map((s) => STATUS_LABEL[s].toLowerCase()).join(', ')}.`,
  };
}
