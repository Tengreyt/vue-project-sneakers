<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <header
    class="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-slate-200 px-4 sm:px-10 py-4 sm:py-8 gap-6 sm:gap-0"
  >
    <!-- Мобильная навигация -->
    <div class="flex items-center justify-between w-full sm:hidden">
      <router-link to="/">
        <div class="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" class="w-8" />
          <div>
            <h2 class="text-lg font-bold uppercase">Vue Sneakers</h2>
            <p class="text-slate-400 text-sm">Магазин лучших кроссовок</p>
          </div>
        </div>
      </router-link>

      <!-- Бургер меню -->
      <button
        @click="toggleMobileMenu"
        class="flex flex-col justify-center items-center w-8 h-8 space-y-1"
        aria-label="Открыть меню"
      >
        <span 
          class="block w-6 h-0.5 bg-gray-600 transition-all duration-300"
          :class="{ 'rotate-45 translate-y-1.5': isMobileMenuOpen }"
        ></span>
        <span 
          class="block w-6 h-0.5 bg-gray-600 transition-all duration-300"
          :class="{ 'opacity-0': isMobileMenuOpen }"
        ></span>
        <span 
          class="block w-6 h-0.5 bg-gray-600 transition-all duration-300"
          :class="{ '-rotate-45 -translate-y-1.5': isMobileMenuOpen }"
        ></span>
      </button>
    </div>

    <!-- Десктопная навигация -->
    <div class="hidden sm:flex sm:items-center sm:gap-4">
      <router-link to="/">
        <div class="flex items-center gap-4">
          <img src="/logo.png" alt="Logo" class="w-10" />
          <div>
            <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
            <p class="text-slate-400 text-base">Магазин лучших кроссовок</p>
          </div>
        </div>
      </router-link>
    </div>

    <!-- Мобильное меню -->
    <div 
      v-if="isMobileMenuOpen"
      class="fixed inset-0 z-50 bg-black bg-opacity-50 sm:hidden"
      @click="closeMobileMenu"
    >
      <div 
        class="fixed right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300"
        @click.stop
      >
        <div class="p-6">
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-2xl font-bold">Меню</h2>
            <button
              @click="closeMobileMenu"
              class="w-8 h-8 flex items-center justify-center"
              aria-label="Закрыть меню"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <nav class="flex flex-col gap-6">
            <router-link 
              to="/" 
              @click="closeMobileMenu"
              class="flex items-center gap-3 text-gray-600 hover:text-black transition"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              <span>Главная</span>
            </router-link>

            <button
              @click="() => { emit('open-drawer'); closeMobileMenu(); }"
              class="flex items-center gap-3 text-gray-600 hover:text-black transition"
            >
              <img src="/cart.svg" alt="Cart" class="w-6 h-6" />
              <span>Корзина ({{ totalPrice }} руб.)</span>
            </button>

            <router-link 
              to="/favorites" 
              @click="closeMobileMenu"
              class="flex items-center gap-3 text-gray-600 hover:text-black transition"
            >
              <img src="/heart.svg" alt="Favorites" class="w-6 h-6" />
              <span>Закладки</span>
            </router-link>

            <router-link 
              to="/profile" 
              @click="closeMobileMenu"
              class="flex items-center gap-3 text-gray-600 hover:text-black transition"
            >
              <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                <img v-if="isAuthenticated" src="/checked.svg" alt="Auth" class="w-4 h-4" />
                <img v-else src="/profile.svg" alt="Profile" class="w-6 h-6" />
              </div>
              <span>{{ isAuthenticated ? user.user : 'Профиль' }}</span>
            </router-link>
          </nav>
        </div>
      </div>
    </div>

    <!-- Десктопное меню -->
    <ul class="hidden sm:flex sm:justify-end sm:items-center gap-10">
      <li
        role="button"
        aria-label="Открыть корзину"
        @click="() => emit('open-drawer')"
        class="relative flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black active:scale-[.98] transition"
      >
        <img src="/cart.svg" alt="Cart" class="w-6" />
        <b class="text-base">{{ totalPrice }} руб.</b>
      </li>

      <router-link to="/favorites">
        <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
          <img src="/heart.svg" alt="Cart" class="w-6" />
          <span class="text-base">Закладки</span>
        </li>
      </router-link>

      <router-link to="/profile" aria-label="Профиль">
        <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
          <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
            <img v-if="isAuthenticated" src="/checked.svg" alt="Auth" class="w-4 h-4" />
            <img v-else src="/profile.svg" alt="Profile" class="w-6" />
          </div>
          <span class="text-base max-w-[120px] truncate">{{ isAuthenticated ? user.user : 'Профиль' }}</span>
        </li>
      </router-link>
    </ul>
  </header>
</template>

<script setup>
import { ref } from 'vue'
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

// Мобильное меню
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>
