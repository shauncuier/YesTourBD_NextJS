/// The one place structured data is written into the page. A server component: none of this
/// is interactive, and shipping a schema.org blob to the client would be pure weight.

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // `<` is escaped rather than serialised literally. Listing titles and service copy are
      // editable content, and a `</script>` inside any of them would otherwise close this
      // tag and put whatever followed into the document as markup. JSON.stringify does not
      // do this for you.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
