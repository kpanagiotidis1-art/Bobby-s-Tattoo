// Confirmed by the client 2026-07-13. Legal entity/ABN required on AU
// consumer-facing terms/privacy pages and useful in the footer for trust.
export const LEGAL_ENTITY_NAME = 'Acson Enterprises Pty Ltd'
export const ABN = '54 677 522 548'

export const STUDIO_ADDRESS = '100 Oxford Street, Oxford & Foley Precinct, Darlinghurst NSW 2010'
export const STUDIO_HOURS = 'Monday – Sunday, 10am – 7pm'

// Discrete address fields for structured data (LocalBusiness JSON-LD) —
// kept separate from the display string above so schema.org's PostalAddress
// doesn't need to parse it back apart.
export const STUDIO_ADDRESS_PARTS = {
  streetAddress: '100 Oxford Street',
  addressLocality: 'Darlinghurst',
  addressRegion: 'NSW',
  postalCode: '2010',
  addressCountry: 'AU',
}

// Target launch is the week of 20 July 2026 — tight turnaround, backend
// (Supabase) work should be prioritized accordingly.
export const TARGET_OPEN_DATE = '2026-07-20'

// Link out to Google Maps rather than an embedded iframe — an embed would
// load Google's own tracking cookies, contradicting the Privacy Policy's
// "We do not use cookies" claim (kept verbatim from the client's original at
// his request). Revisit if he wants a real embed — that needs a matching
// privacy policy update disclosing the third-party cookie.
export const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(STUDIO_ADDRESS)}`
