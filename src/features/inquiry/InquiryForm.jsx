import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { FileInput } from '@/components/ui/file-input'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { supabase } from '@/lib/supabase'
import { CONTACT_EMAIL } from '@/constants/nav'
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
  const [submitError, setSubmitError] = useState(null)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      // clientType must start as a defined value ('') rather than undefined —
      // Base UI's RadioGroup warns loudly if it flips from uncontrolled to
      // controlled the moment a real value is set.
      clientType: '',
      hearAboutUs: [],
    },
  })

  const onSubmit = async (data) => {
    setSubmitError(null)

    const formData = new FormData()
    formData.append('firstName', data.firstName)
    formData.append('lastName', data.lastName)
    formData.append('email', data.email)
    formData.append('phone', data.phone)
    formData.append('clientType', data.clientType)
    formData.append('dateOfBirth', data.dateOfBirth)
    formData.append('tattooPlacement', data.tattooPlacement)
    formData.append('tattooSize', data.tattooSize)
    formData.append('tattooDescription', data.tattooDescription)
    if (data.preferredArtist) formData.append('preferredArtist', data.preferredArtist)
    if (data.skinConditions) formData.append('skinConditions', data.skinConditions)
    if (data.preferredDays) formData.append('preferredDays', data.preferredDays)
    if (data.desiredDates) formData.append('desiredDates', data.desiredDates)
    if (data.instagramHandle) formData.append('instagramHandle', data.instagramHandle)
    for (const option of data.hearAboutUs ?? []) formData.append('hearAboutUs', option)
    for (const file of data.referenceImages ?? []) formData.append('referenceImages', file)
    for (const file of data.tattooAreaImages ?? []) formData.append('tattooAreaImages', file)

    const { error } = await supabase.functions.invoke('submit-inquiry', { body: formData })

    if (error) {
      setSubmitError(`something went wrong sending your inquiry — please try again or email us directly at ${CONTACT_EMAIL}.`)
      return
    }

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-border bg-muted/30 p-6 text-center">
        <p className="font-medium">thanks — we&apos;ll be in touch soon.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          we review every inquiry personally and reply by email.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mx-auto max-w-xl space-y-10 text-left">
      <fieldset className="space-y-5">
        <legend className="text-lg font-semibold tracking-tight">your details</legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="first name" htmlFor="firstName" error={errors.firstName}>
            <Input id="firstName" autoComplete="given-name" aria-invalid={!!errors.firstName} {...register('firstName')} />
          </Field>
          <Field label="last name" htmlFor="lastName" error={errors.lastName}>
            <Input id="lastName" autoComplete="family-name" aria-invalid={!!errors.lastName} {...register('lastName')} />
          </Field>
        </div>

        <Field label="email" htmlFor="email" error={errors.email}>
          <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register('email')} />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="phone" htmlFor="phone" error={errors.phone}>
            <Input id="phone" type="tel" autoComplete="tel" aria-invalid={!!errors.phone} {...register('phone')} />
          </Field>
          <Field label="date of birth" htmlFor="dateOfBirth" error={errors.dateOfBirth}>
            <Input id="dateOfBirth" type="date" aria-invalid={!!errors.dateOfBirth} {...register('dateOfBirth')} />
          </Field>
        </div>

        <div className="space-y-2">
          <Label>what kind of client are you?</Label>
          <Controller
            control={control}
            name="clientType"
            render={({ field }) => (
              <RadioGroup value={field.value ?? ''} onValueChange={field.onChange} className="flex flex-wrap gap-x-6 gap-y-2">
                {['New Client', 'Returning Client', 'PMU / Cosmetic Tattoo Client'].map((option) => (
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
        <legend className="text-lg font-semibold tracking-tight">your tattoo</legend>

        <Field
          label="tattoo placement"
          htmlFor="tattooPlacement"
          error={errors.tattooPlacement}
        >
          <Input id="tattooPlacement" placeholder="example: inner bicep" aria-invalid={!!errors.tattooPlacement} {...register('tattooPlacement')} />
        </Field>

        <Field
          label="tattoo size"
          htmlFor="tattooSize"
          helperText="please specify in cm — for reference, a standard iPhone is about 15cm tall."
          error={errors.tattooSize}
        >
          <Input id="tattooSize" placeholder="example: 20-25cm" aria-invalid={!!errors.tattooSize} {...register('tattooSize')} />
        </Field>

        <Field
          label="tattoo description"
          htmlFor="tattooDescription"
          helperText="be as detailed as you can — if it's a flash piece or existing design, mention it and attach a reference below."
          error={errors.tattooDescription}
        >
          <Textarea
            id="tattooDescription"
            rows={4}
            placeholder="let us know your ideas and any specific elements"
            aria-invalid={!!errors.tattooDescription}
            {...register('tattooDescription')}
          />
        </Field>

        <Field label="preferred artist (optional)" htmlFor="preferredArtist">
          <Input id="preferredArtist" placeholder="no preference" {...register('preferredArtist')} />
        </Field>

        <Field
          label="reference images (optional)"
          helperText="previous work, flash, other art, or rough sketches — anything that helps visualise the concept."
        >
          <FileInput
            id="referenceImages"
            accept="image/*,video/*"
            multiple
            {...register('referenceImages')}
          />
        </Field>

        <Field
          label="tattoo area photo (optional)"
          helperText="a clear photo of where you want the tattoo — circling or boxing the area helps indicate placement and size. can be sent later."
        >
          <FileInput
            id="tattooAreaImages"
            accept="image/*,video/*"
            multiple
            {...register('tattooAreaImages')}
          />
        </Field>

        <Field
          label="skin conditions or allergies (optional)"
          htmlFor="skinConditions"
          helperText="if yes, briefly describe the condition and whether it may affect the tattoo area."
        >
          <Input id="skinConditions" {...register('skinConditions')} />
        </Field>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-lg font-semibold tracking-tight">availability</legend>

        <Field
          label="preferred days (optional)"
          htmlFor="preferredDays"
          helperText="any days of the week that generally work best for you."
        >
          <Input id="preferredDays" placeholder="example: weekday afternoons" {...register('preferredDays')} />
        </Field>

        <Field
          label="desired dates (optional)"
          htmlFor="desiredDates"
          helperText="we can't guarantee these dates, but we'll try to get as close as possible."
        >
          <Input id="desiredDates" placeholder="example: June 10th-15th" {...register('desiredDates')} />
        </Field>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-lg font-semibold tracking-tight">a little more</legend>

        <div className="space-y-2">
          <Label>how did you hear about us? (optional)</Label>
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

        <Field label="your Instagram (optional)" htmlFor="instagramHandle">
          <Input id="instagramHandle" placeholder="@yourhandle" {...register('instagramHandle')} />
        </Field>
      </fieldset>

      {submitError && <p className="text-sm text-destructive">{submitError}</p>}

      <Button type="submit" disabled={isSubmitting} className="h-11 w-full rounded-lg text-base">
        {isSubmitting ? 'sending…' : 'send inquiry'}
      </Button>
    </form>
  )
}
