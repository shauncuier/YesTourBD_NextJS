import type { Metadata } from "next";
import { HomeScreen } from "@/components/screens/HomeScreen.jsx";

export const metadata: Metadata = {
  title: "Travel guides",
  description: "Trip planning notes for Cox’s Bazar, Saint Martin, Sylhet and the hill districts.",
  // Renders the home page — see below. Canonical points there until M4.3 gives this route a
  // screen of its own; until then it is duplicate content and stays out of the sitemap.
  alternates: { canonical: "/" },
};

// Placeholder, matching the UI kit: no travel-guide screen was designed, so its nav item
// falls back to the home page rather than inventing a layout for it.
export default function Page() {
  return <HomeScreen />;
}
