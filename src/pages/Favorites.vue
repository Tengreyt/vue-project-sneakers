<template>
  <h2 class="text-3xl font-bold">Мои зокладки</h2>

  <CardList :items="favorites" is-favorites />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import CardList from '../components/CardList.vue'
import axios from 'axios'

const favorites = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://997ffc736e7023e4.mokky.dev/favorites?_relations=items'
    )
    favorites.value = data.map((obj) => obj.item)
  } catch (e) {
    console.error(e)
  }
})
</script>
