// Small restrained accent rule under section headings — the one deliberate
// use of the brand accent color as a design flourish, kept intentionally
// minimal per the brief ("not over-designed").
export default function SectionAccent({ className = '' }) {
  return <div className={`mx-auto h-0.5 w-10 rounded-full bg-brand ${className}`} />
}
