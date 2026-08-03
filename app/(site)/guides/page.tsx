import type { Metadata } from "next";
import { HomeScreen } from "@/components/screens/HomeScreen.jsx";

export const metadata: Metadata = {
  title: "Travel guides — YesTourBD",
};

// Placeholder, matching the UI kit: no travel-guide screen was designed, so its nav item
// falls back to the home page rather than inventing a layout for it.
export default function Page() {
  return <HomeScreen />;
}
