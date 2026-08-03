import type { Metadata } from "next";
import { DetailScreen } from "@/components/screens/DetailScreen.jsx";
import { LISTINGS, listingBySlug } from "@/lib/site-data.js";

export function generateStaticParams() {
  return LISTINGS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata(props: PageProps<'/tours/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params;
  const listing = listingBySlug(slug);
  return {
    title: `${listing.title} — YesTourBD`,
    description: `${listing.place} · ৳${listing.price.toLocaleString("en-US")} per person.`,
  };
}

export default async function Page(props: PageProps<'/tours/[slug]'>) {
  const { slug } = await props.params;
  return <DetailScreen listing={listingBySlug(slug)} />;
}
