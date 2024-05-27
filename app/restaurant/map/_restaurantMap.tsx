'use client'

import {
  DeckContextProvider,
  useDeckStateContext,
} from '@/components/deckgl/_deckcontext'
import BaseMap from '@/components/deckgl/basemap'
import { Restaurant } from '@prisma/client'
import { GeoJsonLayer } from 'deck.gl/typed'
import { FeatureCollection, Feature, Geometry } from 'geojson'
import { useEffect, useState } from 'react'

interface IRestarurantMapViewProps {
  restaurants: Restaurant[]
}

function RestaurantMapView({ restaurants }: IRestarurantMapViewProps) {
  const [] = useState(10)
  const geoData: FeatureCollection = {
    type: 'FeatureCollection',
    features: restaurants.map((restaurant) => ({
      type: 'Feature',
      properties: { name: restaurant.name, id: restaurant.id },
      geometry: {
        coordinates: [restaurant.longtitude, restaurant.latitude],
        type: 'Point',
      },
    })),
  }

  const { state, dispatch } = useDeckStateContext()

  // const zoom = state.viewState.zoom
  // const radius = zoom <= 10 ? 10 : zoom <= 15 ? 20 : 30

  const geoLayer = new GeoJsonLayer({
    id: 'geojson-layer',
    data: geoData,
    pickable: true,
    stroked: false,
    filled: true,
    extruded: true,
    getFillColor: [250, 0, 0, 255],
    getPointRadius: 10,
    getLineWidth: 10,
    getElevation: 30,
    onClick: (info) => {
      const properties = info.object.properties
      const [longitude, latitude] = info.object.geometry.coordinates as [
        number,
        number,
      ]
      const viewState = state.viewState
      dispatch({
        viewState: { ...viewState, longitude, latitude, zoom: 16 },
      })
    },
  })

  return <BaseMap height="100vh" layers={[geoLayer]} />
}

const WrappedMapView = ({ restaurants }: IRestarurantMapViewProps) => {
  return (
    <DeckContextProvider>
      <RestaurantMapView restaurants={restaurants} />
    </DeckContextProvider>
  )
}

export default WrappedMapView
