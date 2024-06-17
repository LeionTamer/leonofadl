'use client'

import {
  DeckContextProvider,
  useDeckStateContext,
} from '@/components/deckgl/_deckcontext'
import { useEffect, useState } from 'react'
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
  <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#EA3323"><path d="M480.14-484.43q31.43 0 53.71-22.14t22.28-53.57q0-31.43-22.26-53.71-22.25-22.28-53.84-22.28-31.6 0-53.6 22.26-22 22.25-22 53.84 0 31.6 22.14 53.6t53.57 22ZM480-61.17q-171.57-142-255.2-261.66-83.63-119.65-83.63-231.74 0-155.05 101.5-250.44 101.5-95.38 237.33-95.38 135.58 0 237.49 95.38 101.9 95.39 101.9 250.44 0 112.09-83.91 231.74Q651.57-203.17 480-61.17Z"/></svg>
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
    getSize: 50,
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
