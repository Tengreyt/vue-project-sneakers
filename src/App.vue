<template>
  <Drawer v-if="drawerOpen" :total-price="totalPrice" :vatPrice="vatPrice" />

  <div class="bg-white w-4/5 mx-auto rounded-xl shadow-xl mt-14">
    <Header :total-price="totalPrice" @open-drawer="OpenDrawer" />

    <div class="p-8">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { computed, provide, ref, watch } from 'vue'
import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

/* Корзина */
const cart = ref([])

const drawerOpen = ref(false)

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const closeDrawer = () => {
  drawerOpen.value = false
}

const OpenDrawer = () => {
  drawerOpen.value = true
}

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

provide('cart', {
  cart,
  closeDrawer,
  OpenDrawer,
  addToCart,
  removeFromCart
})
/* ===== Корзина =====*/
</script>

<style scoped></style>
