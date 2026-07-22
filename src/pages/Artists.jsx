// import { Link } from 'react-router-dom'
import Seo from '@/components/Seo'
// import { ARTISTS } from '@/constants/artists'

// Client decision (2026-07-15): pulled the artists section back to "Coming
// Soon" for launch — the team isn't locked in yet. The real grid below is
// commented out, not deleted, so this is a quick swap-back once there are
// real artists in src/constants/artists.js. Matches the ArtistDetail route
// being disabled in src/app/routes.jsx for the same reason.
export default function Artists() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-32 text-center">
      <Seo
        title="Our Artists"
        description="Meet the artists at Bobby's Tattoo in Darlinghurst, Sydney — coming soon."
        noindex
      />
      <h1 className="text-3xl font-semibold tracking-tight">our artists</h1>
      <p className="mt-3 text-muted-foreground">coming soon — check back once our team is announced.</p>
    </section>
  )

  /* Real implementation — restore once artists exist:
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <Seo
        title="Our Artists"
        description="Meet the artists at Bobby's Tattoo in Darlinghurst, Sydney and find the right fit for your next tattoo."
      />
      <h1 className="text-center text-3xl font-semibold tracking-tight">our artists</h1>
      <p className="mt-3 text-center text-muted-foreground">meet the team and find the right fit for your idea.</p>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {ARTISTS.map((artist) => (
          <Link key={artist.slug} to={`/artists/${artist.slug}`} className="group text-center">
            <div className="aspect-square w-full rounded-xl bg-muted transition-opacity group-hover:opacity-80" />
            <h2 className="mt-4 text-lg font-semibold tracking-tight">{artist.name}</h2>
            <div className="mt-1.5 flex flex-wrap justify-center gap-1.5">
              {artist.styles.map((style) => (
                <span key={style} className="rounded-full border border-brand px-2 py-0.5 text-xs text-brand">
                  {style}
                </span>
              ))}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{artist.shortBio}</p>
          </Link>
        ))}
      </div>
    </section>
  )
  */
}
