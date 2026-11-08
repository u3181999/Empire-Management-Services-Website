// Automatic Australian cleaning headlines (INCLEAN, plus ABC News and 7NEWS when they run a cleaning story)
// from the publishers' own public RSS feeds.
// We only keep the headline, a short teaser, the date and a link back to the
// publisher's article (never the article text), and always credit the source.
// To add another Australian publisher, add a line to FEEDS (WordPress sites use <site>/feed/).

export type NewsItem = {
  title: string
  url: string
  source: string
  publishedAt: Date
  summary: string
}

type Feed = {
  name: string
  url: string
  /** Each feed page holds only a few stories, so some feeds are read over several pages. */
  pages: number
  /** General news feeds: only keep stories that match this (i.e. are really about cleaning). */
  require?: RegExp
}

// ABC and 7NEWS only publish a general news feed (no search), so they are filtered down to genuine
// cleaning stories. Such stories are rare, so INCLEAN does most of the work. 9News has no public feed.
export const CLEANING_STORY = /\b(commercial cleaning|cleaning (industry|company|companies|contractors?|services?|staff|workers?|sector)|cleaners?|janitors?)\b/i

const FEEDS: Feed[] = [
  { name: 'INCLEAN', url: 'https://incleanmag.com.au/feed/', pages: 4 },
  { name: 'ABC News', url: 'https://www.abc.net.au/news/feed/45910/rss.xml', pages: 1, require: CLEANING_STORY },
  { name: 'ABC News', url: 'https://www.abc.net.au/news/feed/51120/rss.xml', pages: 1, require: CLEANING_STORY },
  { name: '7NEWS', url: 'https://7news.com.au/rss', pages: 1, require: CLEANING_STORY },
]

const REVALIDATE_SECONDS = 3 * 60 * 60 // refresh about every 3 hours
const MAX_AGE_DAYS = 60
const MAX_PER_SOURCE = 12 // keeps one publisher from filling the page once there are several

// Skip stories that would not look right on a company website: bad-news, court and
// enforcement stories, and politics.
const BLOCKED =
  /\b(lawsuits?|sued|sues|recalls?|deaths?|died|dies|killed|kills|injur\w*|poison\w*|fatal\w*|arrest\w*|scandal|bankrupt\w*|layoffs?|fraud|abuse|assault\w*|mistaken|outbreaks?|contaminat\w*|hospitali[sz]ed|sentenced|convict\w*|jail\w*|prosecut\w*|fined|guilty|court|underpa\w*|wage theft|exploit\w*|midterms?|elections?|democrats?|republicans?|congress\w*|senate|white house|trump|biden|tariffs?)\b/i

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  hellip: '…',
  rsquo: '’',
  lsquo: '‘',
  rdquo: '”',
  ldquo: '“',
  ndash: '–',
  mdash: '—',
}

function decodeEntities(text: string) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity: string) => {
    if (entity[0] === '#') {
      const code = entity[1].toLowerCase() === 'x' ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10)
      return Number.isFinite(code) && code > 0 && code < 0x110000 ? String.fromCodePoint(code) : ''
    }
    return NAMED_ENTITIES[entity.toLowerCase()] ?? match
  })
}

// Pull the text of one tag out of an RSS <item> block as plain text.
function tagText(block: string, name: string) {
  const match = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, 'i'))
  if (!match) return ''
  const withoutCdata = match[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
  return decodeEntities(withoutCdata.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim()
}

function teaser(description: string) {
  const cleaned = description
    .replace(/The post .* appeared first on .*$/i, '')
    .replace(/\[…\]|\[\.\.\.\]|Read more.*$/i, '')
    .trim()
  if (cleaned.length <= 170) return cleaned
  const cut = cleaned.slice(0, 170)
  return `${cut.slice(0, Math.max(cut.lastIndexOf(' '), 100))}…`
}

// Only accept links that stay on the publisher's own website.
function safeLink(link: string, feedUrl: string) {
  try {
    const url = new URL(link)
    const host = url.hostname.replace(/^www\./, '')
    const feedHost = new URL(feedUrl).hostname.replace(/^www\./, '')
    if (!/^https?:$/.test(url.protocol)) return null
    if (host !== feedHost && !host.endsWith(`.${feedHost}`)) return null
    return url.toString()
  } catch {
    return null
  }
}

export function parseFeed(xml: string, feed: { name: string; url: string }): NewsItem[] {
  return xml
    .split(/<item[\s>]/i)
    .slice(1)
    .flatMap((block) => {
      const title = tagText(block, 'title')
      const url = safeLink(tagText(block, 'link'), feed.url)
      const publishedAt = new Date(tagText(block, 'pubDate'))
      if (!title || !url || Number.isNaN(publishedAt.getTime())) return []
      return [
        {
          title,
          url,
          source: feed.name,
          publishedAt,
          summary: teaser(tagText(block, 'description')),
        },
      ]
    })
}

async function fetchFeed(feed: Feed): Promise<NewsItem[]> {
  const pages = await Promise.all(
    Array.from({ length: feed.pages }, (_, i) => fetchFeedPage(feed, i === 0 ? feed.url : `${feed.url}?paged=${i + 1}`))
  )
  const { require } = feed
  return require ? pages.flat().filter((item) => require.test(`${item.title} ${item.summary}`)) : pages.flat()
}

async function fetchFeedPage(feed: Feed, url: string): Promise<NewsItem[]> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; EmpireManagementBot/1.0; +https://empirecleaning.com.au)',
        Accept: 'application/rss+xml, application/xml, text/xml',
      },
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) return []
    const xml = await res.text()
    if (xml.length > 2_000_000) return []
    return parseFeed(xml, feed)
  } catch {
    return []
  }
}

export async function getCleaningNews(limit = 5): Promise<NewsItem[]> {
  const results = await Promise.all(FEEDS.map(fetchFeed))
  const oldest = Date.now() - MAX_AGE_DAYS * 24 * 60 * 60 * 1000
  const seen = new Set<string>()
  const perSource = new Map<string, number>()

  return results
    .flat()
    .filter((item) => item.publishedAt.getTime() >= oldest)
    .filter((item) => !BLOCKED.test(`${item.title} ${item.summary}`))
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .filter((item) => {
      const key = item.url.replace(/[?#].*$/, '')
      if (seen.has(key)) return false
      seen.add(key)
      const count = perSource.get(item.source) ?? 0
      if (count >= MAX_PER_SOURCE) return false
      perSource.set(item.source, count + 1)
      return true
    })
    .slice(0, limit)
}
