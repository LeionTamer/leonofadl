import db from '@/lib/prisma'
import RestaurantSection from './restaurant/components/restaurantSection'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

export default async function Home() {
  const restaurants = await db.restaurant.findMany({
    take: 15,
  })

  return (
    <main className="min-h-screen flex-col items-center justify-between bg-[#ffc971]">
      <div className="mx-auto flex h-[300px] max-w-7xl flex-col items-center justify-center text-center text-5xl md:text-7xl">
        Elevate Your Eating Experience with Leon's Digital Twin!
      </div>
      <div className="mx-auto flex max-w-7xl flex-wrap justify-start">
        <div className="flex h-[600px] basis-1 flex-col items-center justify-center bg-red-200 px-10 text-3xl md:basis-1/2 md:text-4xl">
          Unleash your inner foodie with the ultimate guide to the best
          restaurants in Adelaide. Your perfect dining experience awaits!
        </div>
        <div className="flex h-[600px] basis-1 flex-col items-center justify-center px-10 md:basis-1/2">
          <Card className="min-h-full w-full overflow-y-auto">
            <CardHeader>
              <CardTitle>Latest Updates</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <div className="flex gap-2"> */}
              {restaurants.map((restaurant, index) => (
                <div key={restaurant.id} className="my-5">
                  {index >= 1 && <Separator />}
                  <div className="my-2 text-xl">{restaurant.name}</div>
                  {!!restaurant.website && (
                    <div className="w-full py-2 text-blue-700">
                      <Link href={restaurant.website} target="_blank">
                        {restaurant.website}
                      </Link>
                    </div>
                  )}
                  {!!restaurant.tags && (
                    <div className="flex gap-2">
                      {restaurant.tags.map((tag, index) => (
                        <Badge key={index}>{tag}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {/* </div> */}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
