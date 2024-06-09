'use client'

import {
  DeckContextProvider,
  useDeckStateContext,
} from '@/components/deckgl/_deckcontext'
import { useState } from 'react'
import { IconLayer } from 'deck.gl/typed'
import { Restaurant } from '@prisma/client'
import BaseMap from '@/components/deckgl/basemap'

import RestaurantSection from '../restaurant/components/restaurantSection'
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog'

type ExploreMapPropsType = {
  restaurants: Restaurant[]
}

function createSVGIcon(idx: number) {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 0 24 24" width="40px" fill="#EA3323"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-1.8C18 6.57 15.35 4 12 4s-6 2.57-6 6.2c0 2.34 1.95 5.44 6 9.14 4.05-3.7 6-6.8 6-9.14zM12 2c4.2 0 8 3.22 8 8.2 0 3.32-2.67 7.25-8 11.8-5.33-4.55-8-8.48-8-11.8C4 5.22 7.8 2 12 2z"/></svg>
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
  }))

  const { state, dispatch } = useDeckStateContext()

  const layer = new IconLayer({
    id: 'icon-layer',
    data: iconData,
    getColor: (d) => [Math.sqrt(d.exits), 140, 0],
    getIcon: (d, { index }) => ({
      url: svgToDataURL(createSVGIcon(11)),
      width: 24,
      height: 24,
    }),
    getPosition: (d) => d.coordinates,
    getSize: 5,
    pickable: true,
    sizeScale: 1,
    onClick: (info) => {
      const [longitude, latitude] = info.coordinate as [number, number]
      const viewState = state.viewState
      dispatch({
        viewState: { ...viewState, longitude, latitude, zoom: 18 },
      })
      setSelected(restaurants[info.index])
    },
    sizeUnits: 'meters',
    sizeMinPixels: 20,
  })

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
