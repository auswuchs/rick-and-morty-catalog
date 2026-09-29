import { Outlet, ScrollRestoration } from 'react-router'

import { AppHeader } from '~/components/app/AppHeader'

import styles from './Layout.module.css'

export function Layout() {
  return (
    <div className={styles.shell}>
      <AppHeader />
      <main>
        <Outlet />
      </main>
      <ScrollRestoration />
    </div>
  )
}
