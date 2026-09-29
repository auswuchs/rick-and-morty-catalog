import { useParams } from 'react-router'

import { BackButton } from '~/components/ui/BackButton'
import { Button } from '~/components/ui/Button'
import { ButtonLink } from '~/components/ui/ButtonLink'
import { EmptyState } from '~/components/ui/EmptyState'
import { Routes } from '~/enums/Routes'
import { CharacterProfile } from '~/modules/characters/components/CharacterProfile'
import { CharacterProfileSkeleton } from '~/modules/characters/components/CharacterProfileSkeleton'
import { useCharacterView } from '~/modules/characters/hooks/useCharacterView'

import styles from './CharacterPage.module.css'

export function CharacterPage() {
  const { id = '' } = useParams()
  const { character, loading, error, refetch } = useCharacterView(id)

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
      return <CharacterProfileSkeleton />
    }

    if (!character) {
      return (
        <EmptyState
          title="Персонаж не найден"
          description="Такого персонажа нет в каталоге."
          action={<ButtonLink to={Routes.Home}>К каталогу</ButtonLink>}
        />
      )
    }

    return <CharacterProfile character={character} />
  }

  return (
    <>
      <div className={styles.back}>
        <BackButton
          fallbackTo={Routes.Home}
          fallbackLabel="К каталогу"
        />
      </div>
      {renderContent()}
    </>
  )
}
