'use client'

import DeckGL, { Layer } from 'deck.gl/typed'
import { Map } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { DeckViewStateType, useDeckStateContext } from './_deckcontext'
import { bodyHeightStyle } from '@/helpers/consts'

export interface IBaseMapProps {
  height?: string
  width?: string
  layers?: Layer[]
}

function BaseMapV2({
  layers = [],
  height = bodyHeightStyle,
  width = '100%',
}: IBaseMapProps) {
  const { state, dispatch } = useDeckStateContext()

  return (
    <DeckGL
      initialViewState={state.viewState}
      style={{
        position: 'relative',
        height: height,
        width: width,
      }}
      controller={true}
      onViewStateChange={(viewState) => {
        dispatch({ viewState: viewState.viewState as DeckViewStateType })
      }}
      layers={layers}
    >
      <Map mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json" />
    </DeckGL>
  )
}

export default BaseMapV2
