import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getRestaurants } from './_actions/restaurantAction'

async function RestaurantPage() {
  const restaurants = await getRestaurants()

  return (
    <>
      <div className="max-w-7xl mx-auto px-2 my-5 md:my-2">
        <div className="flex flex-col gap-2">
          {restaurants.map((restaurant) => (
            //   <div key={restaurant.id}>
            //     <h1>{restaurant.name}</h1>
            //     <p>{restaurant.address}</p>
            //     <p>{restaurant.website}</p>
            //   </div>
            <Card key={restaurant.id}>
              <CardHeader>
                <CardTitle>{restaurant.name}</CardTitle>
                {!!restaurant.leonNotes && (
                  <CardDescription>{restaurant.leonNotes}</CardDescription>
                )}
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}

export default RestaurantPage
