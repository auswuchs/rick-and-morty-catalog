import type { ButtonHTMLAttributes } from 'react'

import styles from './Button.module.css'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variant?: 'primary' | 'secondary'
}

export function Button({ variant = 'secondary', ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.button} ${styles[variant]}`}
      {...props}
    />
  )
}
