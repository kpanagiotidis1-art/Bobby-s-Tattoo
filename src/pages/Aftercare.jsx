import { Clock, Droplet, Layers, Shield, Sparkles, Sun } from 'lucide-react'
import Seo from '@/components/Seo'

// Sourced from the client's existing site (bobisontattoo.com/aftercare),
// lightly adapted from "I" to "we" for a studio voice. Procedural/product
// content like this carries much less duplicate-content SEO risk than the
// blog posts, since it's not written to rank for competitive keywords.
//
// Icons per Bobby's feedback (2026-07-19) — "don't make this a wall of
// text." Using the site's existing gold-icon treatment (same as the FAQ
// chevrons/footer icons) rather than emoji, to stay in one visual language.
const SECTIONS = [
  {
    heading: 'your tattoo is done — what now?',
    icon: Sparkles,
    body: 'once your tattoo is finished, we’ll cover it with either cling film or an adhesive second-skin film, depending on the piece and your skin.',
  },
  {
    heading: 'cling film',
    icon: Layers,
    body: 'used to cover the new tattoo for a short period. leave it on for 1–2 hours, or until you get home. wash gently with fragrance-free soap and warm water, pat dry with a clean paper towel, and let it fully dry before applying a thin layer of aftercare cream.',
  },
  {
    heading: 'second-skin film',
    icon: Shield,
    body: 'our preferred option in most cases. after the tattoo is cleaned and given time to weep and settle, we apply a clear adhesive film over the whole area. it can stay on for a recommended 3 days (minimum 24 hours). to remove it, peel back a bottom corner and lift slowly — doing this under warm running water (like in the shower) helps the adhesive release more easily. wash gently, pat dry, and apply a thin layer of aftercare cream once dry.',
  },
  {
    heading: 'how long does a tattoo take to heal?',
    icon: Clock,
    body: 'a minimum of 14 days. clean gently and pat dry before applying aftercare cream twice a day — morning and evening is ideal. some dryness and flaking is completely normal; avoid scratching or peeling, and apply a little extra cream if it feels irritated.',
  },
  {
    heading: 'keeping your tattoo safe while it heals',
    icon: Sun,
    body: 'for the first 14 days, avoid direct sun and sand, swimming, baths (showers are fine), saunas and spas, and heavy sweating or intense exercise. even after healing, sunscreen is worth applying long-term — sun exposure is one of the biggest causes of premature fading.',
  },
  {
    heading: 'recommended aftercare products',
    icon: Droplet,
    body: 'a few options that work well: Bepanthen Tattoo Cream, Dr. Pickle Tattoo Balm, Hustle Butter Tattoo Balm, and Ink Nurse Aftercare.',
  },
]

export default function Aftercare() {
  return (
    <>
      <Seo
        title="Aftercare"
        description="Tattoo aftercare instructions from Bobby's Tattoo — how to care for your new tattoo while it heals."
      />
      <section className="px-6 py-20 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">aftercare</h1>
        <p className="mt-3 text-muted-foreground">
          following this closely gives your tattoo the best chance to heal well and stay looking sharp.
        </p>
      </section>

      {/* Each topic is its own full-width band, alternating background —
          same rhythm as the homepage's stacked sections — rather than one
          long list, so a page with six topics doesn't read as a wall of text. */}
      {SECTIONS.map((section, index) => (
        <section
          key={section.heading}
          className={`border-t border-border px-6 py-12 ${index % 2 === 0 ? 'bg-white' : ''}`}
        >
          <div className="mx-auto flex max-w-3xl gap-4">
            <section.icon className="mt-0.5 size-6 shrink-0 text-brand" aria-hidden />
            <div>
              <h2 className="text-lg font-semibold tracking-tight">{section.heading}</h2>
              <p className="mt-2 text-muted-foreground">{section.body}</p>
            </div>
          </div>
        </section>
      ))}
    </>
  )
}
