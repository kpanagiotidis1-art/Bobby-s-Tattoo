import Seo from '@/components/Seo'
import SectionAccent from '@/components/SectionAccent'
import { Button } from '@/components/ui/button'
import Hero from '@/components/home/Hero'
import About from '@/components/home/About'
import InstagramGrid from '@/components/home/InstagramGrid'
import ReviewsCta from '@/components/home/ReviewsCta'
import InquiryForm from '@/features/inquiry/InquiryForm'
import { GOOGLE_MAPS_URL, STUDIO_ADDRESS, STUDIO_HOURS } from '@/constants/business'

export default function Home() {
  return (
    <>
      <Seo title="Tattoo Studio in Darlinghurst, Sydney" />
      <Hero />
      <About />
      <InstagramGrid />
      <ReviewsCta />

      <section id="contact" className="scroll-mt-20 border-t border-border px-6 py-24 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Get In Touch</h2>
        <SectionAccent className="mt-3" />
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Tell us about the tattoo you have in mind. We review every inquiry personally and reply by
          email — this isn&apos;t a booking system, so nothing is confirmed until we&apos;ve spoken.
        </p>
        <div className="mx-auto mt-10 flex max-w-md flex-col items-center gap-2 border-b border-border pb-10 text-sm text-muted-foreground">
          <p>{STUDIO_ADDRESS}</p>
          <p>{STUDIO_HOURS}</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            nativeButton={false}
            render={<a href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer" />}
          >
            Get Directions
          </Button>
        </div>

        <div className="mt-10">
          <InquiryForm />
        </div>
      </section>
    </>
  )
}
