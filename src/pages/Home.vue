<template>
  <!-- Заголовок + фильтры -->
  <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <h2 class="text-2xl sm:text-3xl font-bold">Все кроссовки</h2>

    <div class="flex flex-col sm:flex-row gap-4 sm:items-center">
      <select
        @change="onChange"
        class="py-2 px-3 border rounded-md outline-none text-sm sm:text-base"
      >
        <option value="name">По названию</option>
        <option value="price">По цене (дешевые)</option>
        <option value="-price">По цене (дорогие)</option>
      </select>

      <div class="relative">
        <img
          src="/search.svg"
          alt="search"
          class="absolute top-3 left-4 w-4 sm:w-5"
        />
        <input
          @input="onChangeSearchInput"
          type="text"
          placeholder="Поиск..."
          class="w-full rounded-md py-2 pl-10 pr-4 outline-none focus:border-gray-400 border border-gray-200 text-sm sm:text-base"
        />
      </div>
    </div>
  </div>

  <!-- Список карточек -->
  <div class="mt-6 sm:mt-10 mb-10">
    <CardList
      :items="items"
      @add-to-favorite="addToFavorite"
      @addToCart="onClickAddPlus"
    />
  </div>
</template>

<script setup>
import { reactive, watch, ref, onMounted } from 'vue'
import axios from 'axios'
import debounce from 'lodash.debounce'
import CardList from '../components/CardList.vue'
import { inject } from 'vue'

const { cart, addToCart, removeFromCart } = inject('cart')

const items = ref([])

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
    item.isAdded = true
  } else {
    removeFromCart(item)
  }
}

const onChange = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value
}, 500)

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        item_id: item.id
      }

      item.isFavorite = true

      const { data } = await axios.post(`https://997ffc736e7023e4.mokky.dev/favorites`, obj)

      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://997ffc736e7023e4.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (err) {
    console.log(err)
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`https://997ffc736e7023e4.mokky.dev/favorites`)
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.item_id === item.id)

      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
  } catch (e) {
    console.error(e)
  }
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(`https://997ffc736e7023e4.mokky.dev/items`, {
      params
    })

    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }))
  } catch (e) {
    console.error(e)
  }
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []

  await fetchItems()
  await fetchFavorites()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})

watch(filters, fetchItems)
</script>

<style scoped></style>
