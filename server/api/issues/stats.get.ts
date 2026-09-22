import { count } from 'drizzle-orm'

export default defineEventHandler(async () => {
  const [row] = await db.select({ value: count() }).from(schema.issues)
  const rows = await db.select({ appTime: schema.issues.appTime }).from(schema.issues)

  const weeks = new Set(rows.map(({ appTime }) => beijingWeekKey(appTime)).filter(Boolean))
  const latest = rows.reduce((max, { appTime }) => (appTime > max ? appTime : max), '')

  return {
    count: row?.value ?? 0,
    days: weeks.size ? (weeks.size - 1) * 5 + beijingWeekdayIndex(latest) : 0,
  }
})
