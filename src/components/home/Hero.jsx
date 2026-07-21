import ceilingPhoto from '@/assets/hero/shop-ceiling.jpg'
import logo from '@/assets/logo/logo-white.png'

// Confirmed direction per client feedback (2026-07-20): bigger/brighter
// photo, bigger centred logo, no subheading or button — "Book Now" is now
// its own persistent nav item instead, so the hero doesn't need its own CTA.
export default function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${ceilingPhoto})` }}
      />
      {/* Lighter scrim than before — just enough to keep the logo readable
          without dimming the photo down like the original version did. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/15" />

      <h1 className="sr-only">Bobby&apos;s Tattoo Studio</h1>
      <img src={logo} alt="" className="h-28 w-auto sm:h-36" />
    </section>
  )
}
