import { describe, expect, it } from 'vitest';
import { parseSupportMessage, supportNote, SUPPORT_TOPICS } from '@/lib/support';

function formOf(overrides: Record<string, string> = {}) {
  const base: Record<string, string> = {
    name: 'Nusrat Jahan',
    phone: '01712345678',
    topic: 'booking',
    message: 'We need to move our Saint Martin trip a week later. Is that possible?',
  };
  const data = new FormData();
  for (const [key, value] of Object.entries({ ...base, ...overrides })) data.set(key, value);
  return data;
}

describe('support enquiry validation', () => {
  it('accepts the minimum a coordinator can act on', () => {
    const result = parseSupportMessage(formOf());
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.topic).toBe('booking');
  });

  it('normalises the mobile the same way the quote form does', () => {
    for (const written of ['+8801712345678', '01712-345678', '+880 1712 345678']) {
      const result = parseSupportMessage(formOf({ phone: written }));
      expect(result.ok, written).toBe(true);
      if (result.ok) expect(result.data.phone).toBe('01712345678');
    }
  });

  it('refuses a message too short to act on', () => {
    const result = parseSupportMessage(formOf({ message: 'help' }));
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.message).toMatch(/sentence or two/);
  });

  it('refuses a topic that is not on the list', () => {
    expect(parseSupportMessage(formOf({ topic: 'refund-now' })).ok).toBe(false);
    // …and requires one at all, rather than filing it as "other" on the customer's behalf.
    const data = formOf();
    data.delete('topic');
    expect(parseSupportMessage(data).ok).toBe(false);
  });

  it('treats email and reference as optional, and uppercases a reference', () => {
    const result = parseSupportMessage(formOf({ email: '', ref: 'req-2261' }));
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.email).toBeUndefined();
    expect(result.data.ref).toBe('REQ-2261');
  });

  it('still checks an email when one is given', () => {
    expect(parseSupportMessage(formOf({ email: 'nusrat@' })).ok).toBe(false);
    expect(parseSupportMessage(formOf({ email: 'nusrat@example.com' })).ok).toBe(true);
  });
});

describe('what the coordinator reads', () => {
  it('puts the topic and reference above the message, since there is no destination', () => {
    const parsed = parseSupportMessage(formOf({ ref: 'REQ-2261' }));
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    const note = supportNote(parsed.data);
    expect(note).toContain('An existing booking or request');
    expect(note).toContain('about REQ-2261');
    expect(note).toContain('Saint Martin');
  });

  it('omits the reference when there is not one', () => {
    const parsed = parseSupportMessage(formOf());
    if (!parsed.ok) throw new Error('expected valid');
    expect(supportNote(parsed.data)).not.toContain('about');
  });

  it('has a label for every topic it offers', () => {
    for (const topic of SUPPORT_TOPICS) {
      const parsed = parseSupportMessage(formOf({ topic: topic.value }));
      expect(parsed.ok, topic.value).toBe(true);
      if (parsed.ok) expect(supportNote(parsed.data)).toContain(topic.label);
    }
  });
});
