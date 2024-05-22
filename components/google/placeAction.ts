'use server'
import { gMapClient } from '@/lib/google-api'
const apiKey = process.env.GOOGLE_API_KEY || ''

export async function placeAutoComplete(
  searchText: string,
  longtitude: number,
  latitude: number
) {
  const autocomplete = await gMapClient.placeAutocomplete({
    params: {
      key: apiKey,
      input: searchText,
      location: `${latitude},${longtitude}`,
      radius: 10,
    },
  })

  return { data: autocomplete.data }
}

export async function getPlaceDetails(placeId: string) {
  const response = await gMapClient.placeDetails({
    params: {
      key: apiKey,
      place_id: placeId,
    },
  })

  return { data: response.data.result }
}
