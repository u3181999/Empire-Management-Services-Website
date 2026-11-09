// Visitor's cookie/analytics choice. Stored in one small cookie; shared by the banner and the analytics gate.
export const CONSENT_COOKIE = 'empire_cookie_consent'
export const CONSENT_EVENT = 'empire:consent-changed'

export type ConsentChoice = 'accepted' | 'declined'
