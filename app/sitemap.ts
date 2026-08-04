import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';
import { LISTINGS } from '@/lib/site-data.js';

// Public routes only. /account, /admin, /signin and /track/[ref] are either guarded or
// personal — robots.ts turns crawlers away from them, and listing them here would be an
// invitation in the other direction.
//
// No `lastModified`: nothing in this app records when a page's content last changed, and
// stamping every entry with the build time tells crawlers the whole site changed on every
// deploy. That is worse than saying nothing. It goes in when the blog (M4.3) and admin-
// editable service copy (M4.2) give it a real value to report.

// /tickets and /guides are absent deliberately. Both are aliases the UI kit never designed —
// they render SearchScreen and HomeScreen — so each canonicalises to the page it duplicates.
// Listing a URL here and pointing its canonical somewhere else asks the crawler two opposite
// questions. They join the sitemap when they get screens of their own (M4.3).
const STATIC_ROUTES: Array<[path: string, priority: number]> = [
  ['/', 1],
  ['/search', 0.9],
  ['/request', 0.8],
  ['/contact', 0.5],
  ['/track', 0.5],
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_ROUTES.map(([path, priority]) => ({
      url: absoluteUrl(path),
      changeFrequency: 'weekly' as const,
      priority,
    })),
    ...LISTINGS.map((listing: { slug: string }) => ({
      url: absoluteUrl(`/tours/${listing.slug}`),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}
