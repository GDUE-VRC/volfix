<script setup lang="ts">
import logo from '~/assets/logo.png'
</script>

<template>
  <div class="flex items-center">
    <nuxtLink class="flex mr-auto ml-4 my-2 cursor-pointer" to="/">
      <img :src="logo" class="w-12 mx-auto">
      <p class="ml-2 text-base text-base-content my-auto">
        广东第二师范学院电脑义务维修中心
      </p>
    </nuxtLink>
    <ColorModeToggle class="mr-4" />
  </div>
</template>
