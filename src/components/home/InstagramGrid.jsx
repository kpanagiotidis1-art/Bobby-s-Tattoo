import { Button } from '@/components/ui/button'
import SectionAccent from '@/components/SectionAccent'
import { INSTAGRAM_URL } from '@/constants/nav'

// Deliberately not the live Instagram API — see README "Architecture notes".
// A curated grid the studio updates manually gives more control over which
// work represents the brand, without OAuth/token-refresh maintenance.
const PLACEHOLDER_TILES = Array.from({ length: 8 }, (_, i) => i)

export default function InstagramGrid() {
  return (
    <section className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Recent Work</h2>
        <SectionAccent className="mt-3" />
        <p className="mt-3 text-muted-foreground">Follow along on Instagram for the latest pieces.</p>

        {/* 2 columns on small screens so tiles stay a reasonable tap size,
            4 from `sm:` up — the fixed 4-col grid was too cramped on mobile. */}
        <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {PLACEHOLDER_TILES.map((tile) => (
            <a
              key={tile}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="aspect-square rounded-md bg-muted transition-opacity hover:opacity-80"
              aria-label="View on Instagram"
            />
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
