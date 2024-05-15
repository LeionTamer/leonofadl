import db from '@/lib/prisma'
import { adminAuth } from '../_actions/serverAuth'

async function getPlaceList() {
  const data = await db?.googlePlaces.findMany()

  return {
    data,
  }
}

export default async function Restaurants() {
  const isAdmin = await adminAuth()

  if (!isAdmin) return <>Unauthorised</>
  const data = await getPlaceList()

  return <>{JSON.stringify(data)}</>
}
