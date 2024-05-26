import { Restaurant } from '@prisma/client'
import * as z from 'zod'

const restaurantSchema: z.ZodType<
  Omit<Restaurant, 'id' | 'website'> & { id?: string; website?: string }
> = z.object({
  id: z.string(),
  name: z.string().min(3),
  address: z.string(),
  latitude: z.coerce.number().min(-90).max(90),
  longtitude: z.coerce.number().min(-180).max(180),
  googleURL: z.string().url(),
  website: z.union([z.literal(''), z.string().url().optional()]),
  leonNotes: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type RestaurantType = z.infer<typeof restaurantSchema>

export { restaurantSchema }
