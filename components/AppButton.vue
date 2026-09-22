<script setup lang="ts">
type ButtonVariant = 'solid' | 'soft' | 'ghost'
type ButtonColor = 'neutral' | 'primary' | 'success' | 'warning' | 'error'

const props = withDefaults(defineProps<{
  variant?: ButtonVariant
  color?: ButtonColor
}>(), {
  variant: 'solid',
  color: 'neutral',
})

const BASE = 'inline-flex cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50'

const VARIANTS: Record<ButtonVariant, Record<ButtonColor, string>> = {
  solid: {
    neutral: 'bg-base-200 text-base-content hover:bg-base-content/15',
    primary: 'bg-primary text-white hover:bg-primary/90',
    success: 'bg-success text-white hover:bg-success/90',
    warning: 'bg-warning text-black hover:bg-warning/90',
    error: 'bg-error text-white hover:bg-error/90',
  },
  soft: {
    neutral: 'bg-base-content/10 text-base-content hover:bg-base-content/15',
    primary: 'bg-primary/15 text-primary hover:bg-primary/25',
    success: 'bg-success/15 text-success hover:bg-success/25',
    warning: 'bg-warning/20 text-warning hover:bg-warning/30',
    error: 'bg-error/15 text-error hover:bg-error/25',
  },
  ghost: {
    neutral: 'text-base-content hover:bg-base-content/10',
    primary: 'text-primary hover:bg-primary/10',
    success: 'text-success hover:bg-success/10',
    warning: 'text-warning hover:bg-warning/10',
    error: 'text-error hover:bg-error/10',
  },
}

const classes = computed(() => `${BASE} ${VARIANTS[props.variant][props.color]}`)
</script>

<template>
  <button :class="classes">
    <slot />
  </button>
</template>
