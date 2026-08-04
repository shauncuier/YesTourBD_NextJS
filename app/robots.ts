import type { MetadataRoute } from 'next';
import { absoluteUrl, CRAWLER_DISALLOW, indexingAllowed } from '@/lib/seo';

// Route handlers are cached by default, and this one reads environment variables that are
// fixed for the life of a deployment — so a preview build bakes in its own "keep out" and a
// production build bakes in the real rules. Nothing here should be recomputed per request.

export default function robots(): MetadataRoute.Robots {
  // A preview deployment serves the same markup as the real site. One indexed preview URL
  // competes with the domain it was copied from, and getting it out of the index afterwards
  // is slow. Same gate as email and SMS: only production reaches the outside world.
  if (!indexingAllowed()) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  return {
    rules: { userAgent: '*', allow: '/', disallow: CRAWLER_DISALLOW },
    sitemap: absoluteUrl('/sitemap.xml'),
    host: absoluteUrl('/'),
  };
}
