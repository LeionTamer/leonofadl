import { PlaceData } from '@googlemaps/google-maps-services-js'
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from 'react'

export type DeckStateType = {
  viewState: any
  googlePlaceDetails?: Partial<PlaceData>
}

export const initializeState: DeckStateType = {
  viewState: {
    longitude: 138.599503,
    latitude: -34.92123,
    zoom: 13,
    pitch: 0,
    bearing: 0,
    minZoom: 8,
  },
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
