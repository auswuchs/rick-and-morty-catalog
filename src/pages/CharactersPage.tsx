import { usePageParam } from '~/hooks/usePageParam'
import { CharacterFilters } from '~/modules/characters/components/CharacterFilters'
import { CharacterList } from '~/modules/characters/components/CharacterList'
import { useCharactersFilters } from '~/modules/characters/hooks/useCharactersFilters'
import { useCharactersView } from '~/modules/characters/hooks/useCharactersView'

export function CharactersPage() {
  const [page, setPage] = usePageParam()
  const [filters, setFilter, resetFilters] = useCharactersFilters()
  const { characters, pageInfo, loading, error } = useCharactersView(page, filters)

  if (error) {
    return (
      <p role="alert">
        Не удалось загрузить:
        {error.message}
      </p>
    )
  }

  return (
    <>
      <h1>Rick & Morty</h1>
      <CharacterFilters
        filters={filters}
        onChange={setFilter}
        onReset={resetFilters}
      />
      {loading && <p>Загрузка…</p>}
      {!loading && characters.length === 0 && (
        <>
          <p>{page > 1 ? 'Такой страницы нет.' : 'Никого не нашли.'}</p>
          {page > 1 && (
            <button
              type="button"
              onClick={() => setPage(1)}
            >
              К первой странице
            </button>
          )}
        </>
      )}
      {!loading && characters.length > 0 && (
        <>
          <CharacterList characters={characters} />
          <button
            type="button"
            disabled={pageInfo.prev === null}
            onClick={() => setPage(page - 1)}
          >
            Назад
          </button>
          <span>
            {' '}
            {page}
            {' '}
            /
            {' '}
            {pageInfo.pages}
            {' '}
          </span>
          <button
            type="button"
            disabled={pageInfo.next === null}
            onClick={() => setPage(page + 1)}
          >
            Вперёд
          </button>
        </>
      )}
    </>
  )
}
