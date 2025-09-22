<!-- eslint-disable vue/multi-word-component-names -->
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
import debounce from 'lodash.debounce'
import CardList from '../components/feathers/card/CardList.vue'
import { useCartStore } from '@/features/cart/model/cart.store'
import { useProductsStore } from '@/entities/product/model/products.store'
import { useFavoritesStore } from '@/features/favorites/model/favorites.store'

const cartStore = useCartStore()
const productsStore = useProductsStore()
const favoritesStore = useFavoritesStore()

const items = ref([])

const filters = reactive(productsStore.filters)

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    cartStore.add(item)
    item.isAdded = true
  } else {
    cartStore.remove(item)
  }
}

const onChange = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value
}, 500)

const addToFavorite = async (item) => {
  await favoritesStore.toggleFavorite(item)
}

const fetchFavorites = async () => {
  await favoritesStore.fetchFavorites()
  const favs = favoritesStore.items
  items.value = items.value.map((item) => {
    const favorite = favs.find((favorite) => favorite.item_id === item.id)
    if (!favorite) return item
    return { ...item, isFavorite: true, favoriteId: favorite.id }
  })
}

const fetchItems = async () => {
  await productsStore.fetchItems()
  items.value = productsStore.items
}

onMounted(async () => {
  await fetchItems()
  await fetchFavorites()
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cartStore.items.some((cartItem) => cartItem.id === item.id)
  }))
})

watch(
  () => cartStore.items,
  () => {
    items.value = items.value.map((item) => ({
      ...item,
      isAdded: cartStore.items.some((cartItem) => cartItem.id === item.id)
    }))
  },
  { deep: true }
)

watch(filters, fetchItems)
</script>
