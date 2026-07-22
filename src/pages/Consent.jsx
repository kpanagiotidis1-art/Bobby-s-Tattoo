import Seo from '@/components/Seo'
import ConsentForm from '@/features/consent/ConsentForm'

// Reached only via a direct URL from the in-studio QR code. Deliberately not
// linked from navigation or the sitemap — see src/app/routes.jsx. noindex is
// the safety net in case the URL ever gets crawled or shared unexpectedly.
export default function Consent() {
  return (
    <section className="mx-auto max-w-xl px-6 py-16">
      <Seo title="Consent Form" noindex />
      <h1 className="text-center text-2xl font-semibold tracking-tight">consent form</h1>
      <p className="mt-3 text-center text-sm text-muted-foreground">
        please complete this before your appointment begins.
      </p>
      <div className="mt-10">
        <ConsentForm />
      </div>
    </section>
  )
}
