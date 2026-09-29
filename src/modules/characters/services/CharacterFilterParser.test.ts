import { describe, expect, it } from 'vitest'

import { parseCharacterStatus } from './CharacterFilterParser'

describe('parseCharacterStatus', () => {
  it.each(['alive', 'dead', 'unknown'])('accepts %s', (status) => {
    expect(parseCharacterStatus(status)).toBe(status)
  })

  it.each([null, '', 'Alive', 'robot'])('rejects %j', (value) => {
    expect(parseCharacterStatus(value)).toBeNull()
  })
})
