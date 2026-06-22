import { STORAGE_PREFIX } from '@/constants/app'

type StorageValue = string | number | boolean | null | object | unknown[]

function createStorage(storage: Storage) {
  const normalizeKey = (key: string) => `${STORAGE_PREFIX}${key}`

  return {
    get<T = unknown>(key: string, fallback?: T): T | undefined {
      const raw = storage.getItem(normalizeKey(key))
      if (raw === null) {
        return fallback
      }
      try {
        return JSON.parse(raw) as T
      } catch {
        return raw as T
      }
    },
    set(key: string, value: StorageValue) {
      storage.setItem(normalizeKey(key), JSON.stringify(value))
    },
    remove(key: string) {
      storage.removeItem(normalizeKey(key))
    },
    clear() {
      Object.keys(storage).forEach((key) => {
        if (key.startsWith(STORAGE_PREFIX)) {
          storage.removeItem(key)
        }
      })
    }
  }
}

export const local = createStorage(window.localStorage)
export const session = createStorage(window.sessionStorage)
