export type TimeValue = string | number | Date | null | undefined

const BEIJING_TZ = 'Asia/Shanghai'
const WEEKDAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

export interface WorkingDay {
  date: string
  day: number
  weekday: string
}

interface BeijingParts {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
}

const partsFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: BEIJING_TZ,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
})

function toBeijingParts(value: TimeValue): BeijingParts | null {
  if (value === null || value === undefined || value === '') {
    return null
  }
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) {
    return null
  }
  const parts = Object.fromEntries(partsFormatter.formatToParts(date).map(({ type, value: part }) => [type, part]))
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour),
    minute: Number(parts.minute),
    second: Number(parts.second),
  }
}

function weekdayIndex(parts: BeijingParts): number {
  return new Date(Date.UTC(parts.year, parts.month - 1, parts.day)).getUTCDay()
}

function pad(value: number): string {
  return String(value).padStart(2, '0')
}

export function formatDate(value: TimeValue): string {
  const parts = toBeijingParts(value)
  return parts ? `${parts.year}-${pad(parts.month)}-${pad(parts.day)}` : ''
}

export function formatMonthDay(value: TimeValue): string {
  const parts = toBeijingParts(value)
  return parts ? `${pad(parts.month)}-${pad(parts.day)}` : ''
}

export function formatDateTime(value: TimeValue): string {
  const parts = toBeijingParts(value)
  return parts
    ? `${parts.year}-${pad(parts.month)}-${pad(parts.day)} ${pad(parts.hour)}:${pad(parts.minute)}:${pad(parts.second)}`
    : ''
}

export function formatWeekday(value: TimeValue): string {
  const parts = toBeijingParts(value)
  return parts ? (WEEKDAYS[weekdayIndex(parts)] ?? '') : ''
}

export function beijingWeekdayIndex(value: TimeValue): number {
  const parts = toBeijingParts(value)
  return parts ? ((weekdayIndex(parts) + 6) % 7) + 1 : 0
}

export function beijingWeekKey(value: TimeValue): string {
  const parts = toBeijingParts(value)
  if (!parts) {
    return ''
  }
  const day = new Date(Date.UTC(parts.year, parts.month - 1, parts.day))
  const weekday = day.getUTCDay()
  day.setUTCDate(day.getUTCDate() - (weekday === 0 ? 6 : weekday - 1))
  return day.toISOString().slice(0, 10)
}

export function upcomingWorkingDays(count: number): WorkingDay[] {
  const today = toBeijingParts(new Date())
  if (!today) {
    return []
  }
  const cursor = new Date(Date.UTC(today.year, today.month - 1, today.day))

  const days: WorkingDay[] = []
  while (days.length < count) {
    const weekday = cursor.getUTCDay()
    if (weekday !== 0 && weekday !== 6) {
      days.push({
        date: cursor.toISOString().slice(0, 10),
        day: cursor.getUTCDate(),
        weekday: WEEKDAYS[weekday] ?? '',
      })
    }
    cursor.setUTCDate(cursor.getUTCDate() + 1)
  }
  return days
}
