import { describe, expect, it } from 'vitest';
import {
  REQUEST_STATUSES,
  canTransition,
  checkTransition,
  isRequestStatus,
  isTerminal,
  nextStatuses,
  type RequestStatus,
} from '@/lib/request-pipeline';

describe('request pipeline', () => {
  it('walks the happy path end to end', () => {
    const path: RequestStatus[] = ['submitted', 'reviewing', 'quoted', 'negotiating', 'accepted', 'booked'];
    for (let i = 0; i < path.length - 1; i += 1) {
      expect(canTransition(path[i]!, path[i + 1]!), `${path[i]} → ${path[i + 1]}`).toBe(true);
    }
  });

  it('lets a request be lost or expired from anywhere it is still live', () => {
    for (const status of ['submitted', 'reviewing', 'quoted', 'negotiating'] as RequestStatus[]) {
      expect(canTransition(status, 'lost'), `${status} → lost`).toBe(true);
      expect(canTransition(status, 'expired'), `${status} → expired`).toBe(true);
    }
  });

  it('allows the backward steps a real negotiation needs', () => {
    // A customer coming back with changes is normal, not an exception.
    expect(canTransition('quoted', 'reviewing')).toBe(true);
    expect(canTransition('negotiating', 'quoted')).toBe(true);
    // And a dead request can be reopened rather than duplicated, which would split its history.
    expect(canTransition('lost', 'reviewing')).toBe(true);
    expect(canTransition('expired', 'reviewing')).toBe(true);
  });

  it('refuses the jumps that would skip the work', () => {
    expect(canTransition('submitted', 'accepted')).toBe(false);
    expect(canTransition('submitted', 'booked')).toBe(false);
    expect(canTransition('reviewing', 'negotiating')).toBe(false);
    expect(canTransition('quoted', 'booked')).toBe(false);
  });

  it('treats booked as final', () => {
    expect(isTerminal('booked')).toBe(true);
    expect(nextStatuses('booked')).toEqual([]);
    for (const status of REQUEST_STATUSES) {
      expect(canTransition('booked', status), `booked → ${status}`).toBe(false);
    }
  });

  it('explains a refusal in words a coordinator can act on', () => {
    expect(checkTransition('submitted', 'reviewing')).toEqual({ ok: true });

    const sideways = checkTransition('reviewing', 'booked');
    expect(sideways.ok).toBe(false);
    if (!sideways.ok) expect(sideways.reason).toMatch(/can only become/);

    const same = checkTransition('quoted', 'quoted');
    expect(same.ok).toBe(false);
    if (!same.ok) expect(same.reason).toMatch(/Already quoted/);

    const final = checkTransition('booked', 'lost');
    expect(final.ok).toBe(false);
    if (!final.ok) expect(final.reason).toMatch(/final/);
  });

  it('recognises only the statuses the schema defines', () => {
    expect(isRequestStatus('quoted')).toBe(true);
    expect(isRequestStatus('Quoted')).toBe(false);
    expect(isRequestStatus('cancelled')).toBe(false);
    expect(isRequestStatus(undefined)).toBe(false);
  });

  it('never lets a status reach itself', () => {
    for (const status of REQUEST_STATUSES) {
      expect(canTransition(status, status), status).toBe(false);
    }
  });
});
