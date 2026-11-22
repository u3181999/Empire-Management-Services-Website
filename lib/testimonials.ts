// What the review components need from a testimonial. Anything else on the database row (dates, publish flag, sort
// order) stays on the server and is not sent to the visitor's browser.
export type TestimonialData = {
  id: string
  rating: number
  content: string
  authorName: string
  authorTitle: string | null
  company: string | null
  source: string
  reviewUrl: string | null
}

// A quote longer than this starts shortened, with a "Read more" button that opens the rest in place.
export const PREVIEW_CHARS = 260

export function toTestimonialData(t: TestimonialData): TestimonialData {
  return {
    id: t.id,
    rating: t.rating,
    content: t.content,
    authorName: t.authorName,
    authorTitle: t.authorTitle,
    company: t.company,
    source: t.source,
    reviewUrl: t.reviewUrl,
  }
}
