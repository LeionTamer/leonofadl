'use client'
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Restaurant } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface ISearchProps {
  restaurants: Restaurant[]
}

export function SearchRestaurant({ restaurants }: ISearchProps) {
  const [entry, setEntry] = useState('')
  const router = useRouter()

  //   if (!restaurants.length) return null

  const filteredRestaurants =
    entry.length >= 3
      ? restaurants.filter(
          (restaurant) =>
            restaurant.tags.some((tag) => tag.includes(entry.toLowerCase())) ||
            restaurant.name.toLowerCase().includes(entry.toLowerCase())
        )
      : []

  return (
    <>
      <Command className="rounded-lg border shadow-md" shouldFilter={false}>
        <CommandInput
          placeholder="Type a command or search..."
          value={entry}
          onValueChange={(e) => setEntry(e)}
        />

        <CommandList>
          {filteredRestaurants.map((restaurant) => (
            <CommandItem key={`${restaurant.id}`}>
              <span
                onClick={() =>
                  router.push(`/admin/restaurant/${restaurant.id}`)
                }
              >
                {restaurant.name}
              </span>
            </CommandItem>
          ))}
        </CommandList>
      </Command>
    </>
  )
}

export default SearchRestaurant
