import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import RouteFallback from '@/components/RouteFallback'

// Home and NotFound stay eager — Home is what most visits land on (no
// benefit to a network round-trip before showing it), and NotFound is used
// directly as a fallback component inside other pages, not just via routing.
// Everything else is code-split per route so the initial bundle only pays
// for what a typical first visit (the homepage) actually needs.
const Artists = lazy(() => import('@/pages/Artists'))
// ArtistDetail disabled 2026-07-15 — Artists is a "Coming Soon" placeholder
// with no links to it, so this route would be orphaned. Restore alongside
// Artists.jsx's real implementation once there are actual artists.
// const ArtistDetail = lazy(() => import('@/pages/ArtistDetail'))
const Inquiry = lazy(() => import('@/pages/Inquiry'))
const Faq = lazy(() => import('@/pages/Faq'))
const Blog = lazy(() => import('@/pages/Blog'))
const BlogPost = lazy(() => import('@/pages/BlogPost'))
const Aftercare = lazy(() => import('@/pages/Aftercare'))
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'))
const Terms = lazy(() => import('@/pages/Terms'))
const Consent = lazy(() => import('@/pages/Consent'))

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/artists', element: <Artists /> },
      // { path: '/artists/:slug', element: <ArtistDetail /> },
      { path: '/inquiry', element: <Inquiry /> },
      { path: '/faq', element: <Faq /> },
      { path: '/blog', element: <Blog /> },
      { path: '/blog/:slug', element: <BlogPost /> },
      { path: '/aftercare', element: <Aftercare /> },
      { path: '/privacy-policy', element: <PrivacyPolicy /> },
      { path: '/terms', element: <Terms /> },
    ],
  },
  // Standalone: no nav/footer chrome, reached only via the in-studio QR code.
  // Not inside PublicLayout, so it needs its own Suspense boundary.
  {
    path: '/consent',
    element: (
      <RouteFallback>
        <Consent />
      </RouteFallback>
    ),
  },
  { path: '*', element: <NotFound /> },
])
