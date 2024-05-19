'use server'

import db from '@/lib/prisma'
import { RestaurantType, restaurantSchema } from '../_types/restaurantTypes'

export async function getRestaurants() {
  return await db.restaurant.findMany()
}

export async function addRestaurant(restaurant: RestaurantType) {
  const result = restaurantSchema.safeParse(restaurant)

  if (!result.success) return new Error('Invalid restaurant data')
  try {
    const response = await db.restaurant.create({ data: restaurant })

    console.table(response)
  } catch (e) {
    return new Error('Failed to create restaurant')
  }
}
