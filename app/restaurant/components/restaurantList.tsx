'use client'

import { Restaurant } from '@prisma/client'
import RestaurantSection from './restaurantSection'
import { useState } from 'react'

interface IRestaurantListProps {
  restaurants: Restaurant[]
}

export default function RestaurantList({ restaurants }: IRestaurantListProps) {
  const [selected, setSelected] = useState<string | undefined>(undefined)

  function selectRestaurant(id: string) {
    if (id === selected) {
      setSelected(undefined)
    } else {
      setSelected(id)
    }
  }

  return (
    <div className="mx-auto my-5 max-w-7xl px-2 md:my-2">
      <div className="flex flex-col gap-2 divide-y divide-solid">
        {restaurants.map((restaurant) => (
          <RestaurantSection
            restaurant={restaurant}
            key={restaurant.id}
            opened={selected === restaurant.id}
            selectRestaurant={selectRestaurant}
          />
        ))}
      </div>
    </div>
  )
}