import { Button } from '~/components/ui/Button'
import { ButtonLink } from '~/components/ui/ButtonLink'
import { EmptyState } from '~/components/ui/EmptyState'
import { Routes } from '~/enums/Routes'
import { CharacterList } from '~/modules/characters/components/CharacterList'
import { CharacterListSkeleton } from '~/modules/characters/components/CharacterListSkeleton'
import { useFavoriteCharacters } from '~/modules/favorites/hooks/useFavoriteCharacters'

import styles from './FavoritesPage.module.css'

export function FavoritesPage() {
  const { characters, loading, error, refetch } = useFavoriteCharacters()

  function renderContent() {
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
      return (
        <EmptyState
          title="Пока пусто"
          description="Отмечайте персонажей сердечком в каталоге, и они появятся здесь."
          action={<ButtonLink to={Routes.Home}>К каталогу</ButtonLink>}
        />
      )
    }

    return <CharacterList characters={characters} />
  }

  return (
    <>
      <h1 className={styles.title}>Избранное</h1>
      {renderContent()}
    </>
  )
}
