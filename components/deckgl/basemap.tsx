'use client'

import { FC } from 'react'
import { DeckGL, TileLayer, BitmapLayer, Position, Layer } from 'deck.gl/typed'

interface IBaseMapProps {
  height?: string
  width?: string
  layers?: Layer[]
}

const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0,
}

const BaseMap: FC<IBaseMapProps> = ({
  height = '500px',
  width = '100%',
  layers = [],
}) => {
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
  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      layers={[tileLayer, ...layers]}
      controller={true}
      style={{
        position: 'relative',
        minHeight: '150px',
      }}
      height={height}
      width={width}
    ></DeckGL>
  )
}

export default BaseMap