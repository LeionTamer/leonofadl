import { getRestaurants } from '../_actions/restaurantAction'
import RestaurantMapView from './_restaurantMap'

async function RestaurantMapPage() {
  const restaurants = await getRestaurants()
  if (!restaurants) return null
  return (
    <div>
      <RestaurantMapView restaurants={restaurants} />
    </div>
  )
}

export default RestaurantMapPage
