import type { Metadata } from "next";
import { SearchScreen } from "@/components/screens/SearchScreen.jsx";

export const metadata: Metadata = {
  title: "Hotels & tours",
  description:
    "Search hotels, houseboats, resorts and day tours across Cox’s Bazar, Sylhet and Bandarban. Instant services confirm on the spot.",
  alternates: { canonical: "/search" },
};

export default function Page() {
  return <SearchScreen />;
}
