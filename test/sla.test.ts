import { describe, expect, it } from 'vitest';
import { formatDuration, slaStateFor, workingMinutesBetween } from '@/lib/sla';

// The desk runs 09:00–22:00 Asia/Dhaka (UTC+6), so 09:00 Dhaka is 03:00Z and 22:00 Dhaka is
// 16:00Z. Written as UTC here to keep the expectations unambiguous.
const utc = (iso: string) => new Date(iso);

describe('working minutes', () => {
  it('counts plain desk time', () => {
    // 10:00 → 12:30 Dhaka
    expect(workingMinutesBetween(utc('2026-03-10T04:00:00Z'), utc('2026-03-10T06:30:00Z'))).toBe(150);
  });

  it('ignores time before the desk opens', () => {
    // 06:00 → 10:00 Dhaka: only the hour after 09:00 counts.
    expect(workingMinutesBetween(utc('2026-03-10T00:00:00Z'), utc('2026-03-10T04:00:00Z'))).toBe(60);
  });

  it('ignores time after the desk closes', () => {
    // 21:00 → 23:30 Dhaka: one hour, then nothing.
    expect(workingMinutesBetween(utc('2026-03-10T15:00:00Z'), utc('2026-03-10T17:30:00Z'))).toBe(60);
  });

  it('does not run the clock overnight', () => {
    // Submitted 21:50, checked 09:50 next day: 10 minutes that evening + 50 the next morning.
    expect(workingMinutesBetween(utc('2026-03-10T15:50:00Z'), utc('2026-03-11T03:50:00Z'))).toBe(60);
  });

  it('counts a full day as one desk day, not twenty-four hours', () => {
    // 10:00 Tue → 10:00 Wed: 12h to close, plus 1h after open.
    expect(workingMinutesBetween(utc('2026-03-10T04:00:00Z'), utc('2026-03-11T04:00:00Z'))).toBe(13 * 60);
  });

  it('spans several days', () => {
    // 10:00 Tue → 10:00 Fri: 12 + 13 + 13 + 1.
    expect(workingMinutesBetween(utc('2026-03-10T04:00:00Z'), utc('2026-03-13T04:00:00Z'))).toBe(
      12 * 60 + 13 * 60 + 13 * 60 + 60,
    );
  });

  it('counts nothing for a window entirely outside desk hours', () => {
    // 23:00 → 02:00 Dhaka, across midnight.
    expect(workingMinutesBetween(utc('2026-03-10T17:00:00Z'), utc('2026-03-10T20:00:00Z'))).toBe(0);
  });

  it('is zero when the end is not after the start', () => {
    expect(workingMinutesBetween(utc('2026-03-10T06:00:00Z'), utc('2026-03-10T06:00:00Z'))).toBe(0);
    expect(workingMinutesBetween(utc('2026-03-10T06:00:00Z'), utc('2026-03-10T05:00:00Z'))).toBe(0);
  });
});

describe('SLA state', () => {
  const createdAt = utc('2026-03-10T04:00:00Z'); // 10:00 Dhaka

  it('is not overdue inside two working hours', () => {
    const state = slaStateFor({ createdAt, status: 'submitted', now: utc('2026-03-10T05:30:00Z') });
    expect(state.overdue).toBe(false);
    expect(state.minutesRemaining).toBe(30);
  });

  it('goes overdue past two working hours', () => {
    const state = slaStateFor({ createdAt, status: 'submitted', now: utc('2026-03-10T06:30:00Z') });
    expect(state.overdue).toBe(true);
    expect(state.workingMinutes).toBe(150);
  });

  it('does not go overdue overnight', () => {
    // Submitted 21:30, looked at 08:00 the next morning: 30 desk minutes, still in time.
    const evening = utc('2026-03-10T15:30:00Z');
    const state = slaStateFor({ createdAt: evening, status: 'submitted', now: utc('2026-03-11T02:00:00Z') });
    expect(state.workingMinutes).toBe(30);
    expect(state.overdue).toBe(false);
  });

  it('stops the clock once the customer has been answered', () => {
    const answered = slaStateFor({ createdAt, status: 'quoted', now: utc('2026-03-12T06:30:00Z') });
    expect(answered.awaitingReply).toBe(false);
    expect(answered.overdue).toBe(false);
  });

  it('still counts a request someone has only opened', () => {
    const state = slaStateFor({ createdAt, status: 'reviewing', now: utc('2026-03-10T07:00:00Z') });
    expect(state.awaitingReply).toBe(true);
    expect(state.overdue).toBe(true);
  });
});

describe('duration formatting', () => {
  it('reads the way a coordinator would say it', () => {
    expect(formatDuration(0)).toBe('just now');
    expect(formatDuration(48)).toBe('48m');
    expect(formatDuration(60)).toBe('1h');
    expect(formatDuration(192)).toBe('3h 12m');
    expect(formatDuration(1500)).toBe('1d 1h');
    expect(formatDuration(2880)).toBe('2d');
  });
});
