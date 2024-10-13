'use client'

import { FC } from 'react'
import { DeckGL, TileLayer, BitmapLayer, Position, Layer } from 'deck.gl/typed'
import { DeckViewStateType, useDeckStateContext } from './_deckcontext'
import { bodyHeightStyle } from '@/helpers/consts'

interface IBaseMapProps {
  height?: string
  width?: string
  layers?: Layer[]
}

const BaseMap: FC<IBaseMapProps> = ({
  height = bodyHeightStyle,
  width = '100%',
  layers = [],
}) => {
  const { state, dispatch } = useDeckStateContext()
  const tileLayer = new TileLayer({
    data: 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
    minZoom: 0,
    maxZoom: 19,
    tileSize: 256,

    renderSubLayers: (props) => {
      const { west, south, east, north } = props.tile.bbox as unknown as {
        west: Position
        south: Position
        east: Position
        north: Position
      }

      return new BitmapLayer(props, {
        data: undefined,
        image: props.data,
        bounds: [west, south, east, north],
      })
    },
  })

  if (!state) return null
  return (
    <DeckGL
      initialViewState={{ ...state.viewState }}
      layers={[tileLayer, ...layers]}
      controller={true}
      style={{
        position: 'relative',
      }}
      height={height}
      width={width}
      onViewStateChange={(viewState) => {
        dispatch({ viewState: viewState.viewState as DeckViewStateType })
      }}
    />
  )
}

export default BaseMap
