import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from '@/constants/seo'

// Per-page <title>/meta, canonical URL, and Open Graph/Twitter tags. Every
// route in PublicLayout renders this once. `noindex` is used for pages that
// exist but shouldn't show up in search results (404s, and the hidden
// consent form, which is reachable only via its direct QR-code URL).
export default function Seo({ title, description = DEFAULT_DESCRIPTION, noindex = false }) {
  const { pathname } = useLocation()
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const canonicalUrl = `${SITE_URL}${pathname === '/' ? '' : pathname}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}
