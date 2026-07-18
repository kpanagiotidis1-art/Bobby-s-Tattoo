import Seo from '@/components/Seo'

export default function NotFound() {
  return (
    <section className="px-6 py-24 text-center">
      <Seo title="Page Not Found" noindex />
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-4 text-muted-foreground">The page you're looking for doesn't exist.</p>
    </section>
  )
}
