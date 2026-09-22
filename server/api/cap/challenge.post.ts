import { generateChallenge } from 'capjs-core'

export default defineEventHandler(() =>
  generateChallenge(useRuntimeConfig().cap_secret),
)
