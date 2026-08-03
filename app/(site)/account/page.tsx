import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AccountScreen } from "@/components/screens/AccountScreen.jsx";
import { auth } from "@/auth";
import { getAccountProfile, getAccountRequests } from "@/lib/account";
import { saveProfile } from "./actions";

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

  // Scoped by user id, never by phone or a value from the URL: this is the one page where
  // getting the scope wrong shows one customer another's trip.
  const [profile, requests] = await Promise.all([
    getAccountProfile(session.user.id),
    getAccountRequests(session.user.id),
  ]);

  if (!profile) redirect("/signin?next=%2Faccount");

  return <AccountScreen profile={profile} requests={requests} saveAction={saveProfile} />;
}
