import { act, renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { MemoryRouter, useLocation } from 'react-router'
import { describe, expect, it } from 'vitest'

import { usePageParam } from './usePageParam'

function renderUsePageParam(initialEntry: string) {
  return renderHook(
    () => ({ pageParam: usePageParam(), search: useLocation().search }),
    {
      wrapper: ({ children }: { children: ReactNode }) => (
        <MemoryRouter initialEntries={[initialEntry]}>{children}</MemoryRouter>
      ),
    },
  )
}

describe('usePageParam', () => {
  it('defaults to the first page', () => {
    const { result } = renderUsePageParam('/')

    expect(result.current.pageParam[0]).toBe(1)
  })

  it('reads a valid page from the URL', () => {
    const { result } = renderUsePageParam('/?page=5')

    expect(result.current.pageParam[0]).toBe(5)
  })

  it.each(['0', '-2', 'abc', '1.5', ''])('falls back to 1 for page=%j', (value) => {
    const { result } = renderUsePageParam(`/?page=${value}`)

    expect(result.current.pageParam[0]).toBe(1)
  })

  it('writes the page to the URL and removes the param for page 1', () => {
    const { result } = renderUsePageParam('/')

    act(() => result.current.pageParam[1](3))
    expect(result.current.search).toBe('?page=3')
    expect(result.current.pageParam[0]).toBe(3)

    act(() => result.current.pageParam[1](1))
    expect(result.current.search).toBe('')
  })

  it('keeps other query params untouched', () => {
    const { result } = renderUsePageParam('/?name=rick')

    act(() => result.current.pageParam[1](2))

    expect(new URLSearchParams(result.current.search).get('name')).toBe('rick')
    expect(new URLSearchParams(result.current.search).get('page')).toBe('2')
  })
})
