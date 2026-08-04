import type { Metadata } from "next";
import { SearchScreen } from "@/components/screens/SearchScreen.jsx";

export const metadata: Metadata = {
  title: "Tickets",
  description: "Ship, air and bus tickets across Bangladesh, bookable without a phone call.",
  // Byte-for-byte the same screen as /search until ticket search is designed. Two URLs
  // serving one page is duplicate content, so this one points at the original rather than
  // competing with it — and it is left out of the sitemap for the same reason.
  alternates: { canonical: "/search" },
};

// The design system's UI kit points its "Tickets" nav item at the same search surface as
// "Hotels & Tours". Kept as-is; give it its own screen when ticket search is designed.
export default function Page() {
  return <SearchScreen />;
}
