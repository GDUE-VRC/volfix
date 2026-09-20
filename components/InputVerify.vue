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
  verifySVG: {
    type: String,
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
    <input
      v-model="data"
      type="text"
      class="input bg-right bg-[length:78px_36px] bg-no-repeat"
      :style="`background-image: ` + `url(${verifySVG})`"
    >
    <div class="label">
      <span class="label-text-alt">{{ altLabel }}</span>
    </div>
  </label>
</template>
