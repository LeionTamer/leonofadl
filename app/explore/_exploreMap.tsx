'use client'

import {
  DeckContextProvider,
  useDeckStateContext,
} from '@/components/deckgl/_deckcontext'
import { useEffect, useState } from 'react'
import { IconLayer } from 'deck.gl/typed'
import { Rating, Restaurant } from '@prisma/client'
import BaseMap from '@/components/deckgl/basemap'

import RestaurantSection from '../restaurant/components/restaurantSection'
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog'
import { ratingColors } from '@/helpers/colorHelper'

type ExploreMapPropsType = {
  restaurants: Restaurant[]
}

function createSVGIcon(rating: Rating) {
  return `
<svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="13" stroke="orange" stroke-width="3" fill="${ratingColors(
        rating
      )}" />
</svg> 
    `
}

function svgToDataURL(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

function ExploreMap({ restaurants }: ExploreMapPropsType) {
  const [selected, setSelected] = useState<Restaurant | undefined>()

  const iconData = restaurants.map((restaurant) => ({
    name: restaurant.name,
    address: restaurant.address,
    coordinates: [restaurant.longtitude, restaurant.latitude],
    rating: restaurant.rating,
  }))

  const { state, dispatch } = useDeckStateContext()

  const layer = new IconLayer({
    id: 'icon-layer',
    data: iconData,
    getColor: (d) => [Math.sqrt(d.exits), 140, 0],
    getIcon: (d, { index }) => ({
      url: svgToDataURL(createSVGIcon(d.rating as Rating)),
      width: 24,
      height: 24,
    }),
    getPosition: (d) => d.coordinates,
    pickable: true,
    onClick: (info) => {
      const [longitude, latitude] = info.coordinate as [number, number]
      const viewState = state.viewState
      dispatch({
        viewState: { ...viewState, longitude, latitude, zoom: 17 },
      })
      setSelected(restaurants[info.index])
    },
    getSize: 100,
    sizeScale: 1,
    sizeUnits: 'meters',
    sizeMinPixels: 20,
    sizeMaxPixels: 30,
  })

  useEffect(() => {
    return () => {
      setSelected(undefined)
    }
  }, [])

  return (
    <>
      <BaseMap height="100vh" layers={[layer]} />
      <Dialog open={!!selected} onOpenChange={() => setSelected(undefined)}>
        <DialogClose onClick={() => setSelected(undefined)} />
        <DialogContent onInteractOutside={() => setSelected(undefined)}>
          {!!selected && (
            <RestaurantSection restaurant={selected} opened={true} />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

const ExploreMapView = (props: ExploreMapPropsType) => {
  return (
    <DeckContextProvider>
      <ExploreMap {...props} />
    </DeckContextProvider>
  )
}

export default ExploreMapView
