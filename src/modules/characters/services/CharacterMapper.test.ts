import { describe, expect, it } from 'vitest'

import type { CharacterQuery } from '~/gql/graphql'

import { mapCharacter, mapCharacterDetails, mapCharacters, mapPageInfo } from './CharacterMapper'

const rawCharacter = {
  id: '1',
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  image: 'https://example.com/1.jpeg',
}

describe('mapCharacter', () => {
  it('maps a complete record and normalizes the status', () => {
    expect(mapCharacter(rawCharacter)).toEqual({ ...rawCharacter, status: 'alive' })
  })

  it('falls back to unknown for an unexpected status', () => {
    expect(mapCharacter({ ...rawCharacter, status: 'Robot' })?.status).toBe('unknown')
    expect(mapCharacter({ ...rawCharacter, status: null })?.status).toBe('unknown')
  })

  it.each([
    ['id', { id: null }],
    ['name', { name: null }],
    ['image', { image: null }],
  ])('drops a record without %s', (_field, patch) => {
    expect(mapCharacter({ ...rawCharacter, ...patch })).toBeNull()
  })

  it('returns null for null and undefined', () => {
    expect(mapCharacter(null)).toBeNull()
    expect(mapCharacter(undefined)).toBeNull()
  })
})

describe('mapCharacters', () => {
  it('skips broken items and keeps the order of the rest', () => {
    const result = mapCharacters([rawCharacter, null, { ...rawCharacter, id: null }, { ...rawCharacter, id: '2' }])

    expect(result.map((character) => character.id)).toEqual(['1', '2'])
  })

  it('returns an empty list when there is no data', () => {
    expect(mapCharacters(null)).toEqual([])
    expect(mapCharacters(undefined)).toEqual([])
  })
})

describe('mapPageInfo', () => {
  it('reads the page count', () => {
    expect(mapPageInfo({ characters: { info: { pages: 42 }, results: [] } })).toEqual({ pages: 42 })
  })

  it('defaults to zero pages, as the API does for an out-of-range page', () => {
    expect(mapPageInfo({ characters: { info: { pages: null }, results: [] } })).toEqual({ pages: 0 })
    expect(mapPageInfo(undefined)).toEqual({ pages: 0 })
  })
})

describe('mapCharacterDetails', () => {
  const query: CharacterQuery = {
    character: {
      ...rawCharacter,
      gender: 'Male',
      origin: { name: 'Earth (C-137)' },
      location: { name: 'Citadel of Ricks' },
      episode: [{ id: '1' }, { id: '2' }, null],
    },
  }

  it('maps details and counts episodes', () => {
    expect(mapCharacterDetails(query)).toMatchObject({
      id: '1',
      gender: 'Male',
      origin: 'Earth (C-137)',
      location: 'Citadel of Ricks',
      episodesCount: 3,
    })
  })

  it('uses fallbacks for missing nested data', () => {
    const details = mapCharacterDetails({
      character: { ...query.character!, gender: null, origin: null, location: null, episode: [] },
    })

    expect(details).toMatchObject({ gender: 'unknown', origin: 'unknown', location: 'unknown', episodesCount: 0 })
  })

  it('returns null when the character does not exist', () => {
    expect(mapCharacterDetails({ character: null })).toBeNull()
    expect(mapCharacterDetails(undefined)).toBeNull()
  })
})
