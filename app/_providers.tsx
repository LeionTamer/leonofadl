'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { FC, ReactNode } from 'react'

const queryClient = new QueryClient()

interface IAppProvidersProps {
  children: ReactNode
}

const AppProviders: FC<IAppProvidersProps> = (props) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default AppProviders
