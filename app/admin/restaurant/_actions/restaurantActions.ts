'use server'

import db from '@/lib/prisma'
import { RestaurantType, restaurantSchema } from '../_types/restaurantTypes'
import { revalidatePath } from 'next/cache'

export async function getRestaurants() {
  return await db.restaurant.findMany()
}

export async function getResturantById(id: string) {
  return await db.restaurant.findUnique({ where: { id } })
}

export async function addRestaurant(restaurant: RestaurantType) {
  const result = restaurantSchema.safeParse(restaurant)

  if (!result.success) return { error: 'Invalid restaurant data' }
  try {
    const response = await db.restaurant.create({
      data: { ...restaurant, website: restaurant.website || '' },
    })

    revalidatePath('/admin/restaurant')
    revalidatePath('/explore')
    revalidatePath('/restaurant')
  } catch (e) {
    return { error: 'Failed to add restaurant' }
  }
}

export async function editRestaurant(restaurant: RestaurantType) {
  const result = restaurantSchema.safeParse(restaurant)

  if (!result.success) return { error: 'Invalid restaurant data' }
  try {
    const response = await db.restaurant.update({
      where: { id: restaurant.id },
      data: { ...restaurant, updatedAt: new Date() },
    })

    revalidatePath('/admin/restaurant')
    revalidatePath('/explore')
    revalidatePath('/restaurant')
  } catch (e) {
    return { error: 'Failed to update restaurant' }
  }
}

export async function deleteRestaurant(id: string) {
  try {
    await db.restaurant.delete({ where: { id } })

    revalidatePath('/admin/restaurant')
  } catch (e) {
    return { error: 'Failed to delete restaurant' }
  }
}
