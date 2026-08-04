import { isProductionDeployment } from './deployment';

/// Everything a crawler is told about this site, in one place and with no database import —
/// the same rule as lib/otp-rules.ts and lib/sms/message.ts, so the assertions in
/// test/seo.test.ts run without dragging Prisma into jsdom.

export const SITE_NAME = 'YesTourBD';

export const SITE_DESCRIPTION =
  'Hotels, houseboats, ship and air tickets you can confirm right now — plus corporate tours, packages and visa help handled by a real person.';

/**
 * The origin every canonical, sitemap entry and Open Graph URL is built from.
 *
 * Deliberately **not** `VERCEL_URL`. That is the per-deployment hostname, so a preview build
 * would canonicalise to itself and invite Google to index a staging copy of the whole site
 * against the real one. `VERCEL_PROJECT_PRODUCTION_URL` is the stable production domain
 * whichever deployment reads it, which is exactly what a canonical is for.
 */
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, '');

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (production) return `https://${production.replace(/\/+$/, '')}`;

  return 'http://localhost:3000';
}

/** A path turned into the absolute URL a crawler should see. */
export function absoluteUrl(path: string): string {
  return new URL(path, `${siteUrl()}/`).toString().replace(/\/$/, '') || siteUrl();
}

/**
 * Whether crawlers are allowed in at all. Only the production deployment says yes: a preview
 * URL carries the same markup as the real site, and one indexed preview competes with the
 * domain it was copied from. Same gate as email and SMS, for the same reason — the preview
 * environment must not be able to reach the outside world by accident.
 */
export function indexingAllowed(): boolean {
  return isProductionDeployment();
}

/**
 * Routes no crawler should be following. Nothing here is secret — `/admin` is behind
 * `requireStaff()` and `/track/[ref]` behind a signed cookie — but a search result pointing at
 * a customer's tracking page or a staff login is noise at best and a leak of reference
 * numbers at worst.
 */
export const CRAWLER_DISALLOW = ['/admin', '/account', '/track/', '/signin', '/api/'];

type JsonLd = Record<string, unknown>;

/** The business itself, emitted once on the home page rather than on every route. */
export function organizationJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: siteUrl(),
    areaServed: { '@type': 'Country', name: 'Bangladesh' },
    address: { '@type': 'PostalAddress', addressCountry: 'BD' },
    // The desk hours the site advertises and lib/sla.ts measures against. One source of
    // truth would be better; when a second consumer appears, move it to lib/sla.ts.
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '09:00',
      closes: '22:00',
    },
  };
}

export type ListingForSeo = {
  slug: string;
  title: string;
  place: string;
  price: number;
  img: string;
  // Widened on purpose: lib/site-data.js is plain JS, so this arrives as an unconstrained
  // string. Only the exact value 'instant' claims stock below — anything unrecognised falls
  // to the cautious branch rather than being asserted into one.
  mode: string;
};

/**
 * A listing as a purchasable product.
 *
 * No `aggregateRating`, on purpose. The star ratings on these cards are placeholder numbers
 * from lib/site-data.js (M4.7 replaces them with real ones). Ratings on screen are obviously
 * sample content; the same numbers in structured data are a claim to Google that we collected
 * reviews we have not, which is what a manual action is for. It goes in when M4.7 lands.
 */
export function listingJsonLd(listing: ListingForSeo): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: listing.title,
    description: `${listing.title} in ${listing.place}.`,
    image: listing.img,
    url: absoluteUrl(`/tours/${listing.slug}`),
    offers: {
      '@type': 'Offer',
      price: String(listing.price),
      priceCurrency: 'BDT',
      url: absoluteUrl(`/tours/${listing.slug}`),
      // An instant service can be bought now; a request one is quoted first, and saying
      // InStock about it would promise a checkout that does not exist.
      availability:
        listing.mode === 'instant'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/PreOrder',
    },
  };
}

/** A trail of `[label, path]`, root first. */
export function breadcrumbJsonLd(trail: ReadonlyArray<[string, string]>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map(([name, path], index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: absoluteUrl(path),
    })),
  };
}
