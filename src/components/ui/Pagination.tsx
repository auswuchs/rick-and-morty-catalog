import { Button } from '~/components/ui/Button'

import styles from './Pagination.module.css'

interface PaginationProps {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  return (
    <nav
      className={styles.pagination}
      aria-label="Страницы"
    >
      <Button
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        Назад
      </Button>
      <p
        className={styles.status}
        aria-live="polite"
      >
        Страница
        {' '}
        {page}
        {' '}
        из
        {' '}
        {totalPages}
      </p>
      <Button
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      >
        Вперёд
      </Button>
    </nav>
  )
}
