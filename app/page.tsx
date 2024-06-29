import db from '@/lib/prisma'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export default async function Home() {
  const restaurants = await db.restaurant.findMany({
    where: {
      status: 'OPEN',
    },
    orderBy: [
      {
        updatedAt: 'desc',
      },
    ],
    take: 5,
  })

  return (
    <main className="min-h-screen flex-col items-center justify-between bg-[#ffc971]">
      <div className="mx-auto flex h-72 max-w-7xl flex-col items-center justify-center text-center text-4xl md:text-5xl">
        {"Elevate Your Eating Experience with Leon's Digital Twin!"}
      </div>
      <div className="mx-auto flex max-w-7xl flex-wrap justify-start">
        <div className="h-90 flex w-full flex-col justify-between bg-red-200 p-5 align-middle md:w-1/2">
          <div className="flex-col content-center items-center justify-center p-5 text-2xl md:basis-1/2 md:text-3xl">
            Unleash your inner foodie with the ultimate guide to the best
            restaurants in Adelaide. Your perfect dining experience awaits!
          </div>
          <div className="my-8 w-full text-right text-2xl text-orange-700 md:text-3xl">
            <Link href="/explore">
              Explore{' '}
              <span className="material-symbols-outlined align-middle">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
        <div className="h-90 mx-auto w-full flex-row overflow-y-auto p-5 md:w-1/2">
          <div>
            <div className="mb-5 text-2xl">Latest Updates</div>
            <div className="my-auto">
              {restaurants.map((restaurant, index) => (
                <div key={restaurant.id} className="my-2">
                  {index >= 1 && <Separator />}
                  <div className="my-2 truncate text-xl">{restaurant.name}</div>
                </div>
              ))}
            </div>
            <div className="my-8 w-full text-right text-2xl text-orange-700 md:text-3xl">
              <Link href="/restaurant">
                View Restaurants{' '}
                <span className="material-symbols-outlined align-middle">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
