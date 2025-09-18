import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cart') || '[]')
  }),
  getters: {
    totalPrice: (state) => state.items.reduce((acc, item) => acc + item.price, 0),
    vatPrice() {
      return Math.round((this.totalPrice * 5) / 100)
    }
  },
  actions: {
    add(item) {
      this.items.push(item)
      item.isAdded = true
      this.persist()
    },
    remove(item) {
      const index = this.items.findIndex((x) => x.id === item.id)
      if (index !== -1) this.items.splice(index, 1)
      item.isAdded = false
      this.persist()
    },
    persist() {
      localStorage.setItem('cart', JSON.stringify(this.items))
    },
    clear() {
      this.items = []
      this.persist()
    }
  }
})

export default useCartStore

