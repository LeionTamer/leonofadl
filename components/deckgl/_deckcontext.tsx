import { ReactNode, createContext, useContext, useReducer } from 'react'

export type DeckStateType = {}

export const initializeState: DeckStateType = {}

const DeckStateContext = createContext<{
  state: DeckStateType
  dispatch: Partial<DeckStateType>
}>({
  state: initializeState,
  dispatch: () => null,
})

const reducer = (
  state: DeckStateType,
  nextState: Partial<DeckStateType>
): DeckStateType => {
  return { ...state, nextState }
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
