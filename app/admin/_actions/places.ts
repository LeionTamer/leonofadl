"use server"

import {z} from 'zod'

export const placeFormSchema = z.object({
    placeId: z.string(),
    name: z.string().min(3),
    address: z.string(),
    latitude: z.number().min(-90).max(90),
    longtitude: z.number().min(-180).max(180),
    googleUrl: z.string().url(),
    website: z.string().url().optional(),
  })

export type PlaceFormType = z.infer<typeof placeFormSchema>

export async function addPlace(prevState: unknown, formData: FormData) {
    console.table(Object.fromEntries(formData.entries()))
    const result = placeFormSchema.safeParse(Object.fromEntries(formData.entries()))

    if(result.success === false) {
        return result.error.formErrors.fieldErrors
    }

    const data = result.data

    
}