import type { CharacterQuery, CharactersQuery } from '~/gql/graphql'
import { parseCharacterStatus } from '~/modules/characters/services/CharacterFilterParser'
import type { Character, CharacterDetails, CharactersPageInfo } from '~/modules/characters/types'

interface RawCharacter {
  id: string | null
  name: string | null
  status: string | null
  species: string | null
  image: string | null
}

export function mapCharacter(raw: RawCharacter | null | undefined): Character | null {
  if (!raw?.id || !raw.name || !raw.image) {
    return null
  }

  return {
    id: raw.id,
    name: raw.name,
    status: parseCharacterStatus(raw.status?.toLowerCase() ?? null) ?? 'unknown',
    species: raw.species ?? 'unknown',
    image: raw.image,
  }
}

export function mapCharacters(raws: readonly (RawCharacter | null)[] | null | undefined): Character[] {
  return (raws ?? []).flatMap((raw) => {
    const character = mapCharacter(raw)
    return character ? [character] : []
  })
}

export function mapPageInfo(query: CharactersQuery | undefined): CharactersPageInfo {
  return { pages: query?.characters?.info?.pages ?? 0 }
}

export function mapCharacterDetails(query: CharacterQuery | undefined): CharacterDetails | null {
  const raw = query?.character
  const character = mapCharacter(raw)

  if (!raw || !character) {
    return null
  }

  return {
    ...character,
    gender: raw.gender ?? 'unknown',
    origin: raw.origin?.name ?? 'unknown',
    location: raw.location?.name ?? 'unknown',
    episodesCount: raw.episode.length,
  }
}
