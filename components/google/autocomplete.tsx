'use client'

import { useDebouncedState } from '@mantine/hooks'
import { Command, CommandInput } from '../ui/command'
import { FC, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  PlaceAutocompleteResponse,
  PlaceAutocompleteResponseData,
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

  useEffect(() => {
    // if (search.length <= 2) return
    if (search.length >= 3) searchAPI.refetch()
  }, [search])

  useEffect(() => {
    if (!!searchAPI.data) {
      console.table(searchAPI.data.data.predictions)
    }
  }, [searchAPI.data])

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput
        placeholder="Type a command or search..."
        onChangeCapture={(event) => setSearch(event.currentTarget.value)}
      />
    </Command>
  )
}

export default GoogleAutocomplete
