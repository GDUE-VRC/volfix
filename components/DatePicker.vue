<script setup>
const datesList = ref([])
const dateModel = defineModel()

const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

function getDatesRange(currentDate, days) {
  const dates = []
  for (let i = 0; i < days; i++) {
    const date = new Date(currentDate)
    date.setDate(currentDate.getDate() + i)
    if (date.getDay() === 0 || date.getDay() === 6) {
      days += 1
      continue
    }
    dates.push({
      date,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      weekday: weekdays[date.getDay()],
    })
  }
  return dates
}

function toTimestamp(date) {
  const d = new Date(date)
  d.setUTCHours(0, 0, 0, 0)
  return d.getTime()
}

datesList.value = getDatesRange(new Date(), 5)

const selected = computed(() => (dateModel.value == null ? '' : String(dateModel.value)))

function selectDate(value) {
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
      v-for="(date, index) in datesList"
      :key="index"
      :value="String(toTimestamp(date.date))"
      class="flex-1 cursor-pointer bg-base-200 px-2 py-2 text-sm text-base-content transition-colors hover:bg-base-content/15 data-[state=checked]:bg-primary data-[state=checked]:text-white data-[state=checked]:hover:bg-primary"
      :aria-label="`${date.day} ${date.weekday}`"
    >
      {{ date.day }} {{ date.weekday }}
    </RadioGroupItem>
  </RadioGroupRoot>
</template>
