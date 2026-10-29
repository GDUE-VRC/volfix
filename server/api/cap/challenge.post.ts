import { generateChallenge } from 'capjs-core'
import { defineEventHandler, useRuntimeConfig } from 'nuxt/server'

export default defineEventHandler(() =>
  generateChallenge(useRuntimeConfig().cap_secret),
)
