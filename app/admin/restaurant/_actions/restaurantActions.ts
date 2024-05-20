'use server'

import db from '@/lib/prisma'
import { RestaurantType, restaurantSchema } from '../_types/restaurantTypes'

export async function getRestaurants() {
  return await db.restaurant.findMany()
}

export async function getResturantById(id: string) {
  return await db.restaurant.findUnique({ where: { id } })
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

export async function editRestaurant(restaurant: RestaurantType) {
  console.table(restaurant)
  const result = restaurantSchema.safeParse(restaurant)

  if (!result.success) return new Error('Invalid restaurant data')
  try {
    const response = await db.restaurant.update({
      where: { id: restaurant.id },
      data: restaurant,
    })

    console.table(response)
  } catch (e) {
    return new Error('Failed to update restaurant')
  }
}

export async function deleteRestaurant(id: string) {
  try {
    await db.restaurant.delete({ where: { id } })
  } catch (e) {
    return new Error('Failed to delete restaurant')
  }
}
