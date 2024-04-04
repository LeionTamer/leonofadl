import { getServerSession } from 'next-auth'
import PlaceForm from './_placeForm'
import { redirect } from 'next/navigation'
import { authOptions } from '@/helpers/auth'

export default async function Restaurants() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin')
  } else {
    if (session.user.email !== 'leoncarbonell@gmail.com') {
      redirect('/')
    }
  }

  return (
    <>
      <PlaceForm />
    </>
  )
}
