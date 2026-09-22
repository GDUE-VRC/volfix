import { count, desc } from 'drizzle-orm'
import { PAGE_SIZE } from '../../../shared/constants'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const { page: rawPage } = getQuery(event)
  const page = Math.max(1, Math.trunc(Number(rawPage)) || 1)

  const [row] = await db.select({ value: count() }).from(schema.issues)

  const items = await db
    .select()
    .from(schema.issues)
    .orderBy(desc(schema.issues.appTime), desc(schema.issues.id))
    .limit(PAGE_SIZE)
    .offset((page - 1) * PAGE_SIZE)

  return {
    items,
    total: row?.value ?? 0,
    page,
    pageSize: PAGE_SIZE,
  }
})
