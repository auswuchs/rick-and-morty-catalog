import { useQuery } from '@apollo/client/react'

import { CharactersDocument } from '~/gql/graphql'
import { mapCharacters, mapPageInfo } from '~/modules/characters/services/CharacterMapper'

export function useCharactersView(page: number) {
  const { data, loading, error } = useQuery(CharactersDocument, {
    variables: { page },
  })

  return {
    characters: mapCharacters(data),
    pageInfo: mapPageInfo(data),
    loading,
    error,
  }
}
