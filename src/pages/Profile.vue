<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="max-w-xl mx-auto p-6">
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
  </div>
  
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/features/auth/model/auth.store'
import login from '@/components/ui/login.vue'

const authStore = useAuthStore()
const { isAuthenticated, user } = storeToRefs(authStore)

const logout = () => authStore.logout()
</script>

