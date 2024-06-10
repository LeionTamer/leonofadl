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
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#BB271A"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 400Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Z"/></svg>
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
    sizeMaxPixels: 50,
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
