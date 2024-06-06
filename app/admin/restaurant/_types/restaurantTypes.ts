import { Restaurant } from '@prisma/client'
import * as z from 'zod'

const restaurantSchema: z.ZodType<
  Omit<
    Restaurant,
    'id' | 'website' | 'createdAt' | 'updatedAt' | 'tags' | 'phoneNumber'
  > & {
    id?: string
    website?: string
    tags?: string[]
    phoneNumber?: string
    createdAt?: Date
    updatedAt?: Date
  }
> = z.object({
  id: z.string().optional(),
  name: z.string().min(3),
  address: z.string(),
  latitude: z.coerce.number().min(-90).max(90),
  longtitude: z.coerce.number().min(-180).max(180),
  googleURL: z.string().url(),
  website: z.union([z.literal(''), z.string().url().optional()]),
  phoneNumber: z.string(),
  leonNotes: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type RestaurantType = z.infer<typeof restaurantSchema>

export { restaurantSchema }
