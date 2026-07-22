import Seo from '@/components/Seo'
import InquiryForm from '@/features/inquiry/InquiryForm'

export default function Inquiry() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <Seo
        title="Book Now"
        description="Submit an inquiry to Bobby's Tattoo — tell us about the tattoo you have in mind and we'll get back to you by email."
      />
      <h1 className="text-center text-3xl font-semibold tracking-tight">book now</h1>
      <p className="mt-3 text-center text-muted-foreground">
        tell us about the tattoo you have in mind. we review every inquiry personally and reply by
        email — this isn&apos;t a booking system, so nothing is confirmed until we&apos;ve spoken.
      </p>
      {/* Added per client feedback 2026-07-22 — deposit/refund expectations
          and reply-time framing, matching what's already established on the
          FAQ page rather than inventing new figures. */}
      <p className="mt-3 text-center text-sm text-muted-foreground">
        once we&apos;ve discussed your piece, a deposit (by bank transfer) secures your appointment
        date. deposits are non-refundable, though you&apos;re welcome to reschedule with as much
        notice as you can give us. we reply to every inquiry personally, so please allow us a little
        time to get back to you.
      </p>
      <div className="mt-12">
        <InquiryForm />
      </div>
    </section>
  )
}
