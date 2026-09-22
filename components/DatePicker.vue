<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui'

const dateModel = defineModel<string | number>()

const datesList = upcomingWorkingDays(5)

const selected = computed(() => (dateModel.value == null ? '' : String(dateModel.value)))

function selectDate(value: AcceptableValue) {
  dateModel.value = Number(value)
}
</script>

<template>
  <RadioGroupRoot
    :model-value="selected"
    class="flex max-w-full divide-x divide-base-content/15 overflow-hidden rounded-md"
    @update:model-value="selectDate"
  >
    <RadioGroupItem
      v-for="date in datesList"
      :key="date.timestamp"
      :value="String(date.timestamp)"
      class="flex-1 cursor-pointer bg-base-200 px-2 py-2 text-sm text-base-content transition-colors hover:bg-base-content/15 data-[state=checked]:bg-primary data-[state=checked]:text-white data-[state=checked]:hover:bg-primary"
      :aria-label="`${date.day} ${date.weekday}`"
    >
      {{ date.day }} {{ date.weekday }}
    </RadioGroupItem>
  </RadioGroupRoot>
</template>
