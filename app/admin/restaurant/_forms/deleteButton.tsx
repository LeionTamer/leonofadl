'use client'

import { Button } from '@/components/ui/button'
import { RestaurantType } from '../_types/restaurantTypes'

export default function DeleteButton({
  restaurant,
}: {
  restaurant: RestaurantType
}) {
  return <Button>Delete</Button>
}
