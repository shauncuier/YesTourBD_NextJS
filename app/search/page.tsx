import type { Metadata } from "next";
import { SearchScreen } from "@/components/screens/SearchScreen.jsx";

export const metadata: Metadata = {
  title: "Hotels & tours — YesTourBD",
};

export default function Page() {
  return <SearchScreen />;
}
