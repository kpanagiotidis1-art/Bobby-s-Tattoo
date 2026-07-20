import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import ceilingPhoto from '@/assets/hero/shop-ceiling.jpg'
import logo from '@/assets/logo/logo-white.png'

// Preview only (2026-07-19) — Bobby suggested using a photo of the shop's
// pressed-tin ceiling as the hero background, with the brand's existing
// blackletter wordmark (logo-white.png, already used elsewhere for dark
// backgrounds) over the top. Not yet confirmed as final — see the previous
// version preserved below.
export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-32 text-center sm:py-40">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${ceilingPhoto})` }}
      />
      {/* Dark scrim so the white wordmark and text stay legible regardless
          of exactly which part of the photo they land on. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/45" />

      <h1 className="sr-only">Bobby&apos;s Tattoo Studio</h1>
      <img src={logo} alt="" className="mx-auto h-16 w-auto sm:h-20" />

      <p className="mx-auto mt-5 max-w-lg text-white/90">
        A new studio built on considered, custom tattoo work. Every piece starts with a conversation.
      </p>
      <div className="mt-8">
        <Button
          size="lg"
          nativeButton={false}
          className="h-11 rounded-lg bg-white px-8 text-base text-black hover:bg-white/90"
          render={<Link to="/#contact" />}
        >
          Start Your Enquiry
        </Button>
      </div>
    </section>
  )
}

/* --- Previous version (gradient placeholder, no real photo) — kept here
   so the ceiling-photo direction above is a one-step revert. Delete
   whichever version loses once Bobby/Kosta confirm.

import SectionAccent from '@/components/SectionAccent'

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-28 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, color-mix(in oklch, var(--brand) 12%, transparent), transparent)',
        }}
      />

      <h1 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
        Bobby&apos;s Tattoo Studio
      </h1>
      <SectionAccent className="mt-5" />
      <p className="mx-auto mt-5 max-w-md text-muted-foreground">
        A new studio built on considered, custom tattoo work. Every piece starts with a conversation.
      </p>
      <div className="mt-8">
        <Button
          size="lg"
          nativeButton={false}
          className="h-11 rounded-lg px-8 text-base"
          render={<Link to="/#contact" />}
        >
          Enquire About a Tattoo
        </Button>
      </div>
    </section>
  )
}
*/
