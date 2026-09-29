import { ApolloProvider } from '@apollo/client/react'
import type { ReactNode } from 'react'
import { BrowserRouter } from 'react-router'

import { apolloClient } from '~/api/client'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
    </BrowserRouter>
  )
}
