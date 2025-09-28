<template>
  <Drawer v-if="drawerOpen" :total-price="totalPrice" :vatPrice="vatPrice" />

  <div class="bg-white w-full sm:w-4/5 mx-auto rounded-xl shadow-xl mt-4 sm:mt-14 mb-4 sm:mb-10">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />

    <div class="p-4 sm:p-8">
      <RouterView />
    </div>
  </div>

</template>

<script setup>
import { computed, provide, ref } from 'vue'
import { storeToRefs } from 'pinia'



import Header from './components/feathers/header/Header.vue'
import Drawer from './components/feathers/drawer/Drawer.vue'
import { useCartStore } from '@/features/cart/model/cart.store'


const cartStore = useCartStore()
const { items } = storeToRefs(cartStore)


const totalPrice = computed(() => cartStore.totalPrice)
const vatPrice = computed(() => cartStore.vatPrice)



const drawerOpen = ref(false)
const openDrawer = () => { drawerOpen.value = true }
const closeDrawer = () => { drawerOpen.value = false }

provide('cart', {
  cart: items,
  closeDrawer,
  openDrawer,
  addToCart: cartStore.add,
  removeFromCart: cartStore.remove
})
</script>

<style scoped></style>
