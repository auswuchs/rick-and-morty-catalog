import { STATUS_LABELS } from '~/modules/characters/services/CharacterStatusLabels'
import type { CharacterStatus } from '~/modules/characters/types'

import styles from './CharacterStatusBadge.module.css'

export function CharacterStatusBadge({ status }: { status: CharacterStatus }) {
  return (
    <span className={styles.badge}>
      <span
        className={`${styles.dot} ${styles[status]}`}
        aria-hidden="true"
      />
      {STATUS_LABELS[status]}
    </span>
  )
}
