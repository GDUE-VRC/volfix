import type { ValidateChallengeBody } from 'capjs-core'
import { validateChallenge } from 'capjs-core'

export default defineEventHandler(async (event) => {
  const body = await readBody<ValidateChallengeBody>(event)
  let sig = ''

  const result = await validateChallenge(useRuntimeConfig().cap_secret, body, {
    consumeNonce: async (signature, ttlMs) => {
      const rows = await db
        .insert(schema.capChallenges)
        .values({ sig: signature, expiresAt: new Date(Date.now() + ttlMs), answer: body.solutions as number[] })
        .onConflictDoNothing()
        .returning({ sig: schema.capChallenges.sig })
      if (!rows.length) {
        return false
      }
      sig = signature
      return true
    },
    signToken: async () => sig,
  })

  return result.success
    ? { success: true, token: result.token, expires: result.expires }
    : { success: false, error: result.reason }
})
