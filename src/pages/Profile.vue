<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="max-w-xl mx-auto p-6">
    <div v-if="isAuthenticated && welcomeName" class="mb-4 p-3 rounded-lg bg-green-50 text-green-700 border border-green-200">
      Добро пожаловать, {{ welcomeName }}!
    </div>
    <div v-if="isAuthenticated" class="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <img src="/profile.svg" class="w-12 h-12" alt="avatar" />
        <div>
          <h2 class="text-xl font-semibold">{{ user.user }}</h2>
          <p class="text-gray-500">ID: {{ user.id ?? '—' }}</p>
        </div>
      </div>

      <div class="flex gap-3">
        <router-link to="/favorites" class="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">Закладки</router-link>
        <button @click="logout" class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Выйти</button>
      </div>
    </div>

    <div v-else>
      <login />
    </div>

    <div v-if="isAuthenticated" class="mt-8">
      <h3 class="text-lg font-semibold mb-3">История заказов</h3>
      <div v-if="ordersLoading" class="text-gray-500">Загрузка заказов…</div>
      <div v-else>
        <div v-if="orders.length === 0" class="text-gray-500">Заказы не найдены.</div>
        <ul v-else class="flex flex-col gap-3">
          <li
            v-for="order in orders"
            :key="order.id"
            class="bg-white rounded-xl shadow p-4"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="font-medium">Заказ #{{ order.id }}</span>
              <span class="text-sm text-gray-500">Сумма: {{ order.totalPrice ?? calcTotal(order) }} ₽</span>
            </div>
            <ul class="text-sm text-gray-700 list-disc pl-5">
              <li v-for="it in order.items" :key="it.id">
                {{ it.title }} — {{ it.price }} ₽
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/features/auth/model/auth.store'
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, watch } from 'vue'
import login from '@/components/ui/login.vue'
import { useOrdersStore } from '@/features/orders/model/orders.store'

const authStore = useAuthStore()
const { isAuthenticated, user } = storeToRefs(authStore)
const route = useRoute()
const router = useRouter()

const welcomeName = computed(() => route.query.welcome)

onMounted(() => {
  if (route.query.welcome) {
    router.replace({ query: { ...route.query, welcome: undefined } })
  }
  if (isAuthenticated.value) ordersStore.fetchOrders()
})

const logout = () => {
  authStore.logout()
  if (welcomeName.value) {
    router.replace({ query: { ...route.query, welcome: undefined } })
  }
}

const ordersStore = useOrdersStore()
const { items: orders, isLoading: ordersLoading } = storeToRefs(ordersStore)
const calcTotal = (order) => order.items?.reduce((s, i) => s + (i.price || 0), 0) || 0

watch(
  () => isAuthenticated.value,
  (loggedIn) => {
    if (loggedIn) {
      ordersStore.fetchOrders()
    } else {
      ordersStore.items = []
    }
  }
)
</script>

