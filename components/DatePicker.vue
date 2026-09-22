<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui'

const dateModel = defineModel<string>()

const datesList = upcomingWorkingDays(5)

function selectDate(value: AcceptableValue) {
  dateModel.value = String(value)
}
</script>

<template>
  <RadioGroupRoot
    :model-value="dateModel"
    class="flex max-w-full divide-x divide-base-content/15 overflow-hidden rounded-md"
    @update:model-value="selectDate"
  >
    <RadioGroupItem
      v-for="date in datesList"
      :key="date.date"
      :value="date.date"
      class="flex-1 cursor-pointer bg-base-200 px-1 py-2 text-base-content transition-colors hover:bg-base-content/15 data-[state=checked]:bg-primary data-[state=checked]:text-white data-[state=checked]:hover:bg-primary"
      :aria-label="`${date.day} ${date.weekday}`"
    >
      <span class="text-sm mb-0.5">{{ date.day }}</span>
      <span>/</span>
      <span class=" text-xs">{{ date.weekday }}</span>
    </RadioGroupItem>
  </RadioGroupRoot>
</template>
