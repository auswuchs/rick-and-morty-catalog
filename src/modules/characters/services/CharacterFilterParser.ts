import type { CharacterStatus } from '~/modules/characters/types'
import { CHARACTER_STATUSES } from '~/modules/characters/types'

export function parseCharacterStatus(value: string | null): CharacterStatus | null {
  return CHARACTER_STATUSES.find((status) => status === value) ?? null
}
