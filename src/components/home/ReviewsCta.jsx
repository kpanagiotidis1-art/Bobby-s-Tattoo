import { Button } from '@/components/ui/button'
import SectionAccent from '@/components/SectionAccent'

// Confirmed by the client 2026-07-19 — the studio's real Google Business Profile review link.
const GOOGLE_REVIEWS_URL = 'https://g.page/r/CUa9U4nW2EBDEBM/review'
// TODO: replace with the studio's real Fresha booking-system profile URL once it exists.
const FRESHA_URL = 'https://www.fresha.com'

// The studio is brand new and may have no reviews yet at launch, so we link out
// to Google rather than embedding review cards that could show an empty state.
// Fresha is secondary per the client: Google is primary, Fresha is "no biggie" —
// it's back-of-house (bookings/POS) and will auto-prompt reviews post-appointment.
// Revisit once there's real review volume — see README "Architecture notes".
export default function ReviewsCta() {
  return (
    <section className="border-t border-border px-6 py-24 text-center">
      <h2 className="text-2xl font-semibold tracking-tight">Reviews</h2>
      <SectionAccent className="mt-3" />
      <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
        We&apos;re a new studio and just getting started — read (and leave!) reviews on Google.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button
          variant="outline"
          nativeButton={false}
          render={<a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer" />}
        >
          Read Reviews on Google
        </Button>
        <Button
          variant="outline"
          nativeButton={false}
          render={<a href={FRESHA_URL} target="_blank" rel="noreferrer" />}
        >
          View us on Fresha
        </Button>
      </div>
    </section>
  )
}
