import SectionAccent from '@/components/SectionAccent'

export default function About() {
  return (
    <section className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight">About the Studio</h2>
        <SectionAccent className="mt-4" />
        <p className="mt-4 text-muted-foreground">
          {/* Placeholder — replace with the client's real studio bio/positioning. */}
          Bobby&apos;s Tattoo Studio is opening its doors with a focus on custom, considered work — a
          calm, clean space built around the client and the piece, not a walk-in production line.
          Every booking starts as a conversation, not a slot in a calendar.
        </p>
      </div>
    </section>
  )
}
