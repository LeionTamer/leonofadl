'use client'

import {
  DeckContextProvider,
  useDeckStateContext,
} from '@/components/deckgl/_deckcontext'
import BaseMap from '@/components/deckgl/basemap'
import GoogleAutocomplete from '@/components/google/autocomplete'
import { BitmapLayer, GeoJsonLayer, IconLayer } from 'deck.gl/typed'
import { PlaceForm } from './_placeForm'
import { ReactNode, useEffect, useState } from 'react'

function SearchPageComponent() {
  const [pinData, setPinData] = useState<
    | undefined
    | {
        name: string
        address: string
        coordinates: [number, number]
      }
  >(undefined)

  const { state } = useDeckStateContext()

  const pinLayer = new IconLayer({
    id: 'icon-layer',
    data: [
      !!pinData ? pinData : {},
      // {
      //   name: 'Colma (COLM)',
      //   address: '365 D Street, Colma CA 94014',
      //   exits: 4214,
      //   coordinates: [-122.466233, 37.684638],
      // },
    ],
    pickable: true,
    // iconAtlas and iconMapping are required
    // getIcon: return a string
    iconAtlas:
      'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
    iconMapping: {
      marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
    },
    getIcon: (d) => 'marker',

    sizeScale: 8,
    getPosition: (d) => d.coordinates,
    getSize: (d) => 5,
    getColor: (d) => [Math.sqrt(d.exits), 140, 0],
  })

  const geoLayer = new GeoJsonLayer({
    id: 'geojson-layer',
    data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart.geo.json',
    pickable: true,
    stroked: false,
    filled: true,
    extruded: true,
    pointType: 'circle',
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: [160, 160, 180, 200],
    // getLineColor: (d) => colorToRGBArray(d.properties.color),
    getPointRadius: 100,
    getLineWidth: 1,
    getElevation: 30,
  })

  useEffect(() => {
    if (!!state.googlePlaceDetails) {
      console.log('call me!')
      setPinData({
        name: state.googlePlaceDetails.name!,
        address: state.googlePlaceDetails.formatted_address!,
        coordinates: [
          state.googlePlaceDetails.geometry!.location.lng,
          state.googlePlaceDetails.geometry!.location.lat,
        ],
      })
    }
  }, [state.googlePlaceDetails])

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mt-5 mx-10">
        <GoogleAutocomplete />
      </div>
      <div className="mt-5 mx-10">
        <BaseMap layers={[geoLayer, pinLayer]} height="300px" />
      </div>
      <PlaceForm />
    </div>
  )
}

const SearchPageWithProvider = () => {
  return (
    <DeckContextProvider>
      <SearchPageComponent />
    </DeckContextProvider>
  )
}

export default SearchPageWithProvider
