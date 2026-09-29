import { useSyncExternalStore } from 'react'

import {
  getFavoritesSnapshot,
  subscribeToFavorites,
  toggleFavorite,
} from '~/modules/favorites/services/FavoritesStorage'

export function useFavorites() {
  const ids = useSyncExternalStore(subscribeToFavorites, getFavoritesSnapshot)

  return {
    ids,
    isFavorite: (id: string) => ids.includes(id),
    toggle: toggleFavorite,
  }
}
