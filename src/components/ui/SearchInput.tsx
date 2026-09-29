import { useState } from 'react'

import { useDebouncedCallback } from '~/hooks/useDebouncedCallback'

import styles from './Field.module.css'

const DEBOUNCE_MS = 300

interface SearchInputProps {
  label: string
  value: string
  onChange: (value: string) => void
}

export function SearchInput({ label, value, onChange }: SearchInputProps) {
  const [draft, setDraft] = useState(value)
  const [lastSent, setLastSent] = useState(value)
  const [lastSeenValue, setLastSeenValue] = useState(value)

  const debouncedOnChange = useDebouncedCallback((next: string) => {
    setLastSent(next)
    onChange(next)
  }, DEBOUNCE_MS)

  if (value !== lastSeenValue) {
    setLastSeenValue(value)

    if (value !== lastSent) {
      setDraft(value)
    }
  }

  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <input
        className={styles.control}
        type="search"
        value={draft}
        onChange={(event) => {
          setDraft(event.target.value)
          debouncedOnChange(event.target.value)
        }}
      />
    </label>
  )
}
