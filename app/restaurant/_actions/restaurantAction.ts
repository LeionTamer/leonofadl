'use server'
import db from '@/lib/prisma'

export async function getRestaurants() {
  return await db.restaurant.findMany({
    where: {
      status: 'OPEN',
    },
  })
}
