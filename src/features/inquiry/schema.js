import { z } from 'zod'

const fileListSchema =
  typeof FileList === 'undefined' ? z.any() : z.instanceof(FileList)

// Field set mirrors the client's existing booking form (bobisontattoo.com/book)
// almost exactly, adapted for a multi-artist studio, and "Preferred Days" is
// free text here instead of fixed checkboxes since we don't have the new
// studio's operating days yet (his form hardcodes his own working days —
// Tue/Wed/Fri/Sat). Switch that to a checkbox group once the client confirms
// studio hours.
export const inquirySchema = z.object({
  firstName: z.string().trim().min(1, 'Enter your first name'),
  lastName: z.string().trim().min(1, 'Enter your last name'),
  email: z.email('Enter a valid email address'),
  phone: z.string().trim().min(6, 'Enter a phone number'),
  // preferredArtist: disabled alongside the Artists section (2026-07-15) —
  // see src/features/inquiry/InquiryForm.jsx. Restore together.
  // preferredArtist: z.string().trim().optional(),

  clientType: z.enum(['New Client', 'Returning Client', 'PMU / Cosmetic Tattoo Client'], {
    message: 'Let us know what kind of client you are',
  }),
  dateOfBirth: z.string().min(1, 'Enter your date of birth'),

  tattooPlacement: z.string().trim().min(1, 'Enter the tattoo placement'),
  tattooSize: z.string().trim().min(1, 'Enter the approximate tattoo size'),
  tattooDescription: z
    .string()
    .trim()
    .min(20, 'Please be as detailed as you can (at least 20 characters)'),
  referenceImages: fileListSchema.optional(),
  tattooAreaImages: fileListSchema.optional(),
  skinConditions: z.string().trim().optional(),

  preferredDays: z.string().trim().optional(),
  desiredDates: z.string().trim().optional(),

  hearAboutUs: z.array(z.string()).optional(),
  instagramHandle: z.string().trim().optional(),
})
