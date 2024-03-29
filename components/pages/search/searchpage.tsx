'use client'

import { DeckContextProvider } from '@/components/deckgl/_deckcontext'
import BaseMap from '@/components/deckgl/basemap'
import GoogleAutocomplete from '@/components/google/autocomplete'
import { BitmapLayer, GeoJsonLayer } from 'deck.gl/typed'
import { PlaceForm } from './_placeForm'

function SearchPageComponent() {
  const bitmapLayer = new BitmapLayer({
    id: 'bitmap-layer',
    bounds: [-122.519, 37.7045, -122.355, 37.829],
    image:
      'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf-districts.png',
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
  return (
    <DeckContextProvider>
      <div className="max-w-3xl mx-auto">
        <div className="mt-5 mx-10">
          <GoogleAutocomplete />
        </div>
        <div className="mt-5 mx-10">
          {/* <BaseMap layers={[bitmapLayer, geoLayer]} height="300px" /> */}
        </div>
        <PlaceForm />
      </div>
    </DeckContextProvider>
  )
}

export default SearchPageComponent
