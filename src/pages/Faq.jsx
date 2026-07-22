import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Seo from '@/components/Seo'
import { FAQ_ITEMS } from '@/constants/faq'

export default function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <Seo
        title="FAQ"
        description="Answers to common questions about booking, pricing, deposits, and what to expect at Bobby's Tattoo."
      />
      <h1 className="text-center text-3xl font-semibold tracking-tight">frequently asked questions</h1>
      <p className="mt-3 text-center text-muted-foreground">
        can&apos;t find what you&apos;re looking for? reach out through our contact form.
      </p>

      <Accordion className="mt-12" defaultValue={[FAQ_ITEMS[0].id]}>
        {FAQ_ITEMS.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>
              {item.answer.split('\n\n').map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
