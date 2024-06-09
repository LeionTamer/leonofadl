import { getRestaurants } from '../restaurant/_actions/restaurantAction'
import ExploreMapView from './_exploreMap'

async function ExplorePage() {
  const restaurants = await getRestaurants()
  return <ExploreMapView restaurants={restaurants} />
}

export default ExplorePage
