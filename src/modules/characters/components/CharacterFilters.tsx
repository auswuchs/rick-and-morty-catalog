import { useState } from 'react'

import { SearchInput } from '~/components/ui/SearchInput'
import { parseCharacterStatus } from '~/modules/characters/services/CharacterFilterParser'
import type { CharactersFilters, CharacterStatus, SetCharactersFilter } from '~/modules/characters/types'
import { CHARACTER_STATUSES } from '~/modules/characters/types'

import styles from './CharacterFilters.module.css'

const STATUS_LABELS: Record<CharacterStatus, string> = {
  alive: 'Жив',
  dead: 'Мёртв',
  unknown: 'Неизвестно',
}

interface CharacterFiltersProps {
  filters: CharactersFilters
  onChange: SetCharactersFilter
  onReset: () => void
}

export function CharacterFilters({ filters, onChange, onReset }: CharacterFiltersProps) {
  const [resetVersion, setResetVersion] = useState(0)

  function reset() {
    onReset()
    setResetVersion((version) => version + 1)
  }

  return (
    <form
      className={styles.filters}
      onSubmit={(event) => event.preventDefault()}
    >
      <SearchInput
        key={`name-${resetVersion}`}
        label="Имя"
        value={filters.name}
        onChange={(value) => onChange('name', value)}
      />
      <SearchInput
        key={`species-${resetVersion}`}
        label="Вид"
        value={filters.species}
        onChange={(value) => onChange('species', value)}
      />
      <label className={styles.field}>
        <span className={styles.label}>Статус</span>
        <select
          className={styles.select}
          value={filters.status ?? ''}
          onChange={(event) => onChange('status', parseCharacterStatus(event.target.value))}
        >
          <option value="">Любой</option>
          {CHARACTER_STATUSES.map((status) => (
            <option
              key={status}
              value={status}
            >
              {STATUS_LABELS[status]}
            </option>
          ))}
        </select>
      </label>
      <button
        type="button"
        onClick={reset}
      >
        Сбросить
      </button>
    </form>
  )
}
