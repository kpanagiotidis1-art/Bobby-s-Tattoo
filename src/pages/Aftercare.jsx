import Seo from '@/components/Seo'

// Sourced from the client's existing site (bobisontattoo.com/aftercare),
// lightly adapted from "I" to "we" for a studio voice. Procedural/product
// content like this carries much less duplicate-content SEO risk than the
// blog posts, since it's not written to rank for competitive keywords.
const SECTIONS = [
  {
    heading: 'Your tattoo is done — what now?',
    body: 'Once your tattoo is finished, we’ll cover it with either cling film or an adhesive second-skin film, depending on the piece and your skin.',
  },
  {
    heading: 'Cling film',
    body: 'Used to cover the new tattoo for a short period. Leave it on for 1–2 hours, or until you get home. Wash gently with fragrance-free soap and warm water, pat dry with a clean paper towel, and let it fully dry before applying a thin layer of aftercare cream.',
  },
  {
    heading: 'Second-skin film',
    body: 'Our preferred option in most cases. After the tattoo is cleaned and given time to weep and settle, we apply a clear adhesive film over the whole area. It can stay on for a recommended 3 days (minimum 24 hours). To remove it, peel back a bottom corner and lift slowly — doing this under warm running water (like in the shower) helps the adhesive release more easily. Wash gently, pat dry, and apply a thin layer of aftercare cream once dry.',
  },
  {
    heading: 'How long does a tattoo take to heal?',
    body: 'A minimum of 14 days. Clean gently and pat dry before applying aftercare cream twice a day — morning and evening is ideal. Some dryness and flaking is completely normal; avoid scratching or peeling, and apply a little extra cream if it feels irritated.',
  },
  {
    heading: 'Keeping your tattoo safe while it heals',
    body: 'For the first 14 days, avoid direct sun and sand, swimming, baths (showers are fine), saunas and spas, and heavy sweating or intense exercise. Even after healing, sunscreen is worth applying long-term — sun exposure is one of the biggest causes of premature fading.',
  },
  {
    heading: 'Recommended aftercare products',
    body: 'A few options that work well: Bepanthen Tattoo Cream, Dr. Pickle Tattoo Balm, Hustle Butter Tattoo Balm, and Ink Nurse Aftercare.',
  },
]

export default function Aftercare() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-20">
      <Seo
        title="Aftercare"
        description="Tattoo aftercare instructions from Bobby's Tattoo Studio — how to care for your new tattoo while it heals."
      />
      <h1 className="text-center text-3xl font-semibold tracking-tight">Aftercare</h1>
      <p className="mt-3 text-center text-muted-foreground">
        Following this closely gives your tattoo the best chance to heal well and stay looking sharp.
      </p>

      <div className="mt-12 space-y-10">
        {SECTIONS.map((section) => (
          <div key={section.heading}>
            <h2 className="text-lg font-semibold tracking-tight">{section.heading}</h2>
            <p className="mt-2 text-muted-foreground">{section.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
