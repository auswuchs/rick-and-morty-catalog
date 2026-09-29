import type { ReactNode } from 'react'

import styles from './EmptyState.module.css'

interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
  role?: 'status' | 'alert'
}

export function EmptyState({ title, description, action, role = 'status' }: EmptyStateProps) {
  return (
    <div
      className={styles.empty}
      role={role}
    >
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
      {action}
    </div>
  )
}
