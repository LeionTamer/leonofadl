'use client'

import { useDebouncedValue } from '@mantine/hooks'
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command'
import { Dispatch, FC, useEffect, useState } from 'react'
import {
  PlaceAutocompleteResponse,
  PlaceAutocompleteResult,
  PlaceData,
} from '@googlemaps/google-maps-services-js'
import axios from 'axios'
import { useDeckStateContext } from '../deckgl/_deckcontext'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || ''
const url = `${baseURL}/api/google/autocomplete`

interface IGoogleAutocompleteProps {
  location?: string
  result?: Dispatch<PlaceAutocompleteResult>
}

const GoogleAutocomplete: FC<IGoogleAutocompleteProps> = ({
  location = '138.599503,-34.92123',
  ...props
}) => {
  const [search, setSearch] = useState('')
  const [searchPlace] = useDebouncedValue(search, 60)
  const { state, dispatch } = useDeckStateContext()
  const [autoOptions, setAutoOption] = useState<PlaceAutocompleteResult[]>([])

  const searchFn = async (): Promise<PlaceAutocompleteResponse | undefined> => {
    if (search.length >= 3) {
      var newURL = new URL(url)
      newURL.searchParams.append('input', searchPlace)
      newURL.searchParams.append('location', location)
      return axios.get(newURL.toString()).then((response) => response.data)
    }
  }

  useEffect(() => {
    if (search.length < 3) setAutoOption([])
    else {
      searchFn().then(async (res) => {
        const data = await res?.data
        setAutoOption(data ? data.predictions : [])
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  async function setViewState(placeId: string) {
    const response = await fetch(`/api/google/place?placeId=${placeId}`)
    const data = (await response.json()) as Partial<PlaceData>

    dispatch({
      viewState: {
        ...state.viewState,
        longitude: data.geometry?.location.lng,
        latitude: data.geometry?.location.lat,
        zoom: 16,
      },
    })

    dispatch({
      googlePlaceDetails: data,
    })
  }

  const PlacesList = () => {
    if (autoOptions.length <= 1) return null

    return (
      <CommandList>
        <CommandGroup heading="List of places">
          {autoOptions.map((entry) => (
            <CommandItem
              key={entry.place_id}
              value={entry.description}
              onSelect={() => {
                setSearch(entry.description)
                setViewState(entry.place_id)
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
