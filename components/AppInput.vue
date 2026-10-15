<script setup lang="ts">
defineOptions({ inheritAttrs: false })

withDefaults(defineProps<{
  label?: string
  altLabel?: string
}>(), {
  label: '',
  altLabel: '',
})

const model = defineModel<string>({ default: '' })
</script>

<template>
  <label class="flex w-full flex-col gap-1">
    <span v-if="label" class="text-sm text-base-content/80">{{ label }}</span>
    <input
      v-bind="$attrs"
      v-model="model"
      class="w-full rounded-md border border-base-content/30 bg-base-100 px-3 py-2 text-sm text-base-content outline-none transition-colors focus:border-primary"
    >
    <span v-if="altLabel" class="text-xs text-base-content/50">{{ altLabel }}</span>
  </label>
</template>
