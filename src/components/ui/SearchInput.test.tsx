import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { SearchInput } from './SearchInput'

function setup(value = '') {
  const onChange = vi.fn()
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
  const view = render(
    <SearchInput
      label="Имя"
      value={value}
      onChange={onChange}
    />,
  )

  const rerenderWith = (nextValue: string) => view.rerender(
    <SearchInput
      label="Имя"
      value={nextValue}
      onChange={onChange}
    />,
  )

  return { user, onChange, rerenderWith, input: screen.getByLabelText('Имя') }
}

describe('SearchInput', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows typed text immediately but reports it only after the pause', async () => {
    const { user, onChange, input } = setup()

    await user.type(input, 'rick')

    expect(input).toHaveValue('rick')
    expect(onChange).not.toHaveBeenCalled()

    vi.advanceTimersByTime(300)
    expect(onChange).toHaveBeenCalledExactlyOnceWith('rick')
  })

  it('follows a value changed from outside, e.g. browser back', () => {
    const { input, rerenderWith } = setup('rick')

    rerenderWith('')

    expect(input).toHaveValue('')
  })

  it('does not overwrite text typed while its own earlier value is still coming back', async () => {
    const { user, input, rerenderWith } = setup()

    await user.type(input, 'ri')
    vi.advanceTimersByTime(300)
    await user.type(input, 'ck')

    rerenderWith('ri')

    expect(input).toHaveValue('rick')
  })
})
