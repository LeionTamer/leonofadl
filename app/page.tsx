import db from '@/lib/prisma'
import RestaurantSection from './restaurant/components/restaurantSection'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

export default async function Home() {
  const restaurants = await db.restaurant.findMany({
    take: 5,
  })

  return (
    <main className="min-h-screen flex-col items-center justify-between bg-[#ffc971]">
      <div className="mx-auto flex h-72 max-w-7xl flex-col items-center justify-center text-center text-4xl md:text-5xl">
        {"Elevate Your Eating Experience with Leon's Digital Twin!"}
      </div>
      <div className="mx-auto flex max-w-7xl flex-wrap justify-start">
        <div className="h-90 w-full content-center bg-red-200 p-10 align-middle md:w-1/2 md:px-10">
          <div className="flex-col content-center items-center justify-center text-2xl md:basis-1/2 md:text-3xl">
            Unleash your inner foodie with the ultimate guide to the best
            restaurants in Adelaide. Your perfect dining experience awaits!
          </div>
        </div>
        <div className="h-90 mx-auto w-full flex-row overflow-y-auto p-5 md:w-1/2">
          <div className="mb-5 text-2xl">Latest</div>
          <div className="my-auto">
            {restaurants.map((restaurant, index) => (
              <div key={restaurant.id} className="my-2">
                {index >= 1 && <Separator />}
                <div className="my-2 truncate text-xl">{restaurant.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
