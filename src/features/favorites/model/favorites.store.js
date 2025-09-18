import { defineStore } from 'pinia'
import http from '@/shared/api/http'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    items: [],
    isLoading: false,
    error: null
  }),
  actions: {
    async fetchFavorites() {
      this.isLoading = true
      this.error = null
      try {
        const { data: favorites } = await http.get('/favorites')
        this.items = favorites
      } catch (e) {
        this.error = e
      } finally {
        this.isLoading = false
      }
    },
    async toggleFavorite(item) {
      try {
        if (!item.isFavorite) {
          const { data } = await http.post('/favorites', { item_id: item.id })
          item.isFavorite = true
          item.favoriteId = data.id
        } else {
          await http.delete(`/favorites/${item.favoriteId}`)
          item.isFavorite = false
          item.favoriteId = null
        }
      } catch (e) {
        this.error = e
      }
    }
  }
})

export default useFavoritesStore

