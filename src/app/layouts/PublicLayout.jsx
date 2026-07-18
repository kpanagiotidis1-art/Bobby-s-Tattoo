import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import LocalBusinessSchema from '@/components/LocalBusinessSchema'
import RouteFallback from '@/components/RouteFallback'

// Links like "/#contact" navigate here from any route (e.g. FAQ -> Home#contact).
// React Router doesn't scroll to hash targets on its own, so we do it manually.
function useScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 })
      return
    }
    const target = document.getElementById(hash.slice(1))
    target?.scrollIntoView({ behavior: 'smooth' })
  }, [pathname, hash])
}

export default function PublicLayout() {
  useScrollToHash()

  return (
    <div className="flex min-h-svh flex-col">
      <LocalBusinessSchema />
      {/* Hidden until focused — lets keyboard/screen-reader users jump past
          the nav instead of tabbing through every link on every page load. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        <RouteFallback>
          <Outlet />
        </RouteFallback>
      </main>
      <Footer />
    </div>
  )
}
