import { afterEach, describe, expect, it, vi } from 'vitest';
import { isProductionDeployment, liveSendingAllowed } from '@/lib/deployment';
import { maskMobile } from '@/lib/sms/message';

// The rule these assert is the one that decides whether a stranger's handset rings. It is
// worth a test precisely because the wrong answer is invisible: a preview deploy that sends
// for real looks exactly like one that does not until someone gets a message.

// `vi.stubEnv` rather than assignment: NODE_ENV is readonly in the types Next ships, and
// `undefined` here means "unset", which is the case that matters most.
function setEnv(vercel: string | undefined, node: string | undefined) {
  vi.stubEnv('VERCEL_ENV', vercel);
  vi.stubEnv('NODE_ENV', node as 'production' | 'development' | 'test' | undefined);
}

afterEach(() => vi.unstubAllEnvs());

describe('isProductionDeployment', () => {
  it('is true only for the production deployment on Vercel', () => {
    setEnv('production', 'production');
    expect(isProductionDeployment()).toBe(true);
  });

  it('is false for a preview deploy, which also carries NODE_ENV=production', () => {
    setEnv('preview', 'production');
    expect(isProductionDeployment()).toBe(false);
  });

  it('is false for `vercel dev`', () => {
    setEnv('development', 'development');
    expect(isProductionDeployment()).toBe(false);
  });

  it('falls back to NODE_ENV off Vercel', () => {
    setEnv(undefined, 'production');
    expect(isProductionDeployment()).toBe(true);
    setEnv(undefined, 'development');
    expect(isProductionDeployment()).toBe(false);
    setEnv(undefined, 'test');
    expect(isProductionDeployment()).toBe(false);
  });
});

describe('liveSendingAllowed', () => {
  it('sends from the production deployment when the override says nothing', () => {
    setEnv('production', 'production');
    expect(liveSendingAllowed(undefined)).toBe(true);
    expect(liveSendingAllowed('')).toBe(true);
  });

  it('does not send from a preview deploy or from development', () => {
    setEnv('preview', 'production');
    expect(liveSendingAllowed(undefined)).toBe(false);
    setEnv(undefined, 'development');
    expect(liveSendingAllowed(undefined)).toBe(false);
  });

  it('sends from anywhere on `true`, for a deliberate end-to-end check', () => {
    setEnv(undefined, 'development');
    expect(liveSendingAllowed('true')).toBe(true);
  });

  it('stops sending everywhere on `false`, production included — the kill switch', () => {
    setEnv('production', 'production');
    expect(liveSendingAllowed('false')).toBe(false);
  });

  it('treats anything else as unset rather than as permission', () => {
    setEnv('preview', 'production');
    expect(liveSendingAllowed('TRUE')).toBe(false);
    expect(liveSendingAllowed('yes')).toBe(false);
    expect(liveSendingAllowed('1')).toBe(false);
  });
});

describe('maskMobile', () => {
  it('keeps enough to identify the number and not enough to dial it', () => {
    expect(maskMobile('01712345678')).toBe('017••••5678');
  });

  it('gives up rather than leak most of a short string', () => {
    expect(maskMobile('0171')).toBe('••••');
    expect(maskMobile('')).toBe('••••');
  });
});
