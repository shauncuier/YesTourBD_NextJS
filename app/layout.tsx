import type { Metadata } from "next";
import { Poppins, Public_Sans, Lora, IBM_Plex_Mono, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import { SiteHeader, SiteFooter, ContactDock } from "@/components/site/chrome.jsx";

// The design system flags these as substitutes for unsupplied brand fonts and loads them
// from the Google CDN. next/font self-hosts the same four families — plus Noto Sans
// Bengali, which is what actually renders ৳. See design-system/readme.md.
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
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["500", "600"],
  subsets: ["latin"],
});

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-noto-bengali",
  weight: ["400", "500", "600", "700"],
  subsets: ["bengali"],
});

export const metadata: Metadata = {
  title: "YesTourBD — all-in-one travel marketplace",
  description:
    "Hotels, houseboats, ship and air tickets you can confirm right now — plus corporate tours, packages and visa help handled by a real person.",
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
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <ContactDock />
      </body>
    </html>
  );
}
