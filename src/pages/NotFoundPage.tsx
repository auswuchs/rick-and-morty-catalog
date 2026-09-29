import { ButtonLink } from '~/components/ui/ButtonLink'
import { EmptyState } from '~/components/ui/EmptyState'
import { Routes } from '~/enums/Routes'

export function NotFoundPage() {
  return (
    <EmptyState
      title="Страница не найдена"
      description="Проверьте адрес или вернитесь в каталог."
      action={<ButtonLink to={Routes.Home}>К каталогу</ButtonLink>}
    />
  )
}
