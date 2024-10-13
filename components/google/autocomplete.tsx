'use client'

import { useDebouncedValue } from '@mantine/hooks'
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command'
import { Dispatch, FC, startTransition, useEffect, useState } from 'react'
import {
  PlaceAutocompleteResult,
  PlaceData,
} from '@googlemaps/google-maps-services-js'
import { DeckViewStateType, useDeckStateContext } from '../deckgl/_deckcontext'
import { getPlaceDetails, placeAutoComplete } from './placeAction'
import { FlyToInterpolator } from 'deck.gl/typed'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || ''

interface IGoogleAutocompleteProps {
  location?: string
  result?: Dispatch<PlaceAutocompleteResult>
}

const GoogleAutocomplete: FC<IGoogleAutocompleteProps> = ({
  location = '138.599503,-34.92123',
  ...props
}) => {
  const [search, setSearch] = useState('')
  const [searchPlace] = useDebouncedValue(search, 500)
  const { state, dispatch } = useDeckStateContext()
  const [autoOptions, setAutoOption] = useState<PlaceAutocompleteResult[]>([])

  useEffect(() => {
    if (searchPlace.length < 3) setAutoOption([])
    else {
      startTransition(() => {
        placeAutoComplete(
          searchPlace,
          state.viewState.longitude,
          state.viewState.latitude
        ).then((resp) => setAutoOption(resp.data.predictions))
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchPlace])

  async function setViewState(placeId: string) {
    startTransition(() => {
      getPlaceDetails(placeId).then((resp) => {
        const { data } = resp as { data: Partial<PlaceData> }

        dispatch({
          viewState: {
            ...state.viewState,
            zoom: 14,
            longtitude: data.geometry?.location.lng,
            latitude: data.geometry?.location.lat,
            transitionInterpolator: new FlyToInterpolator({ speed: 2 }),
            transitionDuration: 'auto',
          } as DeckViewStateType,
          googlePlaceDetails: data,
        })

        // dispatch({
        //   googlePlaceDetails: data,
        // })
      })
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
