import type { RouteObject } from 'react-router'

import { Layout } from '~/app/Layout'
import { CharacterPage } from '~/pages/CharacterPage'
import { CharactersPage } from '~/pages/CharactersPage'
import { FavoritesPage } from '~/pages/FavoritesPage'
import { NotFoundPage } from '~/pages/NotFoundPage'

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { index: true, element: <CharactersPage /> },
      { path: 'characters/:id', element: <CharacterPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]
