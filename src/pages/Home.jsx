import { Link } from 'react-router-dom'
import Seo from '@/components/Seo'
import SectionAccent from '@/components/SectionAccent'
import { Button } from '@/components/ui/button'
import Hero from '@/components/home/Hero'
import About from '@/components/home/About'
import InstagramGrid from '@/components/home/InstagramGrid'
import ReviewsCta from '@/components/home/ReviewsCta'
import { GOOGLE_MAPS_URL, STUDIO_ADDRESS, STUDIO_HOURS, STUDIO_PHONE, STUDIO_PHONE_TEL } from '@/constants/business'

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
          Tell us about the tattoo you have in mind. We review every inquiry personally and reply by
          email — this isn&apos;t a booking system, so nothing is confirmed until we&apos;ve spoken.
        </p>
        <div className="mx-auto mt-10 flex max-w-lg flex-col items-center gap-2 text-sm text-muted-foreground">
          <p>{STUDIO_ADDRESS}</p>
          <p>{STUDIO_HOURS}</p>
          <a href={`tel:${STUDIO_PHONE_TEL}`} className="hover:text-foreground">
            {STUDIO_PHONE}
          </a>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button nativeButton={false} render={<Link to="/inquiry" />}>
            Book Here
          </Button>
          <Button
            variant="outline"
            nativeButton={false}
            render={<a href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer" />}
          >
            Get Directions
          </Button>
        </div>
      </section>
    </>
  )
}
