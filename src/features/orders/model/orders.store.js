import { defineStore } from 'pinia'
import http from '@/shared/api/http'

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    items: [],
    isLoading: false,
    error: null
  }),
  actions: {
    async fetchOrders() {
      this.isLoading = true
      this.error = null
      try {
        const { data } = await http.get('/orders')
        this.items = Array.isArray(data) ? data : []
      } catch (e) {
        this.error = e
      } finally {
        this.isLoading = false
      }
    }
  }
})

export default useOrdersStore


