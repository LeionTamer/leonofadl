'use client'

import { Button } from '@/components/ui/button'
import { RestaurantType } from '../_types/restaurantTypes'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useMutation } from '@tanstack/react-query'
import { deleteRestaurant } from '../_actions/restaurantActions'

export default function DeleteButton({
  restaurant,
}: {
  restaurant: Partial<RestaurantType>
}) {
  const { mutate } = useMutation({
    mutationFn: async () => await deleteRestaurant(restaurant.id!),
  })

  const handleDelete = async () => {
    await mutate()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogDescription>Delete entry?</DialogDescription>
        <DialogFooter>
          {/* <DialogClose asChild> */}
          <Button variant={'destructive'} onClick={handleDelete}>
            Delete
          </Button>
          {/* </DialogClose> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
