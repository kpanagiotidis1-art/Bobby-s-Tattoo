import { Suspense } from 'react'

// Minimal, unobtrusive loading state for lazy-loaded route chunks. Route
// components are small, so this is rarely visible on a decent connection —
// it exists so slow connections see something instead of a blank flash.
function LoadingFallback() {
  return (
    <div className="px-6 py-24 text-center text-sm text-muted-foreground" role="status">
      Loading…
    </div>
  )
}

export default function RouteFallback({ children }) {
  return <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
}
