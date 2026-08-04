import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  absoluteUrl,
  breadcrumbJsonLd,
  CRAWLER_DISALLOW,
  indexingAllowed,
  listingJsonLd,
  organizationJsonLd,
  siteUrl,
} from '@/lib/seo';

const KEYS = [
  'NEXT_PUBLIC_SITE_URL',
  'VERCEL_PROJECT_PRODUCTION_URL',
  'VERCEL_URL',
  'VERCEL_ENV',
  'NODE_ENV',
] as const;

let saved: Record<string, string | undefined>;

beforeEach(() => {
  saved = Object.fromEntries(KEYS.map((k) => [k, process.env[k]]));
  for (const key of KEYS) delete process.env[key];
});

afterEach(() => {
  for (const [key, value] of Object.entries(saved)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

describe('the origin canonicals are built from', () => {
  it('prefers an explicit site URL', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://yestourbd.com';
    expect(siteUrl()).toBe('https://yestourbd.com');
  });

  it('tolerates a trailing slash rather than emitting a doubled one', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://yestourbd.com/';
    expect(absoluteUrl('/request')).toBe('https://yestourbd.com/request');
  });

  it('falls back to the production domain, never the per-deploy hostname', () => {
    // The whole point: a preview build canonicalising to itself invites Google to index a
    // staging copy of the site against the real one.
    process.env.VERCEL_PROJECT_PRODUCTION_URL = 'yestourbd.com';
    process.env.VERCEL_URL = 'yestourbd-git-preview-abc123.vercel.app';
    expect(siteUrl()).toBe('https://yestourbd.com');
    expect(absoluteUrl('/tours/x')).not.toContain('preview');
  });

  it('falls back to localhost when nothing is configured, so a build does not fail', () => {
    expect(siteUrl()).toBe('http://localhost:3000');
  });
});

describe('who is let in', () => {
  it('only the production deployment is crawlable', () => {
    process.env.VERCEL_ENV = 'production';
    expect(indexingAllowed()).toBe(true);

    process.env.VERCEL_ENV = 'preview';
    expect(indexingAllowed()).toBe(false);
  });

  it('keeps crawlers out of the panel, the account and a customer tracking page', () => {
    for (const path of ['/admin', '/account', '/track/']) {
      expect(CRAWLER_DISALLOW).toContain(path);
    }
    // …but /track itself is a public entry form and should stay indexable.
    expect(CRAWLER_DISALLOW).not.toContain('/track');
  });
});

describe('structured data', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://yestourbd.com';
  });

  it('describes the business with the desk hours the site advertises', () => {
    const org = organizationJsonLd() as Record<string, never>;
    expect(org['@type']).toBe('TravelAgency');
    const hours = org.openingHoursSpecification as unknown as {
      opens: string;
      closes: string;
      dayOfWeek: string[];
    };
    expect(hours.opens).toBe('09:00');
    expect(hours.closes).toBe('22:00');
    expect(hours.dayOfWeek).toHaveLength(7);
  });

  const listing = {
    slug: 'coxs-bazar-houseboat-day-tour',
    title: 'Cox’s Bazar Houseboat Day Tour',
    place: 'Cox’s Bazar',
    price: 3200,
    img: 'https://images.unsplash.com/photo-1520250497591',
    mode: 'instant' as const,
  };

  it('prices a listing in whole taka, in BDT, at an absolute URL', () => {
    const offer = listingJsonLd(listing).offers as Record<string, string>;
    expect(offer.price).toBe('3200');
    expect(offer.priceCurrency).toBe('BDT');
    expect(offer.url).toBe('https://yestourbd.com/tours/coxs-bazar-houseboat-day-tour');
  });

  it('does not claim a request service is in stock — it has to be quoted first', () => {
    const instant = listingJsonLd(listing).offers as Record<string, string>;
    const request = listingJsonLd({ ...listing, mode: 'request' }).offers as Record<string, string>;
    expect(instant.availability).toBe('https://schema.org/InStock');
    expect(request.availability).toBe('https://schema.org/PreOrder');
  });

  it('does not claim stock for a mode it does not recognise', () => {
    // site-data.js is untyped, so a typo in `mode` reaches here as an ordinary string. The
    // wrong way to fail is to advertise a checkout that does not exist.
    const odd = listingJsonLd({ ...listing, mode: 'Instant' }).offers as Record<string, string>;
    expect(odd.availability).toBe('https://schema.org/PreOrder');
  });

  it('claims no ratings while the ratings are placeholders', () => {
    // The stars on the card are sample data from lib/site-data.js. On screen that reads as
    // placeholder; in structured data it is a claim to Google that we collected reviews we
    // did not. Goes in with M4.7, not before.
    expect(JSON.stringify(listingJsonLd(listing))).not.toContain('aggregateRating');
  });

  it('numbers a breadcrumb trail from one and resolves each item absolutely', () => {
    const crumbs = breadcrumbJsonLd([
      ['Home', '/'],
      ['Tours', '/search'],
      ['Cox’s Bazar Houseboat Day Tour', '/tours/coxs-bazar-houseboat-day-tour'],
    ]).itemListElement as Array<{ position: number; item: string; name: string }>;

    expect(crumbs.map((c) => c.position)).toEqual([1, 2, 3]);
    expect(crumbs[0].item).toBe('https://yestourbd.com');
    expect(crumbs[2].item).toBe('https://yestourbd.com/tours/coxs-bazar-houseboat-day-tour');
  });
});
