import { SiteHeader, SiteFooter, ContactDock } from "@/components/site/chrome.jsx";
import { auth } from "@/auth";

// The customer-facing chrome. Everything under (site) gets it; /admin does not — it has its
// own shell, and the marketing header around a staff panel was a real bug, not a nicety.
export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Only the server can read a session, so the header is told rather than asking.
  const session = await auth();

  return (
    <>
      <SiteHeader signedIn={Boolean(session?.user)} />
      {children}
      <SiteFooter />
      <ContactDock />
    </>
  );
}
