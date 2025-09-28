<template>
  <div
    class="card relative bg-white border border-slate-100 rounded-2xl sm:rounded-3xl p-4 sm:p-8 cursor-pointer hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-lg sm:hover:shadow-xl transition flex flex-col justify-between"
  >
    <button
      v-if="onClickFavorite"
      @click.stop="onClickFavorite"
      class="absolute top-4 left-4 sm:top-8 sm:left-8 p-2 rounded-full hover:bg-gray-100 transition"
      aria-label="Добавить в избранное"
    >
      <img
        :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
        alt="Like"
        class="w-5 h-5 sm:w-6 sm:h-6"
      />
    </button>

    <div class="flex-1 flex flex-col items-center">
      <img :src="imageUrl" alt="Sneakers" class="h-32 sm:h-40 object-contain" />

      <p class="mt-2 text-center line-clamp-2 min-h-[40px] sm:min-h-[48px] text-sm sm:text-base">
        {{ title }}
      </p>
    </div>

    <div class="flex justify-between items-center mt-4 sm:mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400 text-xs sm:text-sm">Цена: </span>
        <b class="text-sm sm:text-base">{{ price }} руб.</b>
      </div>

      <button
        v-if="onClickAdd"
        @click.stop="onClickAdd"
        class="p-2 rounded-full hover:bg-gray-100 transition"
        :aria-label="!isAdded ? 'Добавить в корзину' : 'Удалить из корзины'"
      >
        <img
          :src="!isAdded ? '/plus.svg' : '/checked.svg'"
          alt="Plus"
          class="w-5 h-5 sm:w-6 sm:h-6"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickFavorite: Function,
  onClickAdd: Function,
})
</script>

<style scoped>
.card {
  height: 320px; 
}

@media (min-width: 640px) {
  .card {
    height: 400px; 
  }
}
</style>
