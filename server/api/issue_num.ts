import { count } from 'drizzle-orm'
import { issues } from '../db/schema'

export default defineEventHandler(async () => {
  const [row] = await db.select({ value: count() }).from(issues)
  return row?.value ?? 0
})
