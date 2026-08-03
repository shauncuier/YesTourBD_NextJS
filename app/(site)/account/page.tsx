import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AccountScreen } from "@/components/screens/AccountScreen.jsx";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "My bookings — YesTourBD",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await auth();
  // The redirect carries where they were going, so signing in lands them back here rather
  // than on the home page.
  if (!session?.user) redirect("/signin?next=%2Faccount");

  // The screen still renders placeholder data — wiring it to this customer's real requests
  // is M2.3.
  return <AccountScreen />;
}
