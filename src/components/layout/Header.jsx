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

const navLinkClass = (isActive) =>
  `text-sm font-medium transition-colors hover:text-foreground ${
    isActive ? 'text-foreground' : 'text-muted-foreground'
  }`

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
  const activeHash = useActiveHash()

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="shrink-0">
          <img src={logo} alt="Bobby's Tattoo Studio" className="h-8 w-auto" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => navLinkClass(isLinkActive(link, isActive, activeHash))}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Sheet>
          <SheetTrigger
            render={<Button variant="ghost" size="icon" className="md:hidden" />}
          >
            <Menu />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent className="flex flex-col">
            <SheetHeader className="border-b border-border">
              <SheetTitle>
                <img src={logo} alt="Bobby's Tattoo Studio" className="h-7 w-auto" />
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
    </header>
  )
}
