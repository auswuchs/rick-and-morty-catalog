import { useQuery } from '@apollo/client/react'

import { CharactersDocument } from '~/gql/graphql'
import { mapCharacters, mapPageInfo } from '~/modules/characters/services/CharacterMapper'
import type { CharactersFilters } from '~/modules/characters/types'

export function useCharactersView(page: number, filters: CharactersFilters) {
  const { data, loading, error, refetch } = useQuery(CharactersDocument, {
    variables: {
      page,
      filter: {
        name: filters.name || undefined,
        species: filters.species || undefined,
        status: filters.status ?? undefined,
      },
    },
  })

  return {
    characters: mapCharacters(data),
    pageInfo: mapPageInfo(data),
    loading,
    error,
    refetch,
  }
}
