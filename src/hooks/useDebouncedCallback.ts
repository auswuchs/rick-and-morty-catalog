import { useEffect, useRef } from 'react'

export function useDebouncedCallback<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delayMs: number,
) {
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    const pending = timer
    return () => clearTimeout(pending.current)
  }, [])

  return (...args: Args) => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => callback(...args), delayMs)
  }
}
