import Seo from '@/components/Seo'
import InquiryForm from '@/features/inquiry/InquiryForm'

export default function Inquiry() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <Seo
        title="Book Now"
        description="Submit an inquiry to Bobby's Tattoo — tell us about the tattoo you have in mind and we'll get back to you by email."
      />
      <h1 className="text-center text-3xl font-semibold tracking-tight">Book Now</h1>
      <p className="mt-3 text-center text-muted-foreground">
        Tell us about the tattoo you have in mind. We review every inquiry personally and reply by
        email — this isn&apos;t a booking system, so nothing is confirmed until we&apos;ve spoken.
      </p>
      <div className="mt-12">
        <InquiryForm />
      </div>
    </section>
  )
}
