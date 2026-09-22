<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
})

const open = defineModel('open', { type: Boolean, default: false })

function close() {
  open.value = false
}
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>

    <DialogPortal to="#app-dialogs">
      <DialogOverlay class="fixed inset-0 bg-black/50" />
      <DialogContent class="fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg bg-base-100 p-5 shadow-xl">
        <DialogTitle class="text-lg font-semibold text-base-content">
          {{ title }}
        </DialogTitle>
        <DialogDescription class="sr-only">
          {{ description }}
        </DialogDescription>

        <slot :close="close" />
        <slot name="actions" :close="close" />
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
