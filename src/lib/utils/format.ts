export function formatCurrency(amount: number, currency = "COP"): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatCompactCurrency(
  amount: number,
  currency = "COP"
): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency,
    notation: "compact",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function parseAmount(value: string): number {
  const cleaned = value.replaceAll(/[^\d.-]/g, "")
  return Number.parseFloat(cleaned) || 0
}
