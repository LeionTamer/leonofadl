import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/helpers/auth'
import AutoCompleteMap from '@/components/google/autocompleteMap'

export default async function Restaurants() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin')
  } else {
    if (session.user.email !== 'leoncarbonell@gmail.com') {
      redirect('/')
    }
  }

  return <>List of places goes here</>
}
