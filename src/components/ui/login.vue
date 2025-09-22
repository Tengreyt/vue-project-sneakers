<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex flex-col justify-center items-center min-h-[60vh] px-4 py-6">
    <form
      v-if="mode === 'login'"
      @submit.prevent="login"
      class="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-2xl shadow-gray-500/40 ring-1 ring-black/5 w-full max-w-[420px] sm:max-w-[360px]"
    >

      <h1 class="text-2xl sm:text-xl font-semibold text-gray-800 text-center">Вход</h1>

      <input
        type="text"
        v-model="loginName"
        placeholder="Имя пользователя"
        required
        inputmode="text"
        autocomplete="username"
        autocapitalize="none"
        class="w-full px-4 sm:px-3 py-3 sm:py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-base sm:text-sm placeholder:text-gray-400"
      />

      <input
        type="password"
        v-model="password"
        placeholder="Пароль"
        required
        :autocomplete="mode === 'register' ? 'new-password' : 'current-password'"
        class="w-full px-4 sm:px-3 py-3 sm:py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-base sm:text-sm placeholder:text-gray-400"
      />

      <button
        type="submit"
        class="w-full py-3 sm:py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition text-base sm:text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400"
      >
        Войти
      </button>

      <p class="text-sm text-gray-600 text-center">
        Нет аккаунта?
        <button
          @click="switchToRegister"
          type="button"
          class="text-blue-500 hover:underline"
        >
          Регистрация
        </button>
      </p>
    </form>

    <!-- Форма Регистрации -->
    <form
      v-if="mode === 'register'"
      @submit.prevent="register"
      class="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-2xl shadow-gray-500/40 ring-1 ring-black/5 w-full max-w-[420px] sm:max-w-[360px]"
    >

      <h1 class="text-2xl sm:text-xl font-semibold text-gray-800 text-center">Регистрация</h1>

      <input
        type="text"
        v-model="loginName"
        placeholder="Имя пользователя"
        required
        inputmode="text"
        autocomplete="username"
        autocapitalize="none"
        class="w-full px-4 sm:px-3 py-3 sm:py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-base sm:text-sm placeholder:text-gray-400"
      />

      <input
        type="password"
        v-model="password"
        placeholder="Пароль"
        required
        :autocomplete="mode === 'register' ? 'new-password' : 'current-password'"
        class="w-full px-4 sm:px-3 py-3 sm:py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-base sm:text-sm placeholder:text-gray-400"
      />

      <button
        type="submit"
        class="w-full py-3 sm:py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg transition text-base sm:text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-400"
      >
        Зарегистрироваться
      </button>

      <p class="text-sm text-gray-600 text-center">
        Уже есть аккаунт?
        <button
          @click="switchToLogin"
          type="button"
          class="text-blue-500 hover:underline"
        >
          Вход
        </button>
      </p>
    </form>

    <div v-if="message" class="mt-8 text-gray-800 text-center">
      <h2 class="text-red-500">{{ message }}</h2>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/features/auth/model/auth.store'

const authStore = useAuthStore()
const router = useRouter()

const loginName = ref('')
const password = ref('')
const message = ref('')
const mode = ref('login') 

const clearForm = () => {
  loginName.value = ''
  password.value = ''
}

const login = async () => {
  const user = await authStore.login(loginName.value)
  if (user) {
    message.value = `Добро пожаловать, ${user.user}!`
    router.push({ path: '/profile', query: { welcome: user.user } })
  } else {
    message.value = 'Такого пользователя нет!'
  }
  clearForm()
}

const register = async () => {
  if (!loginName.value) return
  const data = await authStore.register({
    user: loginName.value,
    password: password.value,
  })
  alert(`Пользователь ${data.user} зарегистрирован!`)
  clearForm()
  mode.value = 'login'
}

const switchToRegister = () => {
  mode.value = 'register'
  clearForm()
}

const switchToLogin = () => {
  mode.value = 'login'
  clearForm()
}
</script>
