import { Helmet } from 'react-helmet-async'
import { CONTACT_EMAIL, INSTAGRAM_URL } from '@/constants/nav'
import { SITE_NAME, SITE_URL } from '@/constants/seo'
import { STUDIO_ADDRESS_PARTS } from '@/constants/business'

// Site-wide LocalBusiness structured data (JSON-LD) — helps Google understand
// this is a real local business for map/local-pack results. Rendered once in
// PublicLayout, not on the standalone Consent route (which is noindexed
// anyway). Phone number omitted until the client provides one — better to
// leave it out than publish a wrong one.
export default function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    address: {
      '@type': 'PostalAddress',
      ...STUDIO_ADDRESS_PARTS,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '10:00',
      closes: '19:00',
    },
    sameAs: [INSTAGRAM_URL],
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}
