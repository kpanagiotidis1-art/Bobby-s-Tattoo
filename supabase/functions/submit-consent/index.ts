import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

// Server-side validation is required here, not optional-but-nice: this is
// the only gate between the public internet and a table holding government
// ID references. Never trust the frontend's Zod schema alone.
class ValidationError extends Error {}

function requireString(form: FormData, key: string): string {
  const value = form.get(key)
  if (typeof value !== 'string' || !value.trim()) {
    throw new ValidationError(`Missing required field: ${key}`)
  }
  return value.trim()
}

// Best-effort only, same as submit-inquiry: the consent record is already
// safely written to the database (and the ID photo to private storage)
// before this is ever called, so a Resend hiccup should never be mistaken
// for a lost consent form — only the studio's email copy is at risk.
async function sendEmail(options: { to: string; from: string; subject: string; text: string }) {
  const apiKey = Deno.env.get('RESEND_API_KEY')
  if (!apiKey) {
    console.warn(`RESEND_API_KEY not set — skipping email: "${options.subject}"`)
    return
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options),
  })

  if (!response.ok) {
    console.error('Resend send failed:', await response.text())
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const form = await req.formData()

    const fullName = requireString(form, 'fullName')
    const dateOfBirth = requireString(form, 'dateOfBirth')
    const idType = requireString(form, 'idType')
    const idNumber = requireString(form, 'idNumber')
    const phone = requireString(form, 'phone')
    const email = requireString(form, 'email')
    const address = requireString(form, 'address')
    const city = requireString(form, 'city')
    const state = requireString(form, 'state')
    const postcode = requireString(form, 'postcode')
    const signatureName = requireString(form, 'signatureName')
    const signatureDate = requireString(form, 'signatureDate')
    const tattooArtist = (form.get('tattooArtist') as string | null)?.trim() || null

    const agreesToTerms = requireString(form, 'agreesToTerms') === 'true'
    if (!agreesToTerms) {
      throw new ValidationError('Consent terms must be agreed to')
    }

    const idUpload = form.get('idUpload')
    if (!(idUpload instanceof File) || idUpload.size === 0) {
      throw new ValidationError('ID upload is required')
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    const idExtension = idUpload.name.split('.').pop() ?? 'jpg'
    const idPath = `${crypto.randomUUID()}.${idExtension}`

    const { error: uploadError } = await supabase.storage
      .from('consent-uploads')
      .upload(idPath, idUpload, { contentType: idUpload.type })
    if (uploadError) throw new Error(`ID upload failed: ${uploadError.message}`)

    const { error: insertError } = await supabase.from('consent_forms').insert({
      full_name: fullName,
      date_of_birth: dateOfBirth,
      id_type: idType,
      id_number: idNumber,
      phone,
      email,
      address,
      city,
      state,
      postcode,
      id_upload_path: idPath,
      agrees_to_terms: agreesToTerms,
      signature_name: signatureName,
      signature_date: signatureDate,
      tattoo_artist: tattooArtist,
    })
    if (insertError) throw new Error(`Database insert failed: ${insertError.message}`)

    // RESEND_FROM_EMAIL and STUDIO_NOTIFICATION_EMAIL are shared Supabase
    // secrets with submit-inquiry — see that function for the sandbox-domain
    // note. The ID photo itself is deliberately left out of the email and
    // stays in the private consent-uploads bucket; it's already the
    // authoritative record and email isn't a secure place to duplicate a
    // government ID image.
    const fromAddress = Deno.env.get('RESEND_FROM_EMAIL') ?? 'onboarding@resend.dev'
    const studioEmail = Deno.env.get('STUDIO_NOTIFICATION_EMAIL') ?? 'hello@bobbystattoo.com'

    await sendEmail({
      to: studioEmail,
      from: fromAddress,
      subject: `New consent form: ${fullName}`,
      text: [
        `${fullName}`,
        `Date of birth: ${dateOfBirth}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        '',
        `ID type: ${idType}`,
        `ID number: ${idNumber}`,
        '',
        `Address: ${address}, ${city} ${state} ${postcode}`,
        '',
        tattooArtist ? `Tattoo artist: ${tattooArtist}` : null,
        `Agreed to terms: ${agreesToTerms ? 'Yes' : 'No'}`,
        `Signed: ${signatureName} (${signatureDate})`,
        '',
        'ID photo is stored in Supabase Storage (consent-uploads bucket), not attached here.',
      ]
        .filter(Boolean)
        .join('\n'),
    })

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    const status = error instanceof ValidationError ? 400 : 500
    console.error('submit-consent error:', error)
    return new Response(
      JSON.stringify({ success: false, error: (error as Error).message }),
      { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})
