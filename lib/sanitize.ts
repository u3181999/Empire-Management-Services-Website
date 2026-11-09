import sanitizeHtml from 'sanitize-html'

/**
 * Cleans blog post HTML before it is shown. Posts are written by staff in the admin editor, but the HTML is still
 * treated as untrusted: anything not listed here (scripts, iframes, forms, event handlers such as onclick/onerror,
 * javascript: links, inline styles) is removed.
 *
 * Used by the public post page and by the admin editor's preview, so the preview shows exactly what visitors get.
 * Pure JavaScript on purpose: the previous sanitiser needed a full browser emulator (jsdom) on the server, which
 * crashed on Vercel and made every blog post return a server error.
 */
const options: sanitizeHtml.IOptions = {
  // The library's safe defaults (headings, paragraphs, lists, links, tables, quotes, code...) plus images.
  allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img'],
  allowedAttributes: {
    a: ['href', 'title', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
    // Table layout hints only.
    td: ['colspan', 'rowspan'],
    th: ['colspan', 'rowspan'],
  },
  // No javascript:, data: or file: links or images.
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  allowedSchemesByTag: { img: ['http', 'https'] },
  allowProtocolRelative: false,
  transformTags: {
    // A link that opens a new tab must not be able to control the page it came from.
    a: (tagName, attribs) => ({
      tagName,
      attribs: attribs.target === '_blank' ? { ...attribs, rel: 'noopener noreferrer' } : attribs,
    }),
  },
}

export function sanitizeBlogHtml(html: string): string {
  return sanitizeHtml(html, options)
}
