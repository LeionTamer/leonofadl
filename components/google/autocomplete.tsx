'use client'

import { useDebouncedState } from '@mantine/hooks'
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command'
import { FC, useEffect, useState } from 'react'
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
}

const GoogleAutocomplete: FC<IGoogleAutocompleteProps> = ({
  location = '34.921230,0138.599503',
  ...props
}) => {
  const [search, setSearch] = useDebouncedState('', 500)
  const [options, setOptions] = useState<PlaceAutocompleteResult[]>([])

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

  const PlacesList = () => {
    if (options.length <= 0) return null

    return (
      <CommandList>
        <CommandGroup heading="List of places">
          {options.map((entry) => (
            <CommandItem key={entry.place_id}>{entry.description}</CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    )
  }

  useEffect(() => {
    if (search.length <= 2) setOptions([])
    if (search.length >= 3) searchAPI.refetch()
  }, [search])

  useEffect(() => {
    if (!!searchAPI.data) {
      console.table(searchAPI.data.data.predictions)
      setOptions([...searchAPI.data.data.predictions])
    }
  }, [searchAPI.data])

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput
        placeholder="Search for a location"
        onChangeCapture={(event) => setSearch(event.currentTarget.value)}
      />
      <PlacesList />
    </Command>
  )
}

export default GoogleAutocomplete
