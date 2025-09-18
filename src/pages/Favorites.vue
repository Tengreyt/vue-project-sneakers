<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h2 class="text-3xl font-bold">Мои зокладки</h2>

  <CardList :items="favorites" is-favorites />
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
