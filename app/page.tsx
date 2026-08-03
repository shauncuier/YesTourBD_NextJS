import { HomeScreen } from "@/components/screens/HomeScreen.jsx";
import { getServices } from "@/lib/services";

// The catalogue changes about as often as the business adds a service, so the page is
// prerendered at build and revalidated hourly rather than queried on every request.
export const revalidate = 3600;

export default async function Page() {
  const services = await getServices();

  return <HomeScreen services={services} />;
}
