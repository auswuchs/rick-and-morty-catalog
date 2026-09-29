import { Button } from '~/components/ui/Button'
import { EmptyState } from '~/components/ui/EmptyState'
import { Pagination } from '~/components/ui/Pagination'
import { usePageParam } from '~/hooks/usePageParam'
import { CharacterFilters } from '~/modules/characters/components/CharacterFilters'
import { CharacterList } from '~/modules/characters/components/CharacterList'
import { CharacterListSkeleton } from '~/modules/characters/components/CharacterListSkeleton'
import { useCharactersFilters } from '~/modules/characters/hooks/useCharactersFilters'
import { useCharactersView } from '~/modules/characters/hooks/useCharactersView'

import styles from './CharactersPage.module.css'

export function CharactersPage() {
  const [page, setPage] = usePageParam()
  const [filters, setFilter, resetFilters] = useCharactersFilters()
  const { characters, pageInfo, loading, error, refetch } = useCharactersView(page, filters)

  function renderResults() {
    if (error) {
      return (
        <EmptyState
          role="alert"
          title="Не удалось загрузить"
          description="Сервер не ответил. Возможно, превышен лимит запросов, попробуйте ещё раз через минуту."
          action={<Button onClick={() => void refetch()}>Повторить</Button>}
        />
      )
    }

    if (loading) {
      return <CharacterListSkeleton />
    }

    if (characters.length === 0) {
      return page > 1
        ? (
            <EmptyState
              title="Такой страницы нет"
              description="Возможно, после смены фильтров страниц стало меньше."
              action={<Button onClick={() => setPage(1)}>К первой странице</Button>}
            />
          )
        : (
            <EmptyState
              title="Никого не нашли"
              description="Попробуйте изменить фильтры или сбросить их."
            />
          )
    }

    return <CharacterList characters={characters} />
  }

  return (
    <>
      <h1 className={styles.title}>Каталог персонажей</h1>
      <CharacterFilters
        filters={filters}
        onChange={setFilter}
        onReset={resetFilters}
      />
      <section
        className={styles.results}
        aria-label="Персонажи"
      >
        {renderResults()}
      </section>
      {!loading && !error && characters.length > 0 && (
        <footer className={styles.footer}>
          <Pagination
            page={page}
            totalPages={pageInfo.pages}
            onChange={setPage}
          />
        </footer>
      )}
    </>
  )
}
