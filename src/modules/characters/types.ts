export const CHARACTER_STATUSES = ['alive', 'dead', 'unknown'] as const

export type CharacterStatus = typeof CHARACTER_STATUSES[number]

export interface Character {
  id: string
  name: string
  status: string
  species: string
  image: string
}

export interface CharactersPageInfo {
  pages: number
  next: number | null
  prev: number | null
}

export interface CharactersFilters {
  name: string
  species: string
  status: CharacterStatus | null
}

export type SetCharactersFilter = <Key extends keyof CharactersFilters>(
  key: Key,
  value: CharactersFilters[Key],
) => void
