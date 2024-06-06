import { getRestaurants } from './_actions/restaurantAction'
import RestaurantList from './components/restaurantList'

async function RestaurantPage() {
  const restaurants = await getRestaurants()

  return (
    <>
      <RestaurantList restaurants={restaurants} />
    </>
  )
}

export default RestaurantPage
