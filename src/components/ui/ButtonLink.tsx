import type { LinkProps } from 'react-router'
import { Link } from 'react-router'

import styles from './Button.module.css'

interface ButtonLinkProps extends Omit<LinkProps, 'className'> {
  variant?: 'primary' | 'secondary'
}

export function ButtonLink({ variant = 'secondary', ...props }: ButtonLinkProps) {
  return (
    <Link
      className={`${styles.button} ${styles[variant]}`}
      {...props}
    />
  )
}
