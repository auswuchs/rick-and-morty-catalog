import { Link, NavLink } from 'react-router'

import { Routes } from '~/enums/Routes'
import { useFavorites } from '~/modules/favorites/hooks/useFavorites'

import styles from './AppHeader.module.css'

function getLinkClassName({ isActive }: { isActive: boolean }) {
  return isActive ? `${styles.link} ${styles.active}` : styles.link
}

export function AppHeader() {
  const { ids } = useFavorites()

  return (
    <header className={styles.header}>
      <Link
        className={styles.brand}
        to={Routes.Home}
      >
        Rick
        {' '}
        <span className={styles.amp}>&</span>
        {' '}
        Morty
      </Link>
      <nav
        className={styles.nav}
        aria-label="Основная навигация"
      >
        <NavLink
          className={getLinkClassName}
          to={Routes.Home}
          end
        >
          Каталог
        </NavLink>
        <NavLink
          className={getLinkClassName}
          to={Routes.Favorites}
          aria-label={ids.length > 0 ? `Избранное, персонажей: ${ids.length}` : undefined}
        >
          Избранное
          {ids.length > 0 && <span className={styles.count}>{ids.length}</span>}
        </NavLink>
      </nav>
    </header>
  )
}
