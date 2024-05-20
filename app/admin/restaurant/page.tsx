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

async function RestaurantPage() {
  const session = await adminAuth()
  if (!session) return <h1>Restricted Access</h1>

  const restaurants = await getRestaurants()
  return (
    <div className="max-w-5xl mx-auto my-5 p-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {restaurants.map((restaurant) => (
            <TableRow key={restaurant.id}>
              <TableCell>{restaurant.id}</TableCell>
              <TableCell>
                <Link href={`/admin/restaurant/${restaurant.id}`}>
                  {restaurant.name}
                </Link>
              </TableCell>
              <TableCell>
                <DeleteButton restaurant={restaurant} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default RestaurantPage
