import { Button } from '@/components/ui/button'
import SectionAccent from '@/components/SectionAccent'
import { INSTAGRAM_URL } from '@/constants/nav'
import work01 from '@/assets/instagram/work-01.jpg'
import work02 from '@/assets/instagram/work-02.jpg'
import work03 from '@/assets/instagram/work-03.jpg'
import work04 from '@/assets/instagram/work-04.jpg'
import work05 from '@/assets/instagram/work-05.jpg'
import work06 from '@/assets/instagram/work-06.jpg'
import work07 from '@/assets/instagram/work-07.jpg'
import work08 from '@/assets/instagram/work-08.jpg'

// Deliberately not the live Instagram API — see README "Architecture notes".
// A curated grid the studio updates manually gives more control over which
// work represents the brand, without OAuth/token-refresh maintenance.
//
// Real photos from Bobby (2026-07-19), sourced from his personal work, not
// yet the studio's own Instagram (@bobbys.tattoo has no posts yet). Tiles
// still link to the studio profile, not individual posts on his personal
// account — keeps the new studio identity separate from his personal one,
// which is the whole point of this being a separate site. Swap these for
// real studio-account photos once that account has some.
const WORK_PHOTOS = [
  { src: work01, alt: 'Fine-line kookaburra tattoo behind the ear' },
  { src: work02, alt: 'Fine-line falling figure tattoo on the forearm' },
  { src: work03, alt: 'Horse and script lettering tattoo on the chest' },
  { src: work04, alt: 'Armoured figure tattoo sleeve on the upper arm' },
  { src: work05, alt: 'Two birds in flight tattoo on the shoulder' },
  { src: work06, alt: 'Snake tattoo across the collarbone' },
  { src: work07, alt: 'Spartan warrior tattoo on the arm' },
  { src: work08, alt: 'Sunburst eye tattoo on the forearm' },
]

export default function InstagramGrid() {
  return (
    <section className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Recent Work</h2>
        <SectionAccent className="mt-3" />
        <p className="mt-3 text-muted-foreground">
          A selection of recent work from the studio. Follow Instagram for the latest pieces.
        </p>

        {/* 2 columns on small screens so tiles stay a reasonable tap size,
            4 from `sm:` up — the fixed 4-col grid was too cramped on mobile. */}
        <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {WORK_PHOTOS.map((photo) => (
            <a
              key={photo.src}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="aspect-square overflow-hidden rounded-md bg-muted transition-opacity hover:opacity-80"
            >
              <img src={photo.src} alt={photo.alt} className="size-full object-cover" />
            </a>
          ))}
        </div>

        <Button
          variant="outline"
          className="mt-8"
          nativeButton={false}
          render={<a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" />}
        >
          Follow on Instagram
        </Button>
      </div>
    </section>
  )
}
