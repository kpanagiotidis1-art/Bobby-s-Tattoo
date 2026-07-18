import { z } from 'zod'

const fileListSchema =
  typeof FileList === 'undefined' ? z.any() : z.instanceof(FileList)

// Field set matches the client's real paper consent form exactly (received
// 2026-07-15) — see ConsentForm.jsx for the full legal text. Note this form
// asks for full address (street/city/state/postcode) and ID type/number,
// which the site's earlier placeholder version didn't collect; it does NOT
// ask for a tattoo description, unlike the earlier placeholder did.
export const consentSchema = z.object({
  fullName: z.string().trim().min(2, 'Enter your full legal name'),
  dateOfBirth: z.string().min(1, 'Enter your date of birth'),
  idType: z.string().trim().min(1, "Enter your ID type (e.g. driver's license, passport)"),
  idNumber: z.string().trim().min(1, 'Enter your ID number'),
  phone: z.string().trim().min(6, 'Enter a phone number'),
  email: z.email('Enter a valid email address'),
  address: z.string().trim().min(1, 'Enter your street address'),
  city: z.string().trim().min(1, 'Enter your city/suburb'),
  state: z.string().trim().min(1, 'Enter your state'),
  postcode: z.string().trim().min(1, 'Enter your postcode'),
  idUpload: fileListSchema.refine((files) => files?.length === 1, 'Upload a photo of your ID'),
  agreesToTerms: z.literal(true, {
    message: 'You must confirm you have read and agree to the above',
  }),
  signatureName: z.string().trim().min(2, 'Type your full name as your signature'),
  signatureDate: z.string().min(1, 'Enter the date'),
  tattooArtist: z.string().trim().optional(),
})
