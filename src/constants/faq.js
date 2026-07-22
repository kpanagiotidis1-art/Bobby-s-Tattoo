// Sourced from the client's existing site (bobisontattoo.com/FAQ) and adapted
// from solo-artist phrasing ("I") to studio phrasing ("we"). Pricing confirmed
// 2026-07-13: client deliberately doesn't want exact rates shown, just the
// studio minimum — booking/flash pricing is individual per artist, and he'll
// send a fuller price guide separately (not yet received).
export const FAQ_ITEMS = [
  {
    id: 'booking',
    question: 'how do I book a tattoo?',
    answer:
      'fill out our inquiry form, or get in touch via Instagram or email. we’ll get back to you as soon as we can.',
  },
  {
    id: 'rates',
    question: 'what are your rates?',
    // Real price guide received from the client 2026-07-19 — replaces the
    // earlier placeholder $250 figure with his actual numbers and wording.
    answer:
      'our studio minimum is $200. a studio minimum is in place to cover our time, as the set-up and equipment needed are the same for every tattoo, no matter how big or small — pricing varies from there depending on the piece, size, detail, and placement. the minimum generally covers very small tattoos under an hour, such as small single-word scripts, small numbers, or small single-line/outline designs.\n\nbeyond that, pricing varies for every artist. we’ll give you a general estimate based on the details in your inquiry, and may ask follow-up questions to help narrow it down. some artists charge a flat rate and others charge by the hour, so get in touch for an artist’s specific rates — hourly rates generally range from $150–$350.',
  },
  {
    id: 'deposit',
    question: 'do I need to pay a deposit?',
    answer:
      'yes, a deposit is required to secure your booking by bank transfer, confirmed once we’ve discussed and finalised your piece. it secures your date and confirms you’re ready to go ahead.',
  },
  {
    id: 'cancellation',
    question: 'what is your cancellation policy?',
    answer:
      'deposits are non-refundable, but you can always reschedule — just reach out by email or Instagram as soon as possible and we’ll find a new date. if you need to cancel outright, deposits aren’t refunded, and no-shows forfeit their deposit.',
  },
  {
    id: 'payment',
    question: 'how do you take payment?',
    answer: 'on the day of your tattoo, the remaining balance is paid by cash or bank transfer.',
  },
  {
    id: 'cover-ups',
    question: 'do you do cover-ups / scar cover-ups?',
    answer:
      'yes, though not every tattoo or scar can be covered — we’ll assess each case honestly and let you know what’s realistic. please include clear photos of the area and your ideas when you fill out the inquiry form.',
  },
  {
    id: 'design-preview',
    question: 'can I see a preview or draft of the design?',
    answer:
      'your design is usually finalised the week of your appointment, with a draft sent a day or two before so we can make any adjustments together. the more detail and reference photos you can give us up front, the better we can interpret your idea — and there’s always time on the day for small tweaks too.',
  },
  {
    id: 'walk-ins',
    question: 'do you take walk-ins?',
    // Updated per client 2026-07-20 — walk-ins are welcome (was previously
    // "generally no, by appointment"). Keep this in sync with the footer's
    // "Walk-ins Welcome" line if either changes again.
    answer:
      'yes, walk-ins are welcome! for anything larger or more custom, we\'d still recommend getting in touch beforehand so we can set aside the right amount of time for it.',
  },
  {
    id: 'flash',
    question: 'do you have flash designs available?',
    answer: 'yes — keep an eye on our Instagram for available flash pieces.',
  },
  {
    id: 'numbing-cream',
    question: 'do you use numbing cream?',
    answer:
      'we’re open to it depending on the project, though it’s not always recommended — numbing cream can change the skin’s texture and make healing slightly harder. if you’re unsure about handling the pain, mention it in your inquiry and we can talk through a plan.',
  },
  {
    id: 'before-appointment',
    question: 'what should I do before my tattoo?',
    answer:
      'come well rested, fed, and hydrated, and avoid drugs/alcohol for at least 24 hours before your appointment. dress appropriately for the area being tattooed, and if it’s a longer session, feel free to bring snacks, water, and something to keep you entertained.',
  },
  {
    id: 'age',
    question: 'do I need to be 18+ to get a tattoo?',
    answer: 'yes — we don’t tattoo anyone under 18, even with parent or guardian consent.',
  },
  {
    id: 'pain',
    question: 'does it hurt?',
    answer:
      'pain is subjective and depends on placement, session length, and how rested/fed you are — but it’s reasonable to expect some level of discomfort.',
  },
]
