import { desc } from 'drizzle-orm'
import { issues } from '../../db/schema'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  return await db.select().from(issues).orderBy(desc(issues.appTime)).limit(32)
})
