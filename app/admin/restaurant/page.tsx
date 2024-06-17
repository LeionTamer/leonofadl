import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { adminAuth } from '../_actions/serverAuth'
import { getRestaurants } from './_actions/restaurantActions'
import Link from 'next/link'
import DeleteButton from './_forms/deleteButton'
import { Button } from '@/components/ui/button'
import { RestaurantType } from './_types/restaurantTypes'

async function RestaurantPage() {
  const session = await adminAuth()
  if (!session) return <h1>Restricted Access</h1>

  const restaurants = await getRestaurants()
  return (
    <div className="mx-auto my-5 max-w-5xl p-2">
      <div className="flex justify-end">
        <Button className="min-w-24">
          <Link href="/admin/restaurant/new">New</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden w-[250px] md:block">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {restaurants.map((restaurant) => (
            <TableRow key={restaurant.id}>
              <TableCell className="hidden md:block">{restaurant.id}</TableCell>
              <TableCell>
                <Link href={`/admin/restaurant/${restaurant.id}`}>
                  {restaurant.name}
                </Link>
              </TableCell>
              <TableCell width="2xl">
                <DeleteButton restaurant={restaurant as RestaurantType} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default RestaurantPage
