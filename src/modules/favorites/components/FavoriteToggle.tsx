import { Button } from '~/components/ui/Button'
import { HeartIcon } from '~/components/ui/HeartIcon'
import { useFavorites } from '~/modules/favorites/hooks/useFavorites'

interface FavoriteToggleProps {
  characterId: string
}

export function FavoriteToggle({ characterId }: FavoriteToggleProps) {
  const { isFavorite, toggle } = useFavorites()
  const active = isFavorite(characterId)

  return (
    <Button
      variant={active ? 'primary' : 'secondary'}
      aria-pressed={active}
      onClick={() => toggle(characterId)}
    >
      <HeartIcon filled={active} />
      {active ? 'В избранном' : 'В избранное'}
    </Button>
  )
}
