import { adminAuth } from '../_actions/serverAuth'
import { getRestaurants } from './_actions/restaurantActions'

async function RestaurantPage() {
  const session = await adminAuth()
  if (!session) return <h1>Restricted Access</h1>

  const restaurants = await getRestaurants()
  return (
    <>
      {restaurants.map((restaurant) => (
        <div key={restaurant.id}>
          {restaurant.name} - {restaurant.id}
        </div>
      ))}
    </>
  )
}

export default RestaurantPage
