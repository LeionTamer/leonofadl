'use server'

import { placeFormSchema } from '../_types/place'

export async function addPlace(prevState: unknown, formData: FormData) {
  console.table(formData)
  const result = placeFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  )

  console.table(result)

  if (result.success === false) {
    console.table(result.error.formErrors.fieldErrors)
    return result.error.formErrors.fieldErrors
  }
}
