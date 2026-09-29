import { useQuery } from '@apollo/client/react'
import { useState } from 'react'

import { FavoriteCharactersDocument } from '~/gql/graphql'
import { mapCharacters } from '~/modules/characters/services/CharacterMapper'
import { useFavorites } from '~/modules/favorites/hooks/useFavorites'

export function useFavoriteCharacters() {
  const { ids } = useFavorites()
  const [initialIds] = useState(ids)

  const { data, loading, error, refetch } = useQuery(FavoriteCharactersDocument, {
    variables: { ids: initialIds },
    skip: initialIds.length === 0,
  })

  return {
    characters: mapCharacters(data?.charactersByIds).filter((character) => ids.includes(character.id)),
    loading,
    error,
    refetch,
  }
}
