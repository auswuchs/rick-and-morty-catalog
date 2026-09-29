import type { CharactersQuery } from '~/gql/graphql'
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
      status: raw.status ?? 'unknown',
      species: raw.species ?? 'unknown',
      image: raw.image,
    }]
  })
}

export function mapPageInfo(query: CharactersQuery | undefined): CharactersPageInfo {
  const info = query?.characters?.info

  return {
    pages: info?.pages ?? 0,
    next: info?.next ?? null,
    prev: info?.prev ?? null,
  }
}
