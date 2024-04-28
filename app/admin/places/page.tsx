import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/helpers/auth'
import db from '@/lib/prisma'

async function getPlaceList() {
  const data = await db?.googlePlaces.findMany()

  return {
    data,
  }
}

export default async function Restaurants() {
  const session = await getServerSession(authOptions)
  const data = await getPlaceList()

  if (!session) {
    redirect('/api/auth/signin')
  } else {
    if (session.user.email !== 'leoncarbonell@gmail.com') {
      redirect('/')
    }
  }

  return <>{JSON.stringify(data)}</>
}
