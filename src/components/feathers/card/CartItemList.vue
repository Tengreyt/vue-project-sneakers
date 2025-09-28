<template>
  <div v-auto-animate class="flex flex-col gap-3 sm:gap-4">
    <CartItem
      v-for="item in cart"
      :key="item.id"
      :title="item.title"
      :price="item.price"
      :image-url="item.imageUrl"
      @on-click-remove="() => removeFromCart(item)"
    />
  </div>
</template>

<script setup>
import CartItem from './CartItem.vue'
import { inject } from 'vue'

const { cart, removeFromCart } = inject('cart')
</script>
