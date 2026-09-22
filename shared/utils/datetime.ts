import { Temporal } from 'temporal-polyfill'

const TZ = 'Asia/Shanghai'
const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/
const WEEKDAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

export type TimeValue = string | null | undefined

export interface WorkingDay {
  date: string
  day: number
  weekday: string
}

function zoned(value: TimeValue): Temporal.ZonedDateTime | null {
  if (!value) {
    return null
  }
  try {
    return DATE_ONLY.test(value)
      ? Temporal.PlainDate.from(value).toZonedDateTime(TZ)
      : Temporal.Instant.from(value).toZonedDateTimeISO(TZ)
  }
  catch {
    return null
  }
}

export function formatDate(value: TimeValue): string {
  return zoned(value)?.toString().slice(0, 10) ?? ''
}

export function formatMonthDay(value: TimeValue): string {
  return formatDate(value).slice(5)
}

export function formatDateTime(value: TimeValue): string {
  return zoned(value)?.toPlainDateTime().toString().replace('T', ' ').slice(0, 19) ?? ''
}

export function formatWeekday(value: TimeValue): string {
  const date = zoned(value)
  return date ? (WEEKDAYS[date.dayOfWeek % 7] ?? '') : ''
}

export function beijingWeekdayIndex(value: TimeValue): number {
  return zoned(value)?.dayOfWeek ?? 0
}

export function beijingWeekKey(value: TimeValue): string {
  const date = zoned(value)
  return date ? date.subtract({ days: date.dayOfWeek - 1 }).toString().slice(0, 10) : ''
}

export function upcomingWorkingDays(count: number): WorkingDay[] {
  let cursor = Temporal.Now.zonedDateTimeISO(TZ)
  const days: WorkingDay[] = []
  while (days.length < count) {
    if (cursor.dayOfWeek <= 5) {
      days.push({ date: cursor.toString().slice(0, 10), day: cursor.day, weekday: WEEKDAYS[cursor.dayOfWeek % 7] ?? '' })
    }
    cursor = cursor.add({ days: 1 })
  }
  return days
}
