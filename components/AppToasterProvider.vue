<script setup>
const { toasts, dismiss } = useToast()

const ICONS = {
  info: 'lucide:info',
  success: 'lucide:circle-check',
  warning: 'lucide:triangle-alert',
  error: 'lucide:circle-x',
}

const VARIANTS = {
  info: 'border-base-content/20 bg-base-100/80 text-base-content',
  success: 'border-success/40 bg-success/15 text-success',
  warning: 'border-warning/40 bg-warning/15 text-warning',
  error: 'border-error/40 bg-error/15 text-error',
}
</script>

<template>
  <div id="app-toasts" />
  <ToastProvider :duration="4000" swipe-direction="right">
    <ToastPortal to="#app-toasts">
      <ToastViewport
        class="fixed right-0 bottom-0 m-0 flex max-h-screen w-full list-none flex-col gap-2 p-4 outline-none sm:max-w-sm"
      >
        <ToastRoot
          v-for="toast in toasts"
          :key="toast.id"
          class="app-toast flex items-start gap-3 rounded-lg border p-4 shadow-lg backdrop-blur-[8px]"
          :class="VARIANTS[toast.variant]"
          @update:open="open => !open && dismiss(toast.id)"
        >
          <Icon :name="ICONS[toast.variant]" class="mt-0.5 size-5 flex-none" />
          <div class="min-w-0 flex-1">
            <ToastTitle class="text-sm font-semibold break-words">
              {{ toast.title }}
            </ToastTitle>
            <ToastDescription v-if="toast.description" class="mt-1 text-xs break-words opacity-80">
              {{ toast.description }}
            </ToastDescription>
          </div>
          <ToastClose
            class="flex-none cursor-pointer rounded-md p-1 opacity-60 transition-opacity hover:opacity-100"
            aria-label="关闭"
          >
            <Icon name="lucide:x" class="size-4" />
          </ToastClose>
        </ToastRoot>
      </ToastViewport>
    </ToastPortal>
  </ToastProvider>
</template>

<style>
@keyframes app-toast-in {
  from {
    opacity: 0;
    transform: translateX(1rem);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.app-toast[data-state='open'] {
  animation: app-toast-in 220ms ease-out;
}

.app-toast[data-swipe='move'] {
  transform: translateX(var(--reka-toast-swipe-move-x, 0)) translateY(var(--reka-toast-swipe-move-y, 0));
}

.app-toast[data-swipe='cancel'] {
  transform: translateX(0) translateY(0);
  transition: transform 200ms ease-out;
}

.app-toast[data-swipe='end'] {
  transform: translateX(var(--reka-toast-swipe-end-x, 0)) translateY(var(--reka-toast-swipe-end-y, 0));
}
</style>
