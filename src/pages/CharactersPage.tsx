import { usePageParam } from '~/hooks/usePageParam'
import { CharacterList } from '~/modules/characters/components/CharacterList'
import { useCharactersView } from '~/modules/characters/hooks/useCharactersView'

export function CharactersPage() {
  const [page, setPage] = usePageParam()
  const { characters, pageInfo, loading, error } = useCharactersView(page)

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
      {loading ? <p>Загрузка…</p> : <CharacterList characters={characters} />}
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
  )
}
