import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useDebouncedCallback } from './useDebouncedCallback'

describe('useDebouncedCallback', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('calls the callback once with the latest arguments after the delay', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useDebouncedCallback(callback, 300))

    result.current('a')
    result.current('ab')
    result.current('abc')

    vi.advanceTimersByTime(299)
    expect(callback).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith('abc')
  })

  it('restarts the timer on every call', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useDebouncedCallback(callback, 300))

    result.current('a')
    vi.advanceTimersByTime(200)
    result.current('b')
    vi.advanceTimersByTime(200)

    expect(callback).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)
    expect(callback).toHaveBeenCalledExactlyOnceWith('b')
  })

  it('cancels a pending call when the component unmounts', () => {
    const callback = vi.fn()
    const { result, unmount } = renderHook(() => useDebouncedCallback(callback, 300))

    result.current('a')
    unmount()
    vi.advanceTimersByTime(1000)

    expect(callback).not.toHaveBeenCalled()
  })
})
