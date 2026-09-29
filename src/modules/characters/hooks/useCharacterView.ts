import { useQuery } from '@apollo/client/react'

import { CharacterDocument } from '~/gql/graphql'
import { mapCharacterDetails } from '~/modules/characters/services/CharacterMapper'

export function useCharacterView(id: string) {
  const { data, loading, error, refetch } = useQuery(CharacterDocument, {
    variables: { id },
  })

  return {
    character: mapCharacterDetails(data),
    loading,
    error,
    refetch,
  }
}
