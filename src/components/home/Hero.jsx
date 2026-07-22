import heroImage from '@/assets/hero/hero-final.png'

// Using the client's own composite image directly — photo + logo already
// flattened into one image. Per client feedback 2026-07-22: the tagline and
// "Start Your Inquiry" button used to sit overlaid on the photo, but now
// live in their own section right below it (see Home.jsx) — this component
// is just the image. Also per that feedback, the hero now fills more of the
// viewport (max-h bumped up), and the dark scrim that was here for text
// legibility is gone since there's no overlaid text left to protect.
//
// The source image is 1600x760, and the baked-in logo is only 629px wide,
// dead-centered horizontally (measured via pixel scan) — so there's ~485px
// of plain tile pattern as margin on each side. Below `md` we crop in to a
// square ratio (zooming toward the center) rather than the image's native
// wide ratio, since a full-bleed crop on a narrow/tall phone screen would
// otherwise cut into the sides of the logo; the square crop still clears it
// with margin to spare.
//
// At `md` and up, the image's own native ratio (1600/760) renders shorter
// than the viewport at most desktop widths (e.g. ~684px tall at a 1440px-wide
// screen) — nowhere near "filling the page". To fill more of it per client
// feedback 2026-07-22, height is set directly (90vh) instead of derived from
// the aspect ratio, so object-cover crops the photo's top/bottom to fill that
// taller box. That's a safe direction to crop in: it never touches the
// logo's horizontal margins, only how much of the tile pattern above/below
// it shows.
export default function Hero() {
  return (
    <section className="relative aspect-square max-h-screen w-full overflow-hidden md:aspect-auto md:h-[90vh]">
      <h1 className="sr-only">Bobby&apos;s Tattoo</h1>
      <img
        src={heroImage}
        alt="Bobby's Tattoo — tattoo studio interior"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </section>
  )
}
