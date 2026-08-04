import { HomeScreen } from "@/components/screens/HomeScreen.jsx";
import { JsonLd } from "@/components/site/json-ld";
import { organizationJsonLd } from "@/lib/seo";
import { getServices } from "@/lib/services";

// The catalogue changes about as often as the business adds a service, so the page is
// prerendered at build and revalidated hourly rather than queried on every request.
export const revalidate = 3600;

export default async function Page() {
  const services = await getServices();

  return (
    <>
      {/* Once, on the home page. Repeating the organisation on every route tells a crawler
          the same thing twelve times and says nothing extra. */}
      <JsonLd data={organizationJsonLd()} />
      <HomeScreen services={services} />
    </>
  );
}
