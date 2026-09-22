import { count } from 'drizzle-orm'
import { issues } from '../../db/schema'

export default defineEventHandler(async () => {
  const [row] = await db.select({ value: count() }).from(issues)
  const rows = await db.select({ appTime: issues.appTime }).from(issues)

  const weeks = new Set(rows.map(({ appTime }) => beijingWeekKey(appTime)).filter(Boolean))
  const latest = rows.reduce((max, { appTime }) => Math.max(max, Number(appTime) || 0), 0)

  return {
    count: row?.value ?? 0,
    days: weeks.size ? (weeks.size - 1) * 5 + beijingWeekdayIndex(latest) : 0,
  }
})
