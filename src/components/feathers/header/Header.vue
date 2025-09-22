<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <header
    class="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-slate-200 px-4 sm:px-10 py-4 sm:py-8 gap-6 sm:gap-0"
  >
    <router-link to="/">
      <div class="flex items-center gap-3 sm:gap-4">
        <img src="/logo.png" alt="Logo" class="w-8 sm:w-10" />
        <div>
          <h2 class="text-lg sm:text-xl font-bold uppercase">Vue Sneakers</h2>
          <p class="text-slate-400 text-sm sm:text-base">Магазин лучших кроссовок</p>
        </div>
      </div>
    </router-link>

    <ul class="flex justify-between sm:justify-end items-center gap-6 sm:gap-10">
      <li
        role="button"
        aria-label="Открыть корзину"
        @click="() => emit('open-drawer')"
        class="relative flex items-center cursor-pointer gap-2 sm:gap-3 text-gray-500 hover:text-black active:scale-[.98] transition"
      >
        <img src="/cart.svg" alt="Cart" class="w-5 sm:w-6" />
        <b class="text-sm sm:text-base">{{ totalPrice }} руб.</b>
      </li>

      <router-link to="/favorites">
        <li class="flex items-center cursor-pointer gap-2 sm:gap-3 text-gray-500 hover:text-black">
          <img src="/heart.svg" alt="Cart" class="w-5 sm:w-6" />
          <span class="text-sm sm:text-base">Закладки</span>
        </li>
      </router-link>

      <router-link to="/profile" aria-label="Профиль">
        <li class="flex items-center cursor-pointer gap-2 sm:gap-3 text-gray-500 hover:text-black">
          <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
            <img v-if="isAuthenticated" src="/checked.svg" alt="Auth" class="w-4 h-4" />
            <img v-else src="/profile.svg" alt="Profile" class="w-5 sm:w-6" />
          </div>
          <span class="text-sm sm:text-base max-w-[120px] truncate">{{ isAuthenticated ? user.user : 'Профиль' }}</span>
        </li>
      </router-link>
    </ul>
  </header>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/features/auth/model/auth.store'
import { useCartStore } from '@/features/cart/model/cart.store'

defineProps({
  totalPrice: Number
})

const emit = defineEmits(['open-drawer'])

const authStore = useAuthStore()
const { isAuthenticated, user } = storeToRefs(authStore)

useCartStore()
</script>
