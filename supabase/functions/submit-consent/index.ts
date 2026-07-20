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
