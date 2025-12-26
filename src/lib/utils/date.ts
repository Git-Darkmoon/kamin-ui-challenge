import { format, isToday, isYesterday, formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"

export function formatDate(date: Date, formatStr = "PP"): string {
  return format(date, formatStr, { locale: es })
}

export function formatDateTime(date: Date): string {
  return format(date, "PPp", { locale: es })
}

export function formatRelativeDate(date: Date): string {
  if (isToday(date)) {
    return `Hoy, ${format(date, "p", { locale: es })}`
  }

  if (isYesterday(date)) {
    return `Ayer, ${format(date, "p", { locale: es })}`
  }

  return formatDistanceToNow(date, { locale: es, addSuffix: true })
}

export function formatShortDate(date: Date): string {
  return format(date, "MMM dd, yyyy", { locale: es })
}
