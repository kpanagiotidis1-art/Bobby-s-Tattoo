import { useEffect, useState } from 'react'
import studio01 from '@/assets/studio/studio-01.jpg'
import studio02 from '@/assets/studio/studio-02.jpg'
import studio03 from '@/assets/studio/studio-03.jpg'
import studio04 from '@/assets/studio/studio-04.jpg'

const SLIDES = [
  { src: studio01, alt: "Bobby's Tattoo illuminated sign" },
  { src: studio02, alt: 'Waiting area seating at Bobby’s Tattoo' },
  { src: studio03, alt: 'Tattoo stations at Bobby’s Tattoo' },
  { src: studio04, alt: 'Tattoo chairs and ring lights at Bobby’s Tattoo' },
]

const INTERVAL_MS = 5000

// Crossfades rather than sliding — matches the calm, minimal feel used for
// page transitions (see the view-transition rules in index.css) rather than
// a busier carousel motion.
export default function StudioSlideshow() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive((current) => (current + 1) % SLIDES.length)
    }, INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-muted sm:aspect-video">
      {SLIDES.map((slide, index) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          className="absolute inset-0 size-full object-cover transition-opacity duration-1000 ease-in-out"
          style={{ opacity: index === active ? 1 : 0 }}
        />
      ))}
    </div>
  )
}
