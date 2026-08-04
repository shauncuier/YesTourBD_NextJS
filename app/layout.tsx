import type { Metadata } from "next";
import { Poppins, Public_Sans, Lora, IBM_Plex_Mono, Noto_Sans_Bengali } from "next/font/google";
import { indexingAllowed, SITE_DESCRIPTION, SITE_NAME, siteUrl } from "@/lib/seo";
import "./globals.css";

// The design system flags these as substitutes for unsupplied brand fonts and loads them
// from the Google CDN. next/font self-hosts the same four families — plus Noto Sans
// Bengali, which is what actually renders ৳. See design-system/readme.md.
//
// Only the two families that set the page are preloaded. next/font preloads everything by
// default, and five families is ~209KB of font competing with the LCP image on a throttled
// connection — measurably the largest remaining cost after the images were fixed. The other
// three still load, just without a preload link jumping the queue: Lora dresses two lines of
// accent text, the mono face is for reference codes, and Bengali only has to be there by the
// time a ৳ price is on screen.
const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  style: ["normal", "italic"],
  subsets: ["latin"],
  preload: false,
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["500", "600"],
  subsets: ["latin"],
  preload: false,
});

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-noto-bengali",
  weight: ["400", "600"],
  subsets: ["bengali"],
  preload: false,
});

export const metadata: Metadata = {
  // Every relative URL below — canonicals, Open Graph images — resolves against this. Without
  // it a relative `alternates.canonical` is a build error, and an absolute one hard-codes the
  // domain into fifteen files. See lib/seo.ts for why it is not VERCEL_URL.
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${SITE_NAME} — all-in-one travel marketplace`,
    // Pages set a bare title; the brand is appended once, here, rather than in every file.
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_GB",
    title: `${SITE_NAME} — all-in-one travel marketplace`,
    description: SITE_DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — all-in-one travel marketplace`,
    description: SITE_DESCRIPTION,
  },
  // The belt to robots.txt's braces. A preview deployment that is linked to directly, or
  // reached before robots.txt is fetched, still carries `noindex` in the page itself.
  robots: indexingAllowed()
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${publicSans.variable} ${lora.variable} ${ibmPlexMono.variable} ${notoSansBengali.variable}`}
    >
      {/* Every photograph is still a placeholder served from the Unsplash CDN (see
          lib/site-data.js), so the LCP image costs a fresh DNS + TLS handshake to a third
          party. Warming the connection buys back part of that until real, self-hosted
          imagery lands. */}
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      {/* Fonts, tokens and the document shell only. The customer header, footer and contact
          dock belong to the (site) group — the admin panel has its own chrome and must not
          render the marketing one around it. */}
      <body>{children}</body>
    </html>
  );
}
