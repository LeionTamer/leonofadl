import { adminAuth } from '../../_actions/serverAuth'
import { RestaurantFormWithSearch } from '../_forms/restaurantForm'

export default async function NewRestaurantPage() {
  const session = await adminAuth()

  return (
    <div className="max-w-5xl mx-auto">
      <RestaurantFormWithSearch />
    </div>
  )
}
