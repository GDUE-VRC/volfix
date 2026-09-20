<script setup>
import { ref, watch } from 'vue'

defineProps({
  label: {
    type: String,
    default: '',
  },
  altLabel: {
    type: String,
    default: '',
  },
})

const dateModel = defineModel()
const data = ref('')
watch(data, (newValue) => {
  dateModel.value = newValue
})
</script>

<template>
  <label class="form-control w-full">
    <div class="label">
      <span class="label-text text-xs">{{ label }}</span>
    </div>
    <input v-model="data" type="text" class="input">
    <div class="label">
      <span class="label-text-alt">{{ altLabel }}</span>
    </div>
  </label>
</template>
