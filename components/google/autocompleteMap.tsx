'use client'

import {
  DeckContextProvider,
  useDeckStateContext,
} from '@/components/deckgl/_deckcontext'
import BaseMap from '@/components/deckgl/basemap'
import GoogleAutocomplete from '@/components/google/autocomplete'
import { GeoJsonLayer, IconLayer } from 'deck.gl/typed'
import { ReactNode, useEffect, useState } from 'react'

function createSVGIcon(idx: number) {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 0 24 24" width="40px" fill="#EA3323"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-1.8C18 6.57 15.35 4 12 4s-6 2.57-6 6.2c0 2.34 1.95 5.44 6 9.14 4.05-3.7 6-6.8 6-9.14zM12 2c4.2 0 8 3.22 8 8.2 0 3.32-2.67 7.25-8 11.8-5.33-4.55-8-8.48-8-11.8C4 5.22 7.8 2 12 2z"/></svg>
  `
}

function svgToDataURL(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

const SearchAndMap = () => {
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
    data: [!!pinData ? pinData : {}],
    pickable: true,
    getIcon: (d, { index }) => ({
      url: svgToDataURL(createSVGIcon(11)),
      width: 24,
      height: 24,
    }),

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
    getPointRadius: 100,
    getLineWidth: 1,
    getElevation: 30,
  })

  useEffect(() => {
    if (!!state.googlePlaceDetails) {
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
    <>
      <div className="mt-5">
        <GoogleAutocomplete />
      </div>
      <div className="mt-5">
        <BaseMap layers={[geoLayer, pinLayer]} height="300px" />
      </div>
    </>
  )
}

const AutoCompleteMap = ({ children }: { children: ReactNode }) => {
  return (
    <DeckContextProvider>
      <SearchAndMap />

      {children}
    </DeckContextProvider>
  )
}

export default AutoCompleteMap
