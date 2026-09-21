<script setup>
const passwd = ref('')
const errorMessage = ref('')
const loading = ref(false)

async function login() {
  errorMessage.value = ''
  loading.value = true
  try {
    await $fetch('/api/session', { method: 'POST', body: { password: passwd.value } })
    await navigateTo('/manage')
  }
  catch (error) {
    errorMessage.value = error.data?.message ?? '登录失败, 请稍后重试'
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-full flex items-center justify-center">
    <form class="flex w-72 flex-col gap-3" @submit.prevent="login">
      <div v-if="errorMessage" class="rounded-md bg-error/15 px-3 py-2 text-sm text-error" role="alert">
        {{ errorMessage }}
      </div>
      <AppInput v-model="passwd" type="password" placeholder="PassWord" />
      <AppButton type="submit" :disabled="loading">
        {{ loading ? '登录中...' : 'LOGIN' }}
      </AppButton>
    </form>
  </div>
</template>
