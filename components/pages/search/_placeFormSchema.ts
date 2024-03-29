import { z } from 'zod'

export const placeFormSchema = z.object({
  // id: z.string(),
  placeId: z.string(),
  name: z.string().min(3),
  // description: z.string(),
  address: z.string(),
  latitude: z.number().min(-90).max(90),
  longtitude: z.number().min(-180).max(180),
})

export type PlaceFormType = z.infer<typeof placeFormSchema>

