/**
 * Renders a JSON-LD block. Kept as a server component with no client JS.
 *
 * Note on escaping: JSON.stringify output is injected into a <script> tag, so a
 * "</script>" sequence inside any string value would break out of the tag. We
 * escape the "<" to its unicode form, which is still valid JSON and parses to
 * the same string, but can't terminate the element.
 */
export default function JsonLd({ schema }: { schema: Record<string, unknown> }) {
  const json = JSON.stringify(schema).replace(/</g, "\\u003c");

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
