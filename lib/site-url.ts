/**
 * The app's own public address, for links inside emails.
 *
 * Vercel sets VERCEL_PROJECT_PRODUCTION_URL on production deployments and VERCEL_URL on
 * previews, neither with a scheme. SITE_URL overrides both, which is what a custom domain or
 * another host needs.
 */
export function siteUrl(): string {
  const explicit = process.env.SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, '');

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  return 'http://localhost:3000';
}
