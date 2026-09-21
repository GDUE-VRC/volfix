import { count } from 'drizzle-orm'
import { issues } from '../../db/schema'

export default defineEventHandler(async () => {
  const [row] = await db.select({ value: count() }).from(issues)
  const rows = await db.select({ appTime: issues.appTime }).from(issues)
  const weeks = new Set<string>()

  for (const { appTime } of rows) {
    const date = new Date(Number(appTime))
    const dayOfWeek = date.getDay()
    date.setDate(date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1))
    weeks.add(date.toISOString().slice(0, 10))
  }

  let lastWeekDay = 0
  for (const week of weeks) {
    lastWeekDay = new Date(week).getDay()
  }

  return {
    count: row?.value ?? 0,
    days: weeks.size ? (weeks.size - 1) * 5 - lastWeekDay : 0,
  }
})
