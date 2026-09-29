import { useLocation, useNavigate } from 'react-router'

import { Button } from '~/components/ui/Button'
import { ButtonLink } from '~/components/ui/ButtonLink'
import { isFromApp } from '~/services/NavigationState'

interface BackButtonProps {
  fallbackTo: string
  fallbackLabel: string
}

export function BackButton({ fallbackTo, fallbackLabel }: BackButtonProps) {
  const location = useLocation()
  const navigate = useNavigate()

  if (isFromApp(location.state)) {
    return <Button onClick={() => void navigate(-1)}>← Назад</Button>
  }

  return <ButtonLink to={fallbackTo}>{`← ${fallbackLabel}`}</ButtonLink>
}
