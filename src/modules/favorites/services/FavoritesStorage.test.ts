import { beforeEach, describe, expect, it, vi } from 'vitest'

const STORAGE_KEY = 'favorites'

async function loadStorage() {
  vi.resetModules()
  return import('./FavoritesStorage')
}

describe('FavoritesStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('starts empty', async () => {
    const storage = await loadStorage()

    expect(storage.getFavoritesSnapshot()).toEqual([])
  })

  it('toggles an id on and off and persists the result', async () => {
    const storage = await loadStorage()

    storage.toggleFavorite('7')
    expect(storage.getFavoritesSnapshot()).toEqual(['7'])
    expect(localStorage.getItem(STORAGE_KEY)).toBe('["7"]')

    storage.toggleFavorite('7')
    expect(storage.getFavoritesSnapshot()).toEqual([])
    expect(localStorage.getItem(STORAGE_KEY)).toBe('[]')
  })

  it('restores ids saved earlier', async () => {
    localStorage.setItem(STORAGE_KEY, '["1","2"]')
    const storage = await loadStorage()

    expect(storage.getFavoritesSnapshot()).toEqual(['1', '2'])
  })

  it.each([
    ['broken JSON', 'not json', []],
    ['a non-array value', '{"a":1}', []],
    ['mixed items', '[1,"2",null]', ['2']],
  ])('survives %s in storage', async (_case, stored, expected) => {
    localStorage.setItem(STORAGE_KEY, stored)
    const storage = await loadStorage()

    expect(storage.getFavoritesSnapshot()).toEqual(expected)
  })

  it('keeps a stable snapshot reference until something changes', async () => {
    const storage = await loadStorage()
    const before = storage.getFavoritesSnapshot()

    expect(storage.getFavoritesSnapshot()).toBe(before)

    storage.toggleFavorite('1')
    expect(storage.getFavoritesSnapshot()).not.toBe(before)
  })

  it('notifies subscribers and stops after unsubscribe', async () => {
    const storage = await loadStorage()
    const listener = vi.fn()
    const unsubscribe = storage.subscribeToFavorites(listener)

    storage.toggleFavorite('1')
    expect(listener).toHaveBeenCalledTimes(1)

    unsubscribe()
    storage.toggleFavorite('2')
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('picks up changes made in another tab', async () => {
    const storage = await loadStorage()
    const listener = vi.fn()
    const unsubscribe = storage.subscribeToFavorites(listener)

    localStorage.setItem(STORAGE_KEY, '["9"]')
    window.dispatchEvent(new StorageEvent('storage', { key: STORAGE_KEY }))

    expect(storage.getFavoritesSnapshot()).toEqual(['9'])
    expect(listener).toHaveBeenCalledTimes(1)
    unsubscribe()
  })

  it('ignores storage events for other keys', async () => {
    const storage = await loadStorage()
    const listener = vi.fn()
    const unsubscribe = storage.subscribeToFavorites(listener)

    window.dispatchEvent(new StorageEvent('storage', { key: 'something-else' }))

    expect(listener).not.toHaveBeenCalled()
    unsubscribe()
  })
})
