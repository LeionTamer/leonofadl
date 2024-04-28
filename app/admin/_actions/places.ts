'use server'

import { placeFormSchema } from '../_types/place'
import db from '@/lib/prisma'

export async function addPlace(prevState: unknown, formData: FormData) {
  const result = placeFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  )

  if (result.success === false) {
    console.table(result.error.formErrors.fieldErrors)
    return result.error.formErrors.fieldErrors
  }

  const data = result.data

  const GooglePlace = await db?.googlePlaces.create({
    data: data,
  })

  console.table(GooglePlace)
}
