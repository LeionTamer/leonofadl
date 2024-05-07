import { authOptions } from '@/helpers/auth'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import AutoCompleteMap from '@/components/google/autocompleteMap'
import PlaceForm from '../_components/PlaceForm'

export default async function NewPlacePage() {
  const session = await getServerSession(authOptions)

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
      <div className="max-w-7xl px-10 mx-auto">
        <AutoCompleteMap>
          <PlaceForm />
        </AutoCompleteMap>
      </div>
    </>
  )
}
