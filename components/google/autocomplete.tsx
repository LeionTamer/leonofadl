'use client'

import { useDebouncedState } from '@mantine/hooks'
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command'
import { Dispatch, FC, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  PlaceAutocompleteResponse,
  PlaceAutocompleteResult,
} from '@googlemaps/google-maps-services-js'
import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || ''
const url = `${baseURL}/api/google/autocomplete`

interface IGoogleAutocompleteProps {
  location?: string
  result?: Dispatch<PlaceAutocompleteResult>
}

const GoogleAutocomplete: FC<IGoogleAutocompleteProps> = ({
  location = '34.921230,0138.599503',
  ...props
}) => {
  const [search, setSearch] = useDebouncedState('', 50)

  const searchFn = async (): Promise<PlaceAutocompleteResponse | undefined> => {
    if (search.length >= 3) {
      var newURL = new URL(url)
      newURL.searchParams.append('input', search)
      newURL.searchParams.append('location', location)
      return axios.get(newURL.toString()).then((response) => response.data)
    }
  }
  const searchAPI = useQuery({
    queryKey: ['autocomplete'],
    queryFn: async () => searchFn(),
    enabled: search.length >= 3,
  })

  const options = !!searchAPI.data ? searchAPI.data.data.predictions : []

  const PlacesList = () => {
    if (options.length <= 1) return null

    return (
      <CommandList>
        <CommandGroup heading="List of places">
          {options.map((entry) => (
            <CommandItem
              key={entry.place_id}
              value={entry.description}
              onSelect={() => {
                console.table(entry)
                setSearch(entry.description)
              }}
            >
              {entry.description}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    )
  }

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput
        value={search}
        placeholder="Search for a location"
        onChangeCapture={(event) => setSearch(event.currentTarget.value)}
      />
      <PlacesList />
    </Command>
  )
}

export default GoogleAutocomplete
