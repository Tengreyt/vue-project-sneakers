import { defineStore } from 'pinia'
import http from '@/shared/api/http'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('auth_user') || 'null'),
    isLoading: false,
    error: null
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.user)
  },
  actions: {
    async login(username) {
      this.isLoading = true
      this.error = null
      try {
        const { data } = await http.get('/user', { params: { user: username } })
        this.user = data?.[0] || null
        if (this.user) {
          localStorage.setItem('auth_user', JSON.stringify(this.user))
        }
        return this.user
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.isLoading = false
      }
    },
    async register(payload) {
      this.isLoading = true
      this.error = null
      try {
        const { data } = await http.post('/user', payload)
        return data
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.isLoading = false
      }
    },
    logout() {
      this.user = null
      localStorage.removeItem('auth_user')
    }
  }
})

export default useAuthStore

