<template>
  <div class="flex items-center w-full border border-slate-200 p-3 sm:p-4 rounded-xl gap-3 sm:gap-4">
    <img class="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg" :src="imageUrl" :alt="title" />

    <div class="flex flex-col flex-1 min-w-0">
      <p class="text-sm sm:text-base font-medium line-clamp-2">{{ title }}</p>
      <div class="flex justify-between items-center mt-2">
        <b class="text-sm sm:text-base text-gray-800">{{ price }} руб.</b>
        <button
          @click="emit('onClickRemove')"
          class="opacity-40 hover:opacity-100 cursor-pointer transition p-1 rounded-full hover:bg-gray-100"
          aria-label="Удалить из корзины"
        >
          <img
            class="w-4 h-4 sm:w-5 sm:h-5"
            src="/close.svg"
            alt="close"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['onClickRemove'])

defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number
})
</script>
