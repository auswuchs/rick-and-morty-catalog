import { useState } from 'react'

import { Button } from '~/components/ui/Button'
import { SearchInput } from '~/components/ui/SearchInput'
import { Select } from '~/components/ui/Select'
import { parseCharacterStatus } from '~/modules/characters/services/CharacterFilterParser'
import { STATUS_LABELS } from '~/modules/characters/services/CharacterStatusLabels'
import type { CharactersFilters, SetCharactersFilter } from '~/modules/characters/types'
import { CHARACTER_STATUSES } from '~/modules/characters/types'

import styles from './CharacterFilters.module.css'

const STATUS_OPTIONS = [
  { value: '', label: 'Любой' },
  ...CHARACTER_STATUSES.map((status) => ({ value: status, label: STATUS_LABELS[status] })),
]

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
      role="search"
      aria-label="Фильтры персонажей"
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
      <Select
        label="Статус"
        value={filters.status ?? ''}
        options={STATUS_OPTIONS}
        onChange={(value) => onChange('status', parseCharacterStatus(value))}
      />
      <Button onClick={reset}>Сбросить</Button>
    </form>
  )
}
