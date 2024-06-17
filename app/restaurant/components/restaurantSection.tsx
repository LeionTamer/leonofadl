import { Badge } from '@/components/ui/badge'
import { Rating, Restaurant } from '@prisma/client'
import Link from 'next/link'
import { Dispatch } from 'react'

function colorMap(rating: Rating) {
  switch (rating) {
    case 'COMMON':
      return 'text-black'
    case 'UNCOMMON':
      return 'text-slate-700/60'
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
  listView?: boolean
}

export default function RestaurantSection({
  restaurant,
  opened,
  selectRestaurant,
  listView = false,
}: IRestaurantSection) {
  return (
    <section
      className={`flex flex-col justify-center gap-5 ${
        opened && listView && 'bg-orange-200/20'
      } ${listView && 'px-3 py-2 md:px-5'}`}
      onClick={() => {
        if (!!selectRestaurant) selectRestaurant(restaurant.id)
      }}
    >
      <h1
        className={`text-xl font-bold ${colorMap(restaurant.rating)} ${
          listView ? 'my-4 md:my-2' : 'mb-5 md:mb-3'
        }`}
      >
        {restaurant.name}
      </h1>
      {!!restaurant.tags && restaurant.tags.length >= 1 ? (
        <div className="flex gap-2">
          {restaurant.tags.map((tag, index) => (
            <Badge key={index}>{tag}</Badge>
          ))}
        </div>
      ) : null}

      {!!restaurant.website && (
        <Link
          href={restaurant.website}
          className="font-bold text-blue-700"
          target="_blank"
        >
          {restaurant.website}
        </Link>
      )}

      {opened && (
        <>
          <div>{restaurant.address}</div>
          {restaurant.phoneNumber && <div>{restaurant.phoneNumber}</div>}
        </>
      )}
    </section>
  )
}
