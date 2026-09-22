<script setup>
const passwd = ref('')
const loading = ref(false)

const toast = useToast()

const { loggedIn, fetch: refreshSession } = useUserSession()

if (loggedIn.value) {
  await navigateTo('/manage')
}

async function login() {
  loading.value = true
  try {
    await $fetch('/api/session', { method: 'POST', body: { password: passwd.value } })
    await refreshSession()
    await navigateTo('/manage')
  }
  catch (error) {
    toast.error(error.data?.message ?? '登录失败, 请稍后重试')
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-full flex items-center justify-center">
    <form class="flex w-72 flex-col gap-3" @submit.prevent="login">
      <AppInput v-model="passwd" type="password" placeholder="PassWord" />
      <AppButton type="submit" :disabled="loading">
        {{ loading ? '登录中...' : 'LOGIN' }}
      </AppButton>
    </form>
  </div>
</template>
