export type ToastVariant = 'info' | 'success' | 'warning' | 'error'

export interface ToastItem {
  id: number
  title: string
  description?: string
  variant: ToastVariant
}

let seed = 0

export function useToast() {
  const toasts = useState<ToastItem[]>('toasts', () => [])

  function show(item: Omit<ToastItem, 'id'>) {
    toasts.value.push({ ...item, id: ++seed })
  }

  function dismiss(id: number) {
    toasts.value = toasts.value.filter(toast => toast.id !== id)
  }

  return {
    toasts,
    show,
    dismiss,
    success: (title: string, description?: string) => show({ title, description, variant: 'success' }),
    error: (title: string, description?: string) => show({ title, description, variant: 'error' }),
    warning: (title: string, description?: string) => show({ title, description, variant: 'warning' }),
    info: (title: string, description?: string) => show({ title, description, variant: 'info' }),
  }
}
