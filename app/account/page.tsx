import type { Metadata } from "next";
import { AccountScreen } from "@/components/screens/AccountScreen.jsx";

export const metadata: Metadata = {
  title: "My bookings — YesTourBD",
};

export default function Page() {
  return <AccountScreen />;
}
