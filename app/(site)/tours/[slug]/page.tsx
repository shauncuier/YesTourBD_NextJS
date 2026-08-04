import type { Metadata } from "next";
import { DetailScreen } from "@/components/screens/DetailScreen.jsx";
import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbJsonLd, listingJsonLd } from "@/lib/seo";
import { LISTINGS, listingBySlug } from "@/lib/site-data.js";

export function generateStaticParams() {
  return LISTINGS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata(props: PageProps<'/tours/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params;
  const listing = listingBySlug(slug);

  // A search result gets about 155 characters. "Cox’s Bazar · ৳3,200 per person." used all of
  // thirty of them and told a reader nothing they could not see in the title, so the tags and
  // the booking mode go in — the mode being the one thing that changes what happens next.
  const detail = listing.tags?.length ? ` ${listing.tags.join(", ")}.` : "";
  const description =
    `${listing.place} · ৳${listing.price.toLocaleString("en-US")} per person.${detail} ` +
    (listing.mode === "instant"
      ? "Confirm online in minutes."
      : "Send a request and a coordinator replies within two working hours.");

  return {
    title: listing.title,
    description,
    alternates: { canonical: `/tours/${listing.slug}` },
    openGraph: {
      type: "website",
      title: listing.title,
      description,
      url: `/tours/${listing.slug}`,
      images: [{ url: listing.img, alt: listing.title }],
    },
    twitter: { card: "summary_large_image", title: listing.title, description, images: [listing.img] },
  };
}

export default async function Page(props: PageProps<'/tours/[slug]'>) {
  const { slug } = await props.params;
  const listing = listingBySlug(slug);

  return (
    <>
      <JsonLd data={listingJsonLd(listing)} />
      {/* The trail the header does not draw. Search results show it whether or not the page
          does, so it should match where the listing actually sits. */}
      <JsonLd
        data={breadcrumbJsonLd([
          ["Home", "/"],
          ["Hotels & tours", "/search"],
          [listing.title, `/tours/${listing.slug}`],
        ])}
      />
      <DetailScreen listing={listing} />
    </>
  );
}
