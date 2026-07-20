import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { FileInput } from '@/components/ui/file-input'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'
import { consentSchema } from './schema'

function FieldError({ message }) {
  if (!message) return null
  return <p className="text-sm text-destructive">{message}</p>
}

const today = () => new Date().toISOString().slice(0, 10)

export default function ConsentForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(consentSchema),
    defaultValues: { signatureDate: today() },
  })

  const onSubmit = async (data) => {
    setSubmitError(null)

    const formData = new FormData()
    formData.append('fullName', data.fullName)
    formData.append('dateOfBirth', data.dateOfBirth)
    formData.append('idType', data.idType)
    formData.append('idNumber', data.idNumber)
    formData.append('phone', data.phone)
    formData.append('email', data.email)
    formData.append('address', data.address)
    formData.append('city', data.city)
    formData.append('state', data.state)
    formData.append('postcode', data.postcode)
    formData.append('agreesToTerms', String(data.agreesToTerms))
    formData.append('signatureName', data.signatureName)
    formData.append('signatureDate', data.signatureDate)
    if (data.tattooArtist) formData.append('tattooArtist', data.tattooArtist)
    formData.append('idUpload', data.idUpload[0])

    const { error } = await supabase.functions.invoke('submit-consent', { body: formData })

    if (error) {
      setSubmitError('Something went wrong submitting this form — please show a staff member.')
      return
    }

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-border bg-muted/30 p-6 text-center">
        <p className="font-medium">Thanks — your form has been submitted.</p>
        <p className="mt-1 text-sm text-muted-foreground">Please show this screen to your artist.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6 text-left">
      <div className="space-y-1.5">
        <Label htmlFor="fullName">Full name</Label>
        <Input id="fullName" autoComplete="name" aria-invalid={!!errors.fullName} {...register('fullName')} />
        <FieldError message={errors.fullName?.message} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="dateOfBirth">Date of birth</Label>
          <Input id="dateOfBirth" type="date" aria-invalid={!!errors.dateOfBirth} {...register('dateOfBirth')} />
          <FieldError message={errors.dateOfBirth?.message} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" autoComplete="tel" aria-invalid={!!errors.phone} {...register('phone')} />
          <FieldError message={errors.phone?.message} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="idType">ID type</Label>
          <Input id="idType" placeholder="Driver's license, passport, etc." aria-invalid={!!errors.idType} {...register('idType')} />
          <FieldError message={errors.idType?.message} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="idNumber">ID number</Label>
          <Input id="idNumber" aria-invalid={!!errors.idNumber} {...register('idNumber')} />
          <FieldError message={errors.idNumber?.message} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register('email')} />
        <FieldError message={errors.email?.message} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="address">Address</Label>
        <Input id="address" autoComplete="street-address" aria-invalid={!!errors.address} {...register('address')} />
        <FieldError message={errors.address?.message} />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label htmlFor="city">City</Label>
          <Input id="city" aria-invalid={!!errors.city} {...register('city')} />
          <FieldError message={errors.city?.message} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="state">State</Label>
          <Input id="state" aria-invalid={!!errors.state} {...register('state')} />
          <FieldError message={errors.state?.message} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="postcode">Postcode</Label>
          <Input id="postcode" aria-invalid={!!errors.postcode} {...register('postcode')} />
          <FieldError message={errors.postcode?.message} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Photo of ID</Label>
        <FileInput
          id="idUpload"
          accept="image/*,.pdf"
          aria-invalid={!!errors.idUpload}
          {...register('idUpload')}
        />
        <p className="text-xs text-muted-foreground">A photo of the ID named above.</p>
        <FieldError message={errors.idUpload?.message} />
      </div>

      {/* Real consent text, matching the client's paper form exactly (received
          2026-07-15) — do not paraphrase or trim this without the client's sign-off. */}
      <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">Tattoo Consent Form</p>
        <p className="mt-2">
          I acknowledge by signing this agreement that I have been given the full opportunity to ask
          any and all questions which I might have about the obtaining of a tattoo and that all of my
          questions have been answered to my full satisfaction. I specifically acknowledge I have been
          advised of the facts and matters set forth below and I agree as follows:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            If I have diabetes, epilepsy, hepatitis, hemophilia, HIV-AIDS or any other communicable
            disease, heart condition or take medication which thins the blood I have advised my tattoo
            artist. I am not pregnant or nursing. I am not under the influence of alcohol or drugs.
          </li>
          <li>
            I do not have medical or skin conditions such as but not limited to: acne, scarring
            (Keloid) eczema, psoriasis, freckles, moles or sunburn in the area to be tattooed that may
            interfere with said tattoo.
          </li>
          <li>
            I acknowledge it is not reasonably possible for the representatives and employees of this
            tattoo premises to determine whether I might have an allergic reaction to the pigments or
            processes used in my tattoo, and I agree to accept the risk that such a reaction is
            possible.
          </li>
          <li>
            I acknowledge that an infection is always possible as a result of the obtaining of a tattoo,
            particularly in the event that I do not take proper care of my tattoo. I have received
            aftercare instructions and I agree to follow them while my tattoo is healing. I agree that
            any touch-up work needed, due to my own negligence, will be done at my own expense.
          </li>
          <li>
            I realize that variations in color and design may exist between any tattoo as selected by me
            and as ultimately applied to my body. I understand that if my skin color is dark, the colors
            will not appear as bright as they do on light skin.
          </li>
          <li>
            I understand that if I have any skin treatments, laser hair removal, plastic surgery or
            other skin altering procedures, it may result in adverse changes to my tattoo.
          </li>
          <li>
            I acknowledge that a tattoo is a permanent change to my appearance and that no
            representations have been made to me as to the ability to later change or remove my tattoo.
            To my knowledge, I do not have a physical, mental or medical impairment or disability which
            might affect my well being as a direct or indirect result of my decision to have a tattoo.
          </li>
          <li>
            I acknowledge I am over the age of 18. I have truthfully presented to my tattooer that the
            obtaining of a tattoo is by my choice alone. I consent to the application of the tattoo and
            to any actions or conduct of the representatives and employees of the tattoo shop reasonably
            necessary to perform the tattoo procedure.
          </li>
          <li>
            I fully understand THE TATTOO ARTIST DOES NOT ACT AS A MEDICAL PROFESSIONAL. Any suggestions
            made to me are NOT to be construed as or substituted for advice from a medical professional.
          </li>
        </ul>
      </div>

      <div>
        <Controller
          control={control}
          name="agreesToTerms"
          render={({ field }) => (
            <label className="flex items-start gap-2 text-sm">
              <Checkbox checked={!!field.value} onCheckedChange={field.onChange} />
              <span>I have read, understood, and agree to all of the above.</span>
            </label>
          )}
        />
        <FieldError message={errors.agreesToTerms?.message} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="signatureName">Signature (type your full name)</Label>
          <Input id="signatureName" aria-invalid={!!errors.signatureName} {...register('signatureName')} />
          <FieldError message={errors.signatureName?.message} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="signatureDate">Date</Label>
          <Input id="signatureDate" type="date" aria-invalid={!!errors.signatureDate} {...register('signatureDate')} />
          <FieldError message={errors.signatureDate?.message} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="tattooArtist">Tattoo artist (optional)</Label>
        <Input id="tattooArtist" placeholder="Who's doing your tattoo today?" {...register('tattooArtist')} />
      </div>

      {submitError && <p className="text-sm text-destructive">{submitError}</p>}

      <Button type="submit" disabled={isSubmitting} className="h-11 w-full rounded-lg text-base">
        {isSubmitting ? 'Submitting…' : 'Submit Consent Form'}
      </Button>
    </form>
  )
}
