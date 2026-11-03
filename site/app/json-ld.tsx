// Structured data (JSON-LD) for search and answer engines. Rendered on the server, invisible to visitors.
export default function JsonLd({ data }: { data: object[] }) {
  return (
    <>
      {data.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}
    </>
  );
}
