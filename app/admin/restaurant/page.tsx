import { adminAuth } from '../_actions/serverAuth'

async function RestaurantPage() {
  const session = await adminAuth()
  if (!session) return <h1>Restricted Access</h1>
  return <>Restaurant Page</>
}

export default RestaurantPage
