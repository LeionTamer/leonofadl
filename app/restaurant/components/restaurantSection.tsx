import { Restaurant } from '@prisma/client'
import Link from 'next/link'
import { Dispatch } from 'react'

interface IRestaurantSection {
  restaurant: Restaurant
  opened?: boolean
  selectRestaurant?: Dispatch<string>
}

export default function RestaurantSection({
  restaurant,
  opened,
  selectRestaurant,
}: IRestaurantSection) {
  return (
    <section
      className="flex flex-col justify-center py-5 md:py-3"
      onClick={() => {
        if (!!selectRestaurant) selectRestaurant(restaurant.id)
      }}
    >
      <h1 className="text-xl font-bold">{restaurant.name}</h1>
      <div>{restaurant.address}</div>
      {!!restaurant.website && (
        <Link
          href={restaurant.website}
          className="my-2 py-2 font-bold text-blue-700"
          target="_blank"
        >
          {restaurant.website}
        </Link>
      )}

      {/* {opened && <p>Open</p>} */}
      {opened && (
        <>{restaurant.phoneNumber && <div>{restaurant.phoneNumber}</div>}</>
      )}
    </section>
  )
}
