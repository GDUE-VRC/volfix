<script setup lang="ts">
const BOTTOM_THRESHOLD = 8

const canScrollDown = ref(false)
let observer: MutationObserver | undefined
let stopRouteHook: (() => void) | undefined

function update() {
  if (!import.meta.client)
    return

  const { scrollHeight } = document.documentElement
  const viewport = window.innerHeight
  const scrolled = window.scrollY || document.documentElement.scrollTop
  canScrollDown.value = scrollHeight - viewport - scrolled > BOTTOM_THRESHOLD
}

function scrollToBottom() {
  window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
}

onMounted(() => {
  update()
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
  observer = new MutationObserver(update)
  observer.observe(document.body, { childList: true, subtree: true })
  stopRouteHook = useRouter().afterEach(() => nextTick(update))
})

onUnmounted(() => {
  window.removeEventListener('scroll', update)
  window.removeEventListener('resize', update)
  observer?.disconnect()
  stopRouteHook?.()
})
</script>

<template>
  <Transition
    enter-active-class="duration-200 ease-out"
    enter-from-class="translate-y-2 opacity-0"
    leave-active-class="duration-150 ease-in"
    leave-to-class="translate-y-2 opacity-0"
  >
    <button
      v-if="canScrollDown"
      class="fixed bottom-4 left-1/2 inline-flex size-8 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-base-200 text-base-content shadow-lg ring-1 ring-base-content/10 transition hover:bg-base-content/15"
      aria-label="滚动到底部"
      @click="scrollToBottom"
    >
      <Icon name="lucide:arrow-down" class="size-4" />
    </button>
  </Transition>
</template>
