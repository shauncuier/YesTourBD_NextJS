import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder photography still comes from Unsplash (lib/site-data.js), and the footer's
    // social glyphs from simpleicons. Both are listed explicitly rather than by wildcard:
    // remotePatterns is what stops this app becoming an image-resizing service for anyone
    // else's files.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.simpleicons.org" },
    ],
    // AVIF first — roughly half the bytes of the JPEGs Lighthouse was complaining about, and
    // anything that cannot read it falls back to WebP.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
