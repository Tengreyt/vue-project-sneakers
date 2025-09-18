<template>
  <Drawer v-if="drawerOpen" :total-price="totalPrice" :vatPrice="vatPrice" />

  <div class="bg-white w-4/5 mx-auto rounded-xl shadow-xl mt-14 mb-14">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />

    <div class="p-8">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { computed, provide, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/features/cart/model/cart.store'
import Header from './components/feathers/header/Header.vue'
import Drawer from './components/feathers/drawer/Drawer.vue'

const cartStore = useCartStore()
const { items } = storeToRefs(cartStore)
const totalPrice = computed(() => cartStore.totalPrice)
const vatPrice = computed(() => cartStore.vatPrice)

const drawerOpen = ref(false)
const closeDrawer = () => {
  drawerOpen.value = false
}
const openDrawer = () => {
  drawerOpen.value = true
}

provide('cart', {
  cart: items,
  closeDrawer,
  openDrawer,
  addToCart: cartStore.add,
  removeFromCart: cartStore.remove
})
</script>

<style scoped></style>
