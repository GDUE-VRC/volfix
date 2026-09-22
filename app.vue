<script setup>
useHead({
  title: '电脑义务维修中心',
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-base-100 transition-colors">
    <Header />
    <NuxtPage class="flex-grow" />
    <p class="text-xs text-base-content/50 text-center p-4 mr-auto">
      &copy; 2025. 电脑义务维修中心. All rights reserved.
    </p>
  </div>
  <AppDialogProvider />
  <AppToasterProvider />
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.1s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
