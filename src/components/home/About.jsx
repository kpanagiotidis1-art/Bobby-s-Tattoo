import SectionAccent from '@/components/SectionAccent'

export default function About() {
  return (
    <section className="border-t border-border bg-white px-6 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight">about our space</h2>
        <SectionAccent className="mt-4" />
        {/* Reworded per client feedback 2026-07-22. */}
        <p className="mt-4 text-muted-foreground">
          Bobby&apos;s Tattoo is a space focused on custom, considered work. a calm, clean and
          comfortable environment built around the client and the piece. we welcome everyone, from
          first-time clients to heavily tattooed collectors. every booking starts with a
          conversation, not a slot in a calendar.
        </p>
      </div>
    </section>
  )
}
