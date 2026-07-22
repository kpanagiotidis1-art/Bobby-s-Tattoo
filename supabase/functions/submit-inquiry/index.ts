import { createClient, type SupabaseClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

class ValidationError extends Error {}

function requireString(form: FormData, key: string): string {
  const value = form.get(key)
  if (typeof value !== 'string' || !value.trim()) {
    throw new ValidationError(`Missing required field: ${key}`)
  }
  return value.trim()
}

function optionalString(form: FormData, key: string): string | null {
  const value = form.get(key)
  return typeof value === 'string' && value.trim() ? value.trim() : null
}

async function uploadFiles(supabase: SupabaseClient, files: FormDataEntryValue[], prefix: string) {
  const paths: string[] = []
  for (const file of files) {
    if (!(file instanceof File) || file.size === 0) continue
    const extension = file.name.split('.').pop() ?? 'jpg'
    const path = `${prefix}/${crypto.randomUUID()}.${extension}`
    const { error } = await supabase.storage
      .from('inquiry-uploads')
      .upload(path, file, { contentType: file.type })
    if (error) throw new Error(`Upload failed: ${error.message}`)
    paths.push(path)
  }
  return paths
}

// Best-effort only: the inquiry is already safely written to the database
// before this is ever called, so a Resend outage, an unset API key (before
// the client finishes setting up Resend), or a bad address should never
// cause a real inquiry to be lost — only the notification email is at risk.
async function sendEmail(options: { to: string; from: string; subject: string; text: string; replyTo?: string }) {
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
    body: JSON.stringify({
      from: options.from,
      to: options.to,
      subject: options.subject,
      text: options.text,
      reply_to: options.replyTo,
    }),
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

    const firstName = requireString(form, 'firstName')
    const lastName = requireString(form, 'lastName')
    const email = requireString(form, 'email')
    const phone = requireString(form, 'phone')
    const clientType = requireString(form, 'clientType')
    const dateOfBirth = requireString(form, 'dateOfBirth')
    const tattooPlacement = requireString(form, 'tattooPlacement')
    const tattooSize = requireString(form, 'tattooSize')
    const tattooDescription = requireString(form, 'tattooDescription')
    const skinConditions = optionalString(form, 'skinConditions')
    const preferredDays = optionalString(form, 'preferredDays')
    const desiredDates = optionalString(form, 'desiredDates')
    const instagramHandle = optionalString(form, 'instagramHandle')
    const hearAboutUs = form.getAll('hearAboutUs').filter((v): v is string => typeof v === 'string')

    if (!['New Client', 'Returning Client', 'PMU / Cosmetic Tattoo Client'].includes(clientType)) {
      throw new ValidationError('Invalid client type')
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    const referenceImagePaths = await uploadFiles(supabase, form.getAll('referenceImages'), 'reference')
    const tattooAreaImagePaths = await uploadFiles(supabase, form.getAll('tattooAreaImages'), 'area')

    const { error: insertError } = await supabase.from('inquiries').insert({
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      client_type: clientType,
      date_of_birth: dateOfBirth,
      tattoo_placement: tattooPlacement,
      tattoo_size: tattooSize,
      tattoo_description: tattooDescription,
      reference_image_paths: referenceImagePaths,
      tattoo_area_image_paths: tattooAreaImagePaths,
      skin_conditions: skinConditions,
      preferred_days: preferredDays,
      desired_dates: desiredDates,
      hear_about_us: hearAboutUs,
      instagram_handle: instagramHandle,
    })
    if (insertError) throw new Error(`Database insert failed: ${insertError.message}`)

    // RESEND_FROM_EMAIL and STUDIO_NOTIFICATION_EMAIL are Supabase secrets,
    // not hardcoded, so switching from Resend's default sending domain to
    // the client's verified bobbystattoo.com address is a config change,
    // never a redeploy.
    const fromAddress = Deno.env.get('RESEND_FROM_EMAIL') ?? 'onboarding@resend.dev'
    const studioEmail = Deno.env.get('STUDIO_NOTIFICATION_EMAIL') ?? 'hello@bobbystattoo.com'

    await sendEmail({
      to: studioEmail,
      from: fromAddress,
      replyTo: email,
      subject: `New inquiry: ${firstName} ${lastName}`,
      text: [
        `${firstName} ${lastName} (${clientType})`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Date of birth: ${dateOfBirth}`,
        '',
        `Placement: ${tattooPlacement}`,
        `Size: ${tattooSize}`,
        `Description: ${tattooDescription}`,
        skinConditions ? `Skin conditions/allergies: ${skinConditions}` : null,
        '',
        preferredDays ? `Preferred days: ${preferredDays}` : null,
        desiredDates ? `Desired dates: ${desiredDates}` : null,
        hearAboutUs.length ? `Heard about us via: ${hearAboutUs.join(', ')}` : null,
        instagramHandle ? `Instagram: ${instagramHandle}` : null,
        referenceImagePaths.length ? `Reference images uploaded: ${referenceImagePaths.length}` : null,
        tattooAreaImagePaths.length ? `Area photos uploaded: ${tattooAreaImagePaths.length}` : null,
      ]
        .filter(Boolean)
        .join('\n'),
    })

    await sendEmail({
      to: email,
      from: fromAddress,
      subject: "We've received your inquiry — Bobby's Tattoo",
      text: `Hi ${firstName},\n\nThanks for reaching out to Bobby's Tattoo — we've received your inquiry and review every one personally. We'll be in touch by email soon.\n\nBobby's Tattoo`,
    })

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    const status = error instanceof ValidationError ? 400 : 500
    console.error('submit-inquiry error:', error)
    return new Response(
      JSON.stringify({ success: false, error: (error as Error).message }),
      { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})
