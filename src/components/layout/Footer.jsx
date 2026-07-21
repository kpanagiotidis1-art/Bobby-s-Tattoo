import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import InstagramIcon from '@/components/icons/InstagramIcon'
import { CONTACT_EMAIL, FOOTER_LINKS, INSTAGRAM_URL, NAV_LINKS } from '@/constants/nav'
import {
  ABN,
  GOOGLE_MAPS_URL,
  LEGAL_ENTITY_NAME,
  STUDIO_ADDRESS,
  STUDIO_HOURS,
  STUDIO_PHONE,
  STUDIO_PHONE_TEL,
} from '@/constants/business'
import logo from '@/assets/logo/logo-black.png'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:justify-between">
        <div>
          <img src={logo} alt="Bobby's Tattoo Studio" className="h-7 w-auto" />
          <p className="mt-3 text-sm text-muted-foreground">Walk-ins Welcome</p>
          <p className="text-sm text-muted-foreground">For a Consultation - please email</p>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-3 flex w-fit items-start gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
            {STUDIO_ADDRESS}
          </a>
          <p className="text-sm text-muted-foreground">{STUDIO_HOURS}</p>
          <a href={`tel:${STUDIO_PHONE_TEL}`} className="mt-1 block w-fit text-sm text-muted-foreground hover:text-foreground">
            {STUDIO_PHONE}
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="mt-1 block w-fit text-sm text-muted-foreground hover:text-foreground">
            {CONTACT_EMAIL}
          </a>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          {[...NAV_LINKS, ...FOOTER_LINKS].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="inline-flex items-center text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
          >
            <InstagramIcon className="size-4 text-brand" />
            Instagram
          </a>
        </nav>
      </div>

      <div className="border-t border-border px-6 py-4">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} Bobby&apos;s Tattoo Studio ({LEGAL_ENTITY_NAME}, ABN {ABN}). All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
