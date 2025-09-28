<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div 
    class="bg-white w-full sm:w-96 h-full fixed right-0 top-0 z-20 p-4 sm:p-8 transition transform flex flex-col"
    role="dialog" aria-modal="true"
    @click.stop
  >
    <DrawerHead />

    <div v-if="!totalPrice || orderId" class="flex h-full items-center justify-center px-4">
      <InfoBlock
        v-if="!totalPrice && !orderId"
        title="Корзина пустая"
        description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
        image-url="/package-icon.png"
      />
      <InfoBlock
        v-if="orderId"
        title="Заказ оформлен!"
        :description="`Ваш заказ #${orderId} скоро будет передан курьерской доставке.`"
        image-url="/order-success-icon.png"
      />
    </div>

    <div v-else class="flex flex-col h-full">
      <div class="flex-1 cart-items-container pt-4 pb-6">
        <CartItemList />
      </div>

      <div class="cart-checkout-button">
        <div class="flex flex-col gap-3 sm:gap-4">
          <div class="flex gap-2 text-sm sm:text-base">
            <span>Итого:</span>
            <div class="flex-1 border-b border-dashed"></div>
            <b>{{ totalPrice }} ₽</b>
          </div>

          <div class="flex gap-2 text-sm sm:text-base">
            <span>Налог 5%:</span>
            <div class="flex-1 border-b border-dashed"></div>
            <b>{{ vatPrice }} ₽</b>
          </div>

          <button
            @click="createOrder"
            :disabled="cartButtonDisabled"
            class="transition w-full bg-lime-500 text-white disabled:bg-slate-400 py-3 sm:py-4 rounded-xl hover:bg-lime-600 active:bg-lime-700 cursor-pointer text-sm sm:text-base font-medium shadow-lg"
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Overlay для закрытия при клике вне Drawer -->
  <div 
    class="fixed top-0 left-0 h-full w-full bg-black z-10 bg-opacity-70"
    @click="onOverlayClick"
  ></div>
</template>

<script setup>
import DrawerHead from './DrawerHead.vue'
import CartItemList from '../card/CartItemList.vue'
import { computed, ref, inject, onMounted, onUnmounted } from 'vue'
import InfoBlock from '../info/InfoBlock.vue'
import http from '@/shared/api/http'
import { useCartStore } from '@/features/cart/model/cart.store'

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number
})

const cartStore = useCartStore()
const { cart, closeDrawer } = inject('cart')

const isCreating = ref(false)
const orderId = ref(null)

const onOverlayClick = () => {
  if (closeDrawer) {
    closeDrawer()
  }
}

const createOrder = async () => {
  try {
    isCreating.value = true
    const { data } = await http.post('/orders', {
      items: cart.value,
      totalPrice: props.totalPrice
    })

    cartStore.clear()
    orderId.value = data.id
    return data
  } catch (err) {
    console.error(err)
  } finally {
    isCreating.value = false
  }
}

const cartIsEmpty = computed(() => cart.value.length === 0)
const cartButtonDisabled = computed(() => isCreating.value || cartIsEmpty.value)

onMounted(() => {
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>
