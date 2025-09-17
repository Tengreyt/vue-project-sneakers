<template>
  <div
    class="card relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition flex flex-col justify-between"
  >
    <img
      v-if="onClickFavorite"
      @click.stop="onClickFavorite"
      :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
      alt="Like 1"
      class="absolute top-8 left-8"
    />

    <div class="flex-1 flex flex-col items-center">
      <img :src="imageUrl" alt="Sneakers" class="h-40 object-contain" />

      <p class="mt-2 text-center line-clamp-2 min-h-[48px]">
        {{ title }}
      </p>
    </div>

    <div class="flex justify-between items-center mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400">Цена: </span>
        <b>{{ price }} руб.</b>
      </div>

      <img
        v-if="onClickAdd"
        @click.stop="onClickAdd"
        :src="!isAdded ? '/plus.svg' : '/checked.svg'"
        alt="Plus"
      />
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
  height: 400px; 
}
</style>
