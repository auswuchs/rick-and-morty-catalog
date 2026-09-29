import { HeartIcon } from '~/components/ui/HeartIcon'
import { useFavorites } from '~/modules/favorites/hooks/useFavorites'

import styles from './FavoriteButton.module.css'

interface FavoriteButtonProps {
  characterId: string
  characterName: string
}

export function FavoriteButton({ characterId, characterName }: FavoriteButtonProps) {
  const { isFavorite, toggle } = useFavorites()
  const active = isFavorite(characterId)

  return (
    <button
      type="button"
      className={active ? `${styles.button} ${styles.active}` : styles.button}
      aria-pressed={active}
      aria-label={`В избранное: ${characterName}`}
      onClick={() => toggle(characterId)}
    >
      <HeartIcon filled={active} />
    </button>
  )
}
