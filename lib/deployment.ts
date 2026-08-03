/**
 * Which deployment this process is running as, and whether it is allowed to reach a real
 * provider.
 *
 * `NODE_ENV` cannot answer the first question on Vercel: a preview build is also
 * `NODE_ENV=production`, so gating on it lets every branch deploy and pull-request preview
 * send live SMS and email to whatever address or number someone types into a form. Vercel
 * sets `VERCEL_ENV` (`production` | `preview` | `development`) for exactly this, so prefer it
 * and fall back to `NODE_ENV` anywhere else.
 *
 * Import-free on purpose, like lib/otp-rules.ts: a test for "would this have sent for real?"
 * should not drag the database client into jsdom.
 */
export function isProductionDeployment(): boolean {
  if (process.env.VERCEL_ENV) return process.env.VERCEL_ENV === 'production';
  return process.env.NODE_ENV === 'production';
}

/**
 * Whether a transport with a key configured should use it. The override is a per-channel
 * environment variable (`SMS_LIVE`, `EMAIL_LIVE`) and reads both ways:
 *
 * - `'true'` sends from a non-production deployment, for a deliberate end-to-end check.
 * - `'false'` forces the console transport everywhere, production included. That is the kill
 *   switch: stopping delivery during an incident should not mean pulling a provider key out
 *   of the environment and redeploying to get it back.
 *
 * Anything else — unset, empty, misspelt — leaves the deployment to decide.
 */
export function liveSendingAllowed(override: string | undefined): boolean {
  if (override === 'false') return false;
  if (override === 'true') return true;
  return isProductionDeployment();
}
