import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import InstagramIcon from '@/components/icons/InstagramIcon'
import { INSTAGRAM_URL, NAV_LINKS } from '@/constants/nav'
import logo from '@/assets/logo/logo-black.png'
import logoMark from '@/assets/logo/logo-mark-white.png'

// Hash links (e.g. "Contact" -> /#contact) point at a scroll target within
// Home, not a separate route — NavLink's own active-matching only looks at
// the path, so it can't tell us when one of these is "active" (and without
// this, it wrongly matches Home's "/" too, lighting both up at once). This
// tracks whichever hash section is currently in view instead, via
// IntersectionObserver, so the nav reflects actual scroll position.
function useActiveHash() {
  const { pathname } = useLocation()
  const [activeHash, setActiveHash] = useState(null)

  useEffect(() => {
    if (pathname !== '/') {
      setActiveHash(null)
      return
    }

    const hashLinks = NAV_LINKS.filter((link) => link.to.includes('#'))
    const observers = hashLinks.map((link) => {
      const id = link.to.split('#')[1]
      const target = document.getElementById(id)
      if (!target) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          // Set it when this section comes into view, but also clear it
          // when this section leaves — otherwise it stays "active" forever
          // once first triggered, even after scrolling away or navigating
          // back to Home.
          setActiveHash((current) => {
            if (entry.isIntersecting) return id
            return current === id ? null : current
          })
        },
        { rootMargin: '-50% 0px -50% 0px' },
      )
      observer.observe(target)
      return observer
    })

    return () => observers.forEach((observer) => observer?.disconnect())
  }, [pathname])

  return activeHash
}

// Both the floating homepage bubble and the solid bar on every other page
// are dark now (contrast per client feedback 2026-07-22), so nav links are
// always light-on-dark.
const navLinkClass = (isActive) =>
  `text-sm font-medium transition-colors hover:text-background ${isActive ? 'text-background' : 'text-background/70'}`

const mobileNavLinkClass = (isActive) =>
  `block border-b border-border py-4 text-lg font-medium tracking-tight last:border-none ${
    isActive ? 'text-brand' : 'text-foreground'
  }`

function isLinkActive(link, routeIsActive, activeHash) {
  if (link.to.includes('#')) return link.to.split('#')[1] === activeHash
  // Once a section is actively in view, "Home" stands down rather than
  // staying lit alongside it — keeps exactly one nav item active at a time.
  return routeIsActive && !activeHash
}

export default function Header() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const activeHash = useActiveHash()

  return (
    <header
      className={
        isHome
          ? 'fixed inset-x-4 top-4 z-40 sm:inset-x-6'
          : 'sticky top-0 z-30 border-b border-white/10 bg-foreground/95 shadow-sm backdrop-blur'
      }
    >
      <div className={`flex items-center justify-between ${isHome ? 'h-14' : 'h-16 px-6 sm:px-8'}`}>
        {/* Its own separate little bubble, not merged with the nav's. */}
        <Link
          to="/"
          viewTransition
          className={
            isHome
              ? 'flex size-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/25 shadow-lg backdrop-blur-md'
              : 'shrink-0'
          }
        >
          <img src={logoMark} alt="Bobby's Tattoo" className="h-8 w-auto" />
        </Link>

        {/* Only the nav itself is the floating "bubble" on the homepage —
            the logo stays in its own separate bubble, not merged with this. */}
        <div
          className={
            isHome
              ? 'flex items-center gap-2 rounded-full border border-white/15 bg-black/25 p-2 shadow-lg backdrop-blur-md md:py-3 md:pr-3 md:pl-8'
              : 'contents'
          }
        >
          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                viewTransition
                className={({ isActive }) => navLinkClass(isLinkActive(link, isActive, activeHash))}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-background hover:bg-background/10 hover:text-background md:hidden"
                />
              }
            >
              <Menu />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
              <SheetHeader className="border-b border-border">
                <SheetTitle>
                  <img src={logo} alt="Bobby's Tattoo" className="h-7 w-auto" />
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-1 flex-col px-4">
                {NAV_LINKS.map((link) => (
                  <SheetClose
                    key={link.to}
                    nativeButton={false}
                    render={
                      <NavLink
                        to={link.to}
                        viewTransition
                        className={({ isActive }) =>
                          mobileNavLinkClass(isLinkActive(link, isActive, activeHash))
                        }
                      />
                    }
                  >
                    {link.label}
                  </SheetClose>
                ))}
              </nav>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 border-t border-border p-4 text-sm text-muted-foreground"
              >
                <InstagramIcon className="size-4 text-brand" />
                Instagram
              </a>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
