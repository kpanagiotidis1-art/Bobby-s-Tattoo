import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import SectionAccent from '@/components/SectionAccent'

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-28 text-center">
      {/* Subtle radial glow instead of a hero photo — there's no real studio
          photography yet (still coming from the client), so this gives the
          hero some visual depth without faking imagery we don't have. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, color-mix(in oklch, var(--brand) 12%, transparent), transparent)',
        }}
      />

      <h1 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
        Bobby&apos;s Tattoo Studio
      </h1>
      <SectionAccent className="mt-5" />
      <p className="mx-auto mt-5 max-w-md text-muted-foreground">
        A new studio built on considered, custom tattoo work. Every piece starts with a conversation.
      </p>
      <div className="mt-8">
        <Button
          size="lg"
          nativeButton={false}
          className="h-11 rounded-lg px-8 text-base"
          render={<Link to="/#contact" />}
        >
          Enquire About a Tattoo
        </Button>
      </div>
    </section>
  )
}
