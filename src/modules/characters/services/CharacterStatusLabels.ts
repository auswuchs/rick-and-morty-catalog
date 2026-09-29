import type { CharacterStatus } from '~/modules/characters/types'

export const STATUS_LABELS: Record<CharacterStatus, string> = {
  alive: 'Жив',
  dead: 'Мёртв',
  unknown: 'Неизвестно',
}
