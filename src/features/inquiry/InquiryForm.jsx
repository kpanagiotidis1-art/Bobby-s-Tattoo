import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
// import { useSearchParams } from 'react-router-dom' — only used for the
// disabled preferredArtist prefill below, restore together.
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { inquirySchema } from './schema'

const HEAR_ABOUT_US_OPTIONS = ['Instagram', 'Google', 'Referral from Friend or Relative', 'Other']

function Field({ label, htmlFor, helperText, error, children }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {helperText && !error && <p className="text-xs text-muted-foreground">{helperText}</p>}
      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  )
}

export default function InquiryForm() {
  const [submitted, setSubmitted] = useState(false)
  // Artist prefill disabled alongside the Artists section (2026-07-15) — this
  // used to read /?artist=Name#contact from "Book with {artist}" links.
  // Restore together with ArtistDetail/routes.jsx once artists exist:
  // const [searchParams] = useSearchParams()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      // preferredArtist: searchParams.get('artist') ?? '',
      // clientType must start as a defined value ('') rather than undefined —
      // Base UI's RadioGroup warns loudly if it flips from uncontrolled to
      // controlled the moment a real value is set.
      clientType: '',
      hearAboutUs: [],
    },
  })

  // TODO: once Supabase is wired up, this should insert into an `inquiries` table
  // (with file uploads going to Storage) and trigger an edge function that emails
  // the studio + a confirmation to the customer. For now it only validates
  // client-side, so the studio isn't receiving anything yet.
  const onSubmit = async (data) => {
    console.log('Inquiry submitted (not yet sent anywhere):', data)
    await new Promise((resolve) => setTimeout(resolve, 400))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-border bg-muted/30 p-6 text-center">
        <p className="font-medium">Thanks — we&apos;ll be in touch soon.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          We review every inquiry personally and reply by email.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mx-auto max-w-md space-y-10 text-left">
      <fieldset className="space-y-5">
        <legend className="text-sm font-semibold tracking-tight">Your Details</legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="First name" htmlFor="firstName" error={errors.firstName}>
            <Input id="firstName" autoComplete="given-name" aria-invalid={!!errors.firstName} {...register('firstName')} />
          </Field>
          <Field label="Last name" htmlFor="lastName" error={errors.lastName}>
            <Input id="lastName" autoComplete="family-name" aria-invalid={!!errors.lastName} {...register('lastName')} />
          </Field>
        </div>

        <Field label="Email" htmlFor="email" error={errors.email}>
          <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register('email')} />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Phone" htmlFor="phone" error={errors.phone}>
            <Input id="phone" type="tel" autoComplete="tel" aria-invalid={!!errors.phone} {...register('phone')} />
          </Field>
          <Field label="Date of birth" htmlFor="dateOfBirth" error={errors.dateOfBirth}>
            <Input id="dateOfBirth" type="date" aria-invalid={!!errors.dateOfBirth} {...register('dateOfBirth')} />
          </Field>
        </div>

        <div className="space-y-2">
          <Label>Are you a new or returning client?</Label>
          <Controller
            control={control}
            name="clientType"
            render={({ field }) => (
              <RadioGroup value={field.value ?? ''} onValueChange={field.onChange} className="flex gap-6">
                {['New Client', 'Returning Client'].map((option) => (
                  <label key={option} className="flex items-center gap-2 text-sm">
                    <RadioGroupItem value={option} />
                    {option}
                  </label>
                ))}
              </RadioGroup>
            )}
          />
          {errors.clientType && <p className="text-sm text-destructive">{errors.clientType.message}</p>}
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-sm font-semibold tracking-tight">Your Tattoo</legend>

        {/* Preferred artist field disabled alongside the Artists section
            (2026-07-15) — restore together once real artists exist.
        <Field label="Preferred artist (optional)" htmlFor="preferredArtist">
          <Input id="preferredArtist" placeholder="No preference" {...register('preferredArtist')} />
        </Field>
        */}

        <Field
          label="Tattoo placement"
          htmlFor="tattooPlacement"
          error={errors.tattooPlacement}
        >
          <Input id="tattooPlacement" placeholder="Example: Inner bicep" aria-invalid={!!errors.tattooPlacement} {...register('tattooPlacement')} />
        </Field>

        <Field
          label="Tattoo size"
          htmlFor="tattooSize"
          helperText="Please specify in cm — for reference, a standard iPhone is about 15cm tall."
          error={errors.tattooSize}
        >
          <Input id="tattooSize" placeholder="Example: 20-25cm" aria-invalid={!!errors.tattooSize} {...register('tattooSize')} />
        </Field>

        <Field
          label="Tattoo description"
          htmlFor="tattooDescription"
          helperText="Be as detailed as you can — if it's a flash piece or existing design, mention it and attach a reference below."
          error={errors.tattooDescription}
        >
          <Textarea
            id="tattooDescription"
            rows={4}
            placeholder="Let us know your ideas and any specific elements"
            aria-invalid={!!errors.tattooDescription}
            {...register('tattooDescription')}
          />
        </Field>

        <Field
          label="Reference images (optional)"
          htmlFor="referenceImages"
          helperText="Previous work, flash, other art, or rough sketches — anything that helps visualise the concept."
        >
          <Input
            id="referenceImages"
            type="file"
            accept="image/*,video/*"
            multiple
            className="file:mr-3 file:cursor-pointer file:rounded-lg file:bg-primary file:px-2.5 file:text-primary-foreground file:hover:bg-primary/80"
            {...register('referenceImages')}
          />
        </Field>

        <Field
          label="Tattoo area photo (optional)"
          htmlFor="tattooAreaImages"
          helperText="A clear photo of where you want the tattoo — circling or boxing the area helps indicate placement and size. Can be sent later."
        >
          <Input
            id="tattooAreaImages"
            type="file"
            accept="image/*,video/*"
            multiple
            className="file:mr-3 file:cursor-pointer file:rounded-lg file:bg-primary file:px-2.5 file:text-primary-foreground file:hover:bg-primary/80"
            {...register('tattooAreaImages')}
          />
        </Field>

        <Field
          label="Skin conditions or allergies (optional)"
          htmlFor="skinConditions"
          helperText="If yes, briefly describe the condition and whether it may affect the tattoo area."
        >
          <Input id="skinConditions" {...register('skinConditions')} />
        </Field>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-sm font-semibold tracking-tight">Availability</legend>

        <Field
          label="Preferred days (optional)"
          htmlFor="preferredDays"
          helperText="Any days of the week that generally work best for you."
        >
          <Input id="preferredDays" placeholder="Example: Weekday afternoons" {...register('preferredDays')} />
        </Field>

        <Field
          label="Desired dates (optional)"
          htmlFor="desiredDates"
          helperText="We can't guarantee these dates, but we'll try to get as close as possible."
        >
          <Input id="desiredDates" placeholder="Example: June 10th-15th" {...register('desiredDates')} />
        </Field>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-sm font-semibold tracking-tight">A Little More</legend>

        <div className="space-y-2">
          <Label>How did you hear about us? (optional)</Label>
          <Controller
            control={control}
            name="hearAboutUs"
            render={({ field }) => (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {HEAR_ABOUT_US_OPTIONS.map((option) => {
                  const checked = field.value?.includes(option)
                  return (
                    <label key={option} className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={!!checked}
                        onCheckedChange={(isChecked) => {
                          const next = isChecked
                            ? [...(field.value ?? []), option]
                            : (field.value ?? []).filter((v) => v !== option)
                          field.onChange(next)
                        }}
                      />
                      {option}
                    </label>
                  )
                })}
              </div>
            )}
          />
        </div>

        <Field label="Your Instagram (optional)" htmlFor="instagramHandle">
          <Input id="instagramHandle" placeholder="@yourhandle" {...register('instagramHandle')} />
        </Field>
      </fieldset>

      <Button type="submit" disabled={isSubmitting} className="h-11 w-full rounded-lg text-base">
        {isSubmitting ? 'Sending…' : 'Send Inquiry'}
      </Button>
    </form>
  )
}
