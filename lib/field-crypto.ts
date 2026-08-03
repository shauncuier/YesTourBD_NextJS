import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

// NID and passport numbers are the most sensitive thing this app will ever hold: they are
// identity documents, they never change, and a leak cannot be undone by asking someone to
// pick a new one. So they are encrypted in the column rather than merely "protected by the
// database" — a dump, a backup on someone's laptop, or a read-only replica leaks ciphertext.
//
// AES-256-GCM: authenticated, so a tampered value fails loudly instead of decrypting to
// something plausible. Stored as v1.iv.tag.ciphertext, all base64url, with the version there
// so a future key rotation or algorithm change can be told apart from corruption.

const VERSION = 'v1';
const IV_BYTES = 12; // 96 bits, the size GCM is defined for
const KEY_BYTES = 32;

export class MissingEncryptionKey extends Error {
  constructor() {
    super('DATA_ENCRYPTION_KEY is not set — refusing to store identity documents in clear');
    this.name = 'MissingEncryptionKey';
  }
}

function key(): Buffer {
  const raw = process.env.DATA_ENCRYPTION_KEY;
  if (!raw) throw new MissingEncryptionKey();

  const bytes = Buffer.from(raw, 'base64');
  if (bytes.length !== KEY_BYTES) {
    throw new Error(`DATA_ENCRYPTION_KEY must be ${KEY_BYTES} bytes of base64, got ${bytes.length}`);
  }
  return bytes;
}

/** Whether storing an identity field is possible at all. Checked before showing the form. */
export function encryptionAvailable(): boolean {
  try {
    key();
    return true;
  } catch {
    return false;
  }
}

export function encryptField(plaintext: string): string {
  const iv = randomBytes(IV_BYTES);
  const cipher = createCipheriv('aes-256-gcm', key(), iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);

  return [VERSION, iv.toString('base64url'), cipher.getAuthTag().toString('base64url'), ciphertext.toString('base64url')].join('.');
}

/**
 * Returns null rather than throwing when a value cannot be read — a profile page should
 * still render if one field was written with a key that has since changed. It never returns
 * a guess.
 */
export function decryptField(stored: string | null | undefined): string | null {
  if (!stored) return null;

  const [version, ivPart, tagPart, dataPart] = stored.split('.');
  if (version !== VERSION || !ivPart || !tagPart || !dataPart) return null;

  try {
    const decipher = createDecipheriv('aes-256-gcm', key(), Buffer.from(ivPart, 'base64url'));
    decipher.setAuthTag(Buffer.from(tagPart, 'base64url'));
    return Buffer.concat([decipher.update(Buffer.from(dataPart, 'base64url')), decipher.final()]).toString('utf8');
  } catch {
    // Wrong key, or someone edited the column. Either way we do not have the value.
    return null;
  }
}

/**
 * What a support screen or a log line may show: never the document, only enough to confirm
 * which one is on file.
 */
export function maskIdentity(value: string | null | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (trimmed.length <= 4) return '••••';
  return `${'•'.repeat(Math.max(4, trimmed.length - 4))}${trimmed.slice(-4)}`;
}
