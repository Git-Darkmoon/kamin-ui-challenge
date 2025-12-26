export type PaymentStatus = "pending" | "completed" | "rejected"

export type PaymentScheme = "limit" | "credit" | "wallet"

export interface Payment {
  id: string
  identification: string
  recipient: string
  orderAmount: number
  currency: string
  createdAt: Date
  completedAt: Date
  status: PaymentStatus
  scheme: PaymentScheme
}

export interface PaymentFilters {
  search: string
  status?: PaymentStatus
  scheme?: PaymentScheme
  dateFrom?: Date
  dateTo?: Date
}

export interface PaymentStats {
  balance: number
  totalPages: number
  totalPaid: number
}

export interface CreatePaymentInput {
  scheme: PaymentScheme
  handle: string
  amount: number
  wallet: string
}
