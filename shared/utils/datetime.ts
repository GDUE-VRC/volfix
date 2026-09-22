const WEEKDAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
const BEIJING_OFFSET = 8 * 60 * 60 * 1000

type TimeValue = string | number | null | undefined

export interface WorkingDay {
  timestamp: number
  day: number
  weekday: string
}

function toBeijingDate(value: TimeValue): Date | null {
  if (value === null || value === undefined || value === '') {
    return null
  }
  const ms = Number(value)
  return Number.isFinite(ms) ? new Date(ms + BEIJING_OFFSET) : null
}

export function formatDate(value: TimeValue): string {
  return toBeijingDate(value)?.toISOString().slice(0, 10) ?? ''
}

export function formatMonthDay(value: TimeValue): string {
  return toBeijingDate(value)?.toISOString().slice(5, 10) ?? ''
}

export function formatDateTime(value: TimeValue): string {
  return toBeijingDate(value)?.toISOString().slice(0, 19).replace('T', ' ') ?? ''
}

export function formatWeekday(value: TimeValue): string {
  const date = toBeijingDate(value)
  return date ? (WEEKDAYS[date.getUTCDay()] ?? '') : ''
}

export function beijingWeekdayIndex(value: TimeValue): number {
  const date = toBeijingDate(value)
  return date ? ((date.getUTCDay() + 6) % 7) + 1 : 0
}

export function beijingWeekKey(value: TimeValue): string {
  const date = toBeijingDate(value)
  if (!date) {
    return ''
  }
  const weekday = date.getUTCDay()
  date.setUTCDate(date.getUTCDate() - (weekday === 0 ? 6 : weekday - 1))
  return date.toISOString().slice(0, 10)
}

export function upcomingWorkingDays(count: number): WorkingDay[] {
  const cursor = new Date(Date.now() + BEIJING_OFFSET)
  cursor.setUTCHours(0, 0, 0, 0)

  const days: WorkingDay[] = []
  while (days.length < count) {
    const weekday = cursor.getUTCDay()
    if (weekday !== 0 && weekday !== 6) {
      days.push({
        timestamp: cursor.getTime() - BEIJING_OFFSET,
        day: cursor.getUTCDate(),
        weekday: WEEKDAYS[weekday] ?? '',
      })
    }
    cursor.setUTCDate(cursor.getUTCDate() + 1)
  }
  return days
}
