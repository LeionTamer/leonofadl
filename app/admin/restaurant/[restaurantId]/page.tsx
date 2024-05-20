import { adminAuth } from '../../_actions/serverAuth'
import { getResturantById } from '../_actions/restaurantActions'
import { RestaurantForm } from '../_forms/restaurantForm'
import { RestaurantType } from '../_types/restaurantTypes'

export default async function EditRestaurantPage({
  params,
}: {
  params: { restaurantId: string }
}) {
  const session = await adminAuth

  const restaurant = (await getResturantById(
    params.restaurantId
  )) as unknown as RestaurantType
  if (!restaurant) return <>Not Found</>

  return (
    <div className="max-w-5xl mx-auto">
      <RestaurantForm restaurant={restaurant} />
    </div>
  )
}
