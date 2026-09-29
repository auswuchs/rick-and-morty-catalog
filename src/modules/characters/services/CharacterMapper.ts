import type { CharactersQuery } from '~/gql/graphql'
import { parseCharacterStatus } from '~/modules/characters/services/CharacterFilterParser'
import type { Character, CharactersPageInfo } from '~/modules/characters/types'

export function mapCharacters(query: CharactersQuery | undefined): Character[] {
  const results = query?.characters?.results ?? []

  return results.flatMap((raw) => {
    if (!raw?.id || !raw.name || !raw.image) {
      return []
    }

    return [{
      id: raw.id,
      name: raw.name,
      status: parseCharacterStatus(raw.status?.toLowerCase() ?? null) ?? 'unknown',
      species: raw.species ?? 'unknown',
      image: raw.image,
    }]
  })
}

export function mapPageInfo(query: CharactersQuery | undefined): CharactersPageInfo {
  return { pages: query?.characters?.info?.pages ?? 0 }
}
