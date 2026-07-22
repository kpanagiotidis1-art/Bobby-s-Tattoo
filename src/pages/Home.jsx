import { Link } from 'react-router-dom'
import Seo from '@/components/Seo'
import SectionAccent from '@/components/SectionAccent'
import { Button } from '@/components/ui/button'
import Hero from '@/components/home/Hero'
import About from '@/components/home/About'
import InstagramGrid from '@/components/home/InstagramGrid'
import ReviewsCta from '@/components/home/ReviewsCta'
import { GOOGLE_MAPS_URL, STUDIO_ADDRESS, STUDIO_HOURS, STUDIO_PHONE, STUDIO_PHONE_TEL } from '@/constants/business'
import { CONTACT_EMAIL } from '@/constants/nav'

export default function Home() {
  return (
    <>
      <Seo />
      <Hero />

      <About />
      <InstagramGrid />
      <ReviewsCta />

      {/* The inquiry form itself now lives on its own page (/inquiry) per
          client feedback 2026-07-20 — this section keeps the address/hours
          and links out to it, rather than embedding the form inline. */}
      <section id="contact" className="scroll-mt-20 border-t border-border px-6 py-24 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">get in touch</h2>
        <SectionAccent className="mt-3" />
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          tell us about the tattoo you have in mind. we review every inquiry personally and reply by
          email — this isn&apos;t a booking system, so nothing is confirmed until we&apos;ve spoken.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">walk-ins welcome</p>
        <p className="text-sm text-muted-foreground">for a consultation - please email</p>
        <div className="mx-auto mt-6 flex max-w-lg flex-col items-center gap-2 text-sm text-muted-foreground">
          <p>{STUDIO_ADDRESS}</p>
          <p>{STUDIO_HOURS}</p>
          <a href={`tel:${STUDIO_PHONE_TEL}`} className="hover:text-foreground">
            {STUDIO_PHONE}
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-foreground">
            {CONTACT_EMAIL}
          </a>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button
            nativeButton={false}
            className="bg-foreground text-background hover:bg-foreground/90"
            render={<Link to="/inquiry" viewTransition />}
          >
            book here
          </Button>
          <Button
            variant="outline"
            nativeButton={false}
            render={<a href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer" />}
          >
            get directions
          </Button>
        </div>
      </section>
    </>
  )
}
