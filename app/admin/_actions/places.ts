'use server'

import { placeFormSchema } from '../_types/place'

export async function addPlace(prevState: unknown, formData: FormData) {
  console.table(Object.fromEntries(formData.entries()))
  const result = placeFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  )

  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data
}
