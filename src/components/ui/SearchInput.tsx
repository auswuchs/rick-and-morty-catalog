import { useState } from 'react'

import { useDebouncedCallback } from '~/hooks/useDebouncedCallback'

import styles from './SearchInput.module.css'

const DEBOUNCE_MS = 300

interface SearchInputProps {
  label: string
  value: string
  onChange: (value: string) => void
}

export function SearchInput({ label, value, onChange }: SearchInputProps) {
  const [draft, setDraft] = useState(value)
  const notify = useDebouncedCallback(onChange, DEBOUNCE_MS)

  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <input
        className={styles.input}
        type="search"
        value={draft}
        onChange={(event) => {
          setDraft(event.target.value)
          notify(event.target.value)
        }}
      />
    </label>
  )
}
