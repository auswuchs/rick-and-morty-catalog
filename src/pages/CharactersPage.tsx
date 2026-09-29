import { useState } from 'react'

import { CharacterList } from '~/modules/characters/components/CharacterList'
import { useCharactersView } from '~/modules/characters/hooks/useCharactersView'

export function CharactersPage() {
  const [page, setPage] = useState(1)
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
        onClick={() => setPage((current) => current - 1)}
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
        onClick={() => setPage((current) => current + 1)}
      >
        Вперёд
      </button>
    </>
  )
}
