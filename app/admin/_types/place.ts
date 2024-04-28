import { z } from 'zod'

export const placeFormSchema = z.object({
  placeId: z.string(),
  name: z.string().min(3),
  address: z.string(),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  googleURL: z.string().url(),
  website: z.union([z.literal(''), z.string().url().optional()]),
})

export type PlaceFormType = z.infer<typeof placeFormSchema>
