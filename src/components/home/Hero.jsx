import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import ceilingPhoto from '@/assets/hero/shop-ceiling.jpg'
import logo from '@/assets/logo/logo-white.png'

// Per client feedback (2026-07-20): bigger/brighter photo, bigger centred
// logo, blurb + CTA repositioned to the bottom of the hero rather than
// removed (earlier read of "drop the blurb/button" as "delete" was wrong —
// he meant reposition).
export default function Hero() {
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center overflow-hidden px-6 py-16">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-cover"
        // The source photo is portrait and its tile seam sits at ~54% of
        // its width, not exactly centre — bg-center (50%) cropped it
        // slightly off from the logo above. This aligns the seam with the
        // logo instead of the raw image midpoint.
        style={{ backgroundImage: `url(${ceilingPhoto})`, backgroundPosition: '54% center' }}
      />
      {/* Lighter scrim than the original version — just enough to keep the
          logo/text readable without dimming the photo down as much. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/15" />

      <h1 className="sr-only">Bobby&apos;s Tattoo Studio</h1>
      <div className="flex flex-1 items-center">
        <img src={logo} alt="" className="h-28 w-auto sm:h-36" />
      </div>

      <div className="pb-8 text-center">
        <p className="text-white/90">every piece starts with a conversation</p>
        <div className="mt-4">
          <Button
            size="lg"
            nativeButton={false}
            className="h-11 rounded-lg bg-white px-8 text-base text-black hover:bg-white/90"
            render={<Link to="/#contact" />}
          >
            Start Your Inquiry
          </Button>
        </div>
      </div>
    </section>
  )
}
