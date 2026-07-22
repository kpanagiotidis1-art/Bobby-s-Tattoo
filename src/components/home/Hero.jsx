import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import heroImage from '@/assets/hero/hero-final.png'
import heroImageMobile from '@/assets/hero/hero-final-mobile.png'

// Full-screen hero on every viewport, tagline/button overlaid at the bottom
// of the photo, per client feedback 2026-07-22.
//
// Two source images, swapped by aspect ratio (see `.hero-fill`/`.hero-img-*`
// in index.css): hero-final.png is the client's own composite, logo baked in
// at 629px wide — safe to crop tightly only down to roughly a square aspect
// ratio before the sides clip into it. A true full-screen crop on a narrow
// phone needs the visible slice of the photo to narrow to ~350px, well under
// that. hero-final-mobile.png solves this properly instead of compromising
// on "full screen": built from the client's raw, un-composited ceiling photo
// (same shot, re-cropped and colour-matched to the approved grade) with the
// logo scaled down to 280px and re-centered on the same seam — small enough
// to survive a true full-screen crop on any phone with real margin to
// spare. Desktop/landscape keeps the original at full logo size.
export default function Hero() {
  return (
    <section className="hero-fill relative flex w-full flex-col items-center overflow-hidden">
      <h1 className="sr-only">Bobby&apos;s Tattoo</h1>
      <img
        src={heroImage}
        alt="Bobby's Tattoo — tattoo studio interior"
        className="hero-img-wide absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <img
        src={heroImageMobile}
        alt="Bobby's Tattoo — tattoo studio interior"
        className="hero-img-mobile absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/15" />

      <div className="flex-1" />
      <div className="px-6 pb-8 text-center sm:pb-12">
        <p className="text-white/90">every piece starts with a conversation</p>
        <div className="mt-4">
          <Button
            nativeButton={false}
            className="h-9 rounded-lg bg-white px-6 text-sm text-foreground hover:bg-white/90"
            render={<Link to="/inquiry" viewTransition />}
          >
            start your inquiry
          </Button>
        </div>
      </div>
    </section>
  )
}
