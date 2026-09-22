export function errorText(error: unknown, fallback: string): string {
  const message = (error as { data?: { message?: unknown } })?.data?.message
  return typeof message === 'string' && message.length > 0 ? message : fallback
}
