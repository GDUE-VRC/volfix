<script setup lang="ts">
import logo from '~/assets/logo.png'
</script>

<template>
  <div class="flex items-center">
    <NuxtLink class="flex mr-auto ml-4 my-2 cursor-pointer" to="/">
      <img :src="logo" class="w-10 sm:w-12 mx-auto">
      <p class="ml-2 text-sm sm:text-base text-base-content my-auto">
        广东第二师范学院电脑义务维修中心
      </p>
    </NuxtLink>
    <ColorModeToggle class="mr-4" />
  </div>
</template>
