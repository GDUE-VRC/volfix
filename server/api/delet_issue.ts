import { eq } from 'drizzle-orm'
import { issues } from '../db/schema'

export default defineEventHandler(async (event) => {
  requireManagerPassword(event)

  const { id } = getQuery(event)
  await db.delete(issues).where(eq(issues.id, Number(id)))
})
