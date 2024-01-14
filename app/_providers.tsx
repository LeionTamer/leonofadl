'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC, ReactNode } from 'react'

const queryClient = new QueryClient()

interface IAppProvidersProps {
  children: ReactNode
}

const AppProviders: FC<IAppProvidersProps> = (props) => {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  )
}

export default AppProviders
