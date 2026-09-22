import { and, eq, gt, isNull } from 'drizzle-orm'

export async function consumeProof(token: unknown) {
  if (typeof token !== 'string' || !token) {
    return false
  }

  const rows = await db
    .update(schema.capChallenges)
    .set({ usedAt: new Date() })
    .where(and(
      eq(schema.capChallenges.sig, token),
      isNull(schema.capChallenges.usedAt),
      gt(schema.capChallenges.expiresAt, new Date()),
    ))
    .returning({ sig: schema.capChallenges.sig })

  return rows.length > 0
}
