import { SiteHeader, SiteFooter, ContactDock } from "@/components/site/chrome.jsx";

// The customer-facing chrome. Everything under (site) gets it; /admin does not — it has its
// own shell, and the marketing header around a staff panel was a real bug, not a nicety.
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
      <ContactDock />
    </>
  );
}
