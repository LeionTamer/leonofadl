import { getServerSession } from 'next-auth'
import RestaurantForm from './_restaurantForm'
import { redirect } from 'next/navigation'

export default async function Restaurants() {
  const session = await getServerSession()

  if (!session) {
    redirect('/api/auth/signin')
  } else {
    // console.table(session)
    if (session.user.email !== 'leoncarbonell@gmail.com') {
      redirect('/')
    }
  }

  return (
    <>
      <RestaurantForm />
    </>
  )
}
