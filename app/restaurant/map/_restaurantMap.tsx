'use client'

import {
  DeckContextProvider,
  useDeckStateContext,
} from '@/components/deckgl/_deckcontext'
import BaseMap from '@/components/deckgl/basemap'
import { Restaurant } from '@prisma/client'
import { GeoJsonLayer } from 'deck.gl/typed'
// import { multiPoint } from '@turf/helpers'
import { FeatureCollection } from 'geojson'
import { useEffect } from 'react'

interface IRestarurantMapViewProps {
  restaurants: Restaurant[]
}

function RestaurantMapView({ restaurants }: IRestarurantMapViewProps) {
  const geoData: FeatureCollection = {
    type: 'FeatureCollection',
    features: restaurants.map((restaurant) => ({
      type: 'Feature',
      properties: { name: restaurant.name },
      geometry: {
        coordinates: [restaurant.longtitude, restaurant.latitude],
        type: 'Point',
      },
    })),
  }

  const { state } = useDeckStateContext()

  const geoLayer = new GeoJsonLayer({
    id: 'geojson-layer',
    data: geoData,
    pickable: true,
    stroked: false,
    filled: true,
    extruded: true,
    getFillColor: [250, 0, 0, 255],
    getPointRadius: 20,
    getLineWidth: 10,
    getElevation: 30,
  })

  useEffect(() => {
    // const geoData = multiPoint(
    //   restaurants.map((restaurants) => [
    //     restaurants.longtitude,
    //     restaurants.latitude,
    //   ])
    // )
    // console.table(geoData)
    // dispatch({ featurePoints: geoData })
  }, [restaurants])
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
