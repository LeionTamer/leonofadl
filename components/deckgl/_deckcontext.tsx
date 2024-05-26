import { PlaceData } from '@googlemaps/google-maps-services-js'
import { Feature, GeoJsonProperties, MultiPoint } from 'geojson'
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from 'react'

export type DeckViewStateType = {
  longitude: number
  latitude: number
  zoom: number
  pitch: number
  bearing: number
  minZoom: number
}

export type DeckStateType = {
  viewState: DeckViewStateType
  googlePlaceDetails?: Partial<PlaceData>
  featurePoints?: Feature<MultiPoint, GeoJsonProperties>
}

export const initializeState: DeckStateType = {
  viewState: {
    longitude: 138.599503,
    latitude: -34.92123,
    zoom: 13,
    pitch: 0,
    bearing: 0,
    minZoom: 8,
  } as DeckViewStateType,
}

const DeckStateContext = createContext<{
  state: DeckStateType
  dispatch: Dispatch<Partial<DeckStateType>>
}>({
  state: initializeState,
  dispatch: () => null,
})

const reducer = (
  state: DeckStateType,
  nextState: Partial<DeckStateType>
): DeckStateType => {
  return { ...state, ...nextState }
}

export const useDeckStateContext = () => {
  const context = useContext(DeckStateContext)

  if (!context) {
    throw new Error('DeckContext Provider not found')
  }

  return context
}

export const DeckContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initializeState)
  return (
    <DeckStateContext.Provider value={{ state, dispatch }}>
      {children}
    </DeckStateContext.Provider>
  )
}
