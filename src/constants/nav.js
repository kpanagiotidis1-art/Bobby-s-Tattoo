// Primary nav: pages + the homepage's contact section.
// "/#contact" works from any route — PublicLayout scrolls to the hash on navigation.
// "Contact" scrolls to the address/hours section on Home; "Book Now" is the
// separate inquiry form page (per client feedback 2026-07-20 — the form
// used to live inline on Home, under the same #contact section).
export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Artists', to: '/artists' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Aftercare', to: '/aftercare' },
  { label: 'Contact', to: '/#contact' },
  { label: 'Book Now', to: '/inquiry' },
]

// Secondary links: not part of primary nav per the client's request,
// but still discoverable from the footer.
export const FOOTER_LINKS = [{ label: 'Blog', to: '/blog' }]

export const INSTAGRAM_URL = 'https://instagram.com/bobbys.tattoo'
// Confirmed 2026-07-13: dedicated studio inbox, not his personal address.
// Inquiries, customer emails, and consent form submissions all route here
// once Supabase/email sending is wired up.
export const CONTACT_EMAIL = 'hello@bobbystattoo.com'
