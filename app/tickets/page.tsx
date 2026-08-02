import type { Metadata } from "next";
import { SearchScreen } from "@/components/screens/SearchScreen.jsx";

export const metadata: Metadata = {
  title: "Tickets — YesTourBD",
};

// The design system's UI kit points its "Tickets" nav item at the same search surface as
// "Hotels & Tours". Kept as-is; give it its own screen when ticket search is designed.
export default function Page() {
  return <SearchScreen />;
}
