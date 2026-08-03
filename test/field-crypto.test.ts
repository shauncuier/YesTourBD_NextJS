import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { randomBytes } from 'node:crypto';
import {
  MissingEncryptionKey,
  decryptField,
  encryptField,
  encryptionAvailable,
  maskIdentity,
} from '@/lib/field-crypto';

const KEY = randomBytes(32).toString('base64');
const OTHER_KEY = randomBytes(32).toString('base64');

beforeEach(() => {
  process.env.DATA_ENCRYPTION_KEY = KEY;
});

afterEach(() => {
  process.env.DATA_ENCRYPTION_KEY = KEY;
});

describe('identity field encryption', () => {
  it('round-trips a passport number', () => {
    const stored = encryptField('A0123456');
    expect(decryptField(stored)).toBe('A0123456');
  });

  it('never stores the value in a readable form', () => {
    const stored = encryptField('1990123456789');
    expect(stored).not.toContain('1990123456789');
    expect(Buffer.from(stored, 'utf8').includes(Buffer.from('1990123456789'))).toBe(false);
  });

  it('produces a different ciphertext every time, so equal values are not obvious', () => {
    // Deterministic encryption would let anyone with the column see which customers share a
    // document number, without decrypting anything.
    const a = encryptField('A0123456');
    const b = encryptField('A0123456');
    expect(a).not.toBe(b);
    expect(decryptField(a)).toBe(decryptField(b));
  });

  it('refuses a value encrypted under a different key rather than guessing', () => {
    const stored = encryptField('A0123456');
    process.env.DATA_ENCRYPTION_KEY = OTHER_KEY;
    expect(decryptField(stored)).toBeNull();
  });

  it('detects tampering instead of returning something plausible', () => {
    const stored = encryptField('A0123456');
    const [version, iv, tag, data] = stored.split('.');
    const flipped = Buffer.from(data!, 'base64url');
    flipped[0] ^= 0xff;
    expect(decryptField([version, iv, tag, flipped.toString('base64url')].join('.'))).toBeNull();
  });

  it('survives rubbish in the column', () => {
    for (const bad of [null, undefined, '', 'plaintext', 'v1.only', 'v2.a.b.c']) {
      expect(decryptField(bad), String(bad)).toBeNull();
    }
  });

  it('handles a long unicode value', () => {
    const value = 'পাসপোর্ট-A0123456';
    expect(decryptField(encryptField(value))).toBe(value);
  });

  it('refuses to work without a key, rather than storing in clear', () => {
    delete process.env.DATA_ENCRYPTION_KEY;
    expect(encryptionAvailable()).toBe(false);
    expect(() => encryptField('A0123456')).toThrow(MissingEncryptionKey);
  });

  it('rejects a key of the wrong length', () => {
    process.env.DATA_ENCRYPTION_KEY = randomBytes(16).toString('base64');
    expect(() => encryptField('A0123456')).toThrow(/32 bytes/);
  });
});

describe('masking', () => {
  it('shows only enough to recognise which document is on file', () => {
    expect(maskIdentity('A0123456')).toBe('••••3456');
    expect(maskIdentity('1990123456789')).toBe('•••••••••6789');
    expect(maskIdentity('123')).toBe('••••');
    expect(maskIdentity(null)).toBeNull();
  });
});
