export const PAYMENT_STATUS_LABELS: Record<string, string> = {
  pending: "Pendiente",
  completed: "Completada",
  rejected: "Rechazado",
}

export const PAYMENT_STATUS_COLORS: Record<string, string> = {
  pending: "bg-orange-100 text-orange-700 border-orange-200",
  completed: "bg-green-100 text-green-700 border-green-200",
  rejected: "bg-red-100 text-red-700 border-red-200",
}

export const PAYMENT_SCHEME_LABELS: Record<string, string> = {
  limit: "Limit",
  credit: "Credit",
  wallet: "Wallet",
}

export const WALLET_OPTIONS = [
  { value: "provedores-pay", label: "Provedores Pay" },
  { value: "business-wallet", label: "Business Wallet" },
  { value: "corporate-funds", label: "Corporate Funds" },
]
