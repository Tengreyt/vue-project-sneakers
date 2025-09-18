import { defineStore } from 'pinia'
import http from '@/shared/api/http'

export const useProductsStore = defineStore('products', {
  state: () => ({
    items: [],
    isLoading: false,
    error: null,
    filters: {
      sortBy: 'title',
      searchQuery: ''
    }
  }),
  actions: {
    async fetchItems() {
      this.isLoading = true
      this.error = null
      try {
        const params = { sortBy: this.filters.sortBy }
        if (this.filters.searchQuery) {
          params.title = `*${this.filters.searchQuery}*`
        }
        const { data } = await http.get('/items', { params })
        this.items = data.map((obj) => ({
          ...obj,
          isFavorite: false,
          favoriteId: null,
          isAdded: false
        }))
      } catch (e) {
        this.error = e
      } finally {
        this.isLoading = false
      }
    }
  }
})

export default useProductsStore

