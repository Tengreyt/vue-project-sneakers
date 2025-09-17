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
        @click="() => emit('openDrawer')"
        class="flex items-center cursor-pointer gap-2 sm:gap-3 text-gray-500 hover:text-black"
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

      <li class="flex items-center cursor-pointer gap-2 sm:gap-3 text-gray-500 hover:text-black">
        <img src="/profile.svg" alt="Cart" class="w-5 sm:w-6" />
        <span class="text-sm sm:text-base">Профиль</span>
      </li>
    </ul>
  </header>
</template>

<script setup>
defineProps({
  totalPrice: Number
})

const emit = defineEmits(['openDrawer'])
</script>
