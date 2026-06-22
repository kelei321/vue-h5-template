import { defineStore } from 'pinia'

interface AppState {
  cachedViews: string[]
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    cachedViews: []
  }),
  actions: {
    addCachedView(name: string) {
      if (!this.cachedViews.includes(name)) {
        this.cachedViews.push(name)
      }
    },
    removeCachedView(name: string) {
      this.cachedViews = this.cachedViews.filter((item) => item !== name)
    }
  }
})
