import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import heroImage from '@/assets/hero/hero-final.png'

// Using the client's own pre-made hero composite directly (2026-07-22) —
// photo + logo already flattened into one image with the seam positioned
// exactly between the two middle B's in "BOBBY'S".
//
// The source image is 1600x760, and the baked-in logo is only 629px wide,
// dead-centered horizontally (measured via pixel scan) — so there's ~485px
// of plain tile pattern as margin on each side. Below `md` we crop in to a
// square ratio (zooming toward the center) to get enough height for the
// tagline/button to sit inside the photo like the desktop version, without
// ever touching the logo (margin at this ratio is ~65px of the 1600px-wide
// source on each side — tight but safely clear). Pulling the button out to
// sit below the photo (an earlier attempt) read as a disconnected, choppy
// stack of bands rather than one hero, so it stays inside at every size.
// At `md` and up we open back out to the image's own native ratio, capped
// at 85vh.
export default function Hero() {
  return (
    <section className="relative flex aspect-square max-h-[85vh] w-full flex-col items-center overflow-hidden md:aspect-[1600/760]">
      <h1 className="sr-only">Bobby&apos;s Tattoo</h1>
      <img
        src={heroImage}
        alt="Bobby's Tattoo — tattoo studio interior"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/15" />

      <div className="flex-1" />
      <div className="px-6 pb-8 text-center sm:pb-12">
        <p className="text-white/90">every piece starts with a conversation</p>
        <div className="mt-4">
          <Button
            nativeButton={false}
            className="h-9 rounded-lg bg-white px-6 text-sm text-black hover:bg-white/90"
            render={<Link to="/inquiry" viewTransition />}
          >
            Start Your Inquiry
          </Button>
        </div>
      </div>
    </section>
  )
}
