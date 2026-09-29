const STORAGE_KEY = 'favorites'

type Listener = () => void

const listeners = new Set<Listener>()

function read(): string[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : []
  } catch {
    return []
  }
}

function write(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch {
    // Хранилище может быть недоступно (приватный режим, квота): избранное живёт до перезагрузки.
  }
}

let snapshot = read()

function emit() {
  listeners.forEach((listener) => listener())
}

function handleStorageEvent(event: StorageEvent) {
  // null возвращается при localStorage.clear()
  if (event.key === STORAGE_KEY || event.key === null) {
    snapshot = read()
    emit()
  }
}

export function subscribeToFavorites(listener: Listener) {
  if (listeners.size === 0) {
    window.addEventListener('storage', handleStorageEvent)
  }

  listeners.add(listener)

  return () => {
    listeners.delete(listener)

    if (listeners.size === 0) {
      window.removeEventListener('storage', handleStorageEvent)
    }
  }
}

export function getFavoritesSnapshot() {
  return snapshot
}

export function toggleFavorite(id: string) {
  snapshot = snapshot.includes(id)
    ? snapshot.filter((favoriteId) => favoriteId !== id)
    : [...snapshot, id]

  write(snapshot)
  emit()
}
