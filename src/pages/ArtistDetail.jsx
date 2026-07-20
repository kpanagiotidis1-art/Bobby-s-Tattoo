import { Link, useParams } from 'react-router-dom'
import Seo from '@/components/Seo'
import { Button } from '@/components/ui/button'
import { ARTISTS } from '@/constants/artists'
import NotFound from '@/pages/NotFound'

export default function ArtistDetail() {
  const { slug } = useParams()
  const artist = ARTISTS.find((item) => item.slug === slug)

  if (!artist) return <NotFound />

  const bookingLink = `/?artist=${encodeURIComponent(artist.name)}#contact`

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      {/* noindex until this is a real artist — see src/constants/artists.js */}
      <Seo
        title={artist.name}
        description={`${artist.name} — ${artist.styles.join(', ')} tattoo artist at Bobby's Tattoo Studio, Darlinghurst, Sydney.`}
        noindex
      />
      <Link to="/artists" className="text-sm text-muted-foreground hover:text-foreground">
        &larr; Back to artists
      </Link>

      <div className="mt-6 text-center">
        <div className="mx-auto aspect-square w-40 rounded-xl bg-muted" />
        <h1 className="mt-6 text-3xl font-semibold tracking-tight">{artist.name}</h1>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {artist.styles.map((style) => (
            <span key={style} className="rounded-full border border-brand px-2.5 py-0.5 text-xs text-brand">
              {style}
            </span>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-lg text-muted-foreground">{artist.bio}</p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button size="lg" nativeButton={false} render={<Link to={bookingLink} />}>
            Book with {artist.name.split(' ')[0]}
          </Button>
          <Button
            variant="outline"
            size="lg"
            nativeButton={false}
            render={<a href={artist.instagramUrl} target="_blank" rel="noreferrer" />}
          >
            Instagram
          </Button>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-center text-lg font-semibold tracking-tight">Selected Work</h2>
        <div className="mt-6 grid grid-cols-3 gap-2">
          {Array.from({ length: artist.galleryCount }, (_, i) => (
            <div key={i} className="aspect-square rounded-md bg-muted" />
          ))}
        </div>
      </div>
    </article>
  )
}
