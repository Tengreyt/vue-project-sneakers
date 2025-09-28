<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex flex-col gap-4 sm:gap-6">
    <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold">Мои закладки</h2>

    <div v-if="favorites.length === 0" class="flex flex-col items-center justify-center py-12 text-gray-500">
      <img src="/heart.svg" alt="No favorites" class="w-16 h-16 mb-4 opacity-50" />
      <p class="text-lg">У вас пока нет избранных товаров</p>
      <p class="text-sm">Добавьте товары в избранное, чтобы они появились здесь</p>
    </div>

    <CardList v-else :items="favorites" is-favorites />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import CardList from '../components/feathers/card/CardList.vue'
import http from '@/shared/api/http'
const favorites = ref([])

onMounted(async () => {
  try {
    const { data } = await http.get('/favorites?_relations=items')
    favorites.value = data.map((obj) => obj.item)
  } catch (e) {
    console.error(e)
  }
})
</script>
