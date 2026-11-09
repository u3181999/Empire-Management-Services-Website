type Thing = Record<string, unknown>

/**
 * Renders schema.org structured data as a JSON-LD <script>. Pass one object, or several to be grouped
 * into a single @graph. "<" is escaped so text from the database (a blog title, say) can never close
 * the script tag early.
 */
export default function JsonLd({ data }: { data: Thing | Thing[] }) {
  const json = Array.isArray(data)
    ? { '@context': 'https://schema.org', '@graph': data }
    : { '@context': 'https://schema.org', ...data }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json).replace(/</g, String.fromCharCode(92) + 'u003c') }}
    />
  )
}
