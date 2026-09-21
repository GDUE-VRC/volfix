<script setup>
const checked = defineModel({ type: Boolean, default: false })
</script>

<template>
  <CheckboxRoot
    v-model="checked"
    class="grid size-4 shrink-0 cursor-pointer place-content-center rounded-sm border border-base-content/30 bg-base-100 text-white data-[state=checked]:border-primary data-[state=checked]:bg-primary"
  >
    <CheckboxIndicator>
      <slot />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
