import { Badge } from '@/components/ui/badge'
import { Rating, Restaurant } from '@prisma/client'
import Link from 'next/link'
import { Dispatch } from 'react'

function colorMap(rating: Rating) {
  switch (rating) {
    case 'COMMON':
      return 'text-black'
    case 'UNCOMMON':
      return 'text-slate-400'
    case 'RARE':
      return 'text-blue-700'
    case 'MYTHIC':
      return 'text-orange-700'
  }
}

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
      className="flex flex-col justify-center gap-5 py-5 md:py-3"
      onClick={() => {
        if (!!selectRestaurant) selectRestaurant(restaurant.id)
      }}
    >
      <h1 className={`text-xl font-bold ${colorMap(restaurant.rating)}`}>
        {restaurant.name}
      </h1>
      <div>{restaurant.address}</div>
      {!!restaurant.tags && (
        <div className="flex gap-2">
          {restaurant.tags.map((tag, index) => (
            <Badge key={index}>{tag}</Badge>
          ))}
        </div>
      )}

      {!!restaurant.website && (
        <Link
          href={restaurant.website}
          className="my-2 py-2 font-bold text-blue-700"
          target="_blank"
        >
          {restaurant.website}
        </Link>
      )}

      {opened && (
        <>{restaurant.phoneNumber && <div>{restaurant.phoneNumber}</div>}</>
      )}
    </section>
  )
}
