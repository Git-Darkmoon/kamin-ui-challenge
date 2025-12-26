import type { Payment, PaymentStats } from "@/types/payment"

export const MOCK_PAYMENTS: Payment[] = [
  {
    id: "1",
    identification: "SOxFQx5_OYff9qC",
    recipient: "@matbaelo",
    orderAmount: 65000,
    currency: "COP",
    createdAt: new Date("2025-01-13T10:30:00"),
    completedAt: new Date("2025-01-13T11:00:00"),
    status: "pending",
    scheme: "limit",
  },
  {
    id: "2",
    identification: "SOxFQx5_OYff9qC",
    recipient: "@edugarcia",
    orderAmount: 65000,
    currency: "COP",
    createdAt: new Date("2025-01-13T09:15:00"),
    completedAt: new Date("2025-01-13T09:45:00"),
    status: "completed",
    scheme: "limit",
  },
  {
    id: "3",
    identification: "SOxFQx5_OYff9qC",
    recipient: "@samarahfelipez",
    orderAmount: 65000,
    currency: "COP",
    createdAt: new Date("2025-01-13T08:20:00"),
    completedAt: new Date("2025-01-13T08:50:00"),
    status: "completed",
    scheme: "limit",
  },
  {
    id: "4",
    identification: "SOxFQx5_OYff9qC",
    recipient: "@joenslegend",
    orderAmount: 65000,
    currency: "COP",
    createdAt: new Date("2025-01-13T07:45:00"),
    completedAt: new Date("2025-01-13T08:15:00"),
    status: "rejected",
    scheme: "limit",
  },
  {
    id: "5",
    identification: "SOxFQx5_OYff9qC",
    recipient: "@jocolmerardz",
    orderAmount: 65000,
    currency: "COP",
    createdAt: new Date("2025-01-12T16:30:00"),
    completedAt: new Date("2025-01-12T17:00:00"),
    status: "completed",
    scheme: "limit",
  },
  {
    id: "6",
    identification: "SOxFQx5_OYff9qC",
    recipient: "@nullfran",
    orderAmount: 65000,
    currency: "COP",
    createdAt: new Date("2025-01-12T15:20:00"),
    completedAt: new Date("2025-01-12T15:50:00"),
    status: "completed",
    scheme: "limit",
  },
  {
    id: "7",
    identification: "SOxFQx5_OYff9qC",
    recipient: "@carlosmendez",
    orderAmount: 75000,
    currency: "COP",
    createdAt: new Date("2025-01-12T14:10:00"),
    completedAt: new Date("2025-01-12T14:40:00"),
    status: "completed",
    scheme: "credit",
  },
  {
    id: "8",
    identification: "SOxFQx5_OYff9qC",
    recipient: "@anarodriguez",
    orderAmount: 85000,
    currency: "COP",
    createdAt: new Date("2025-01-12T13:00:00"),
    completedAt: new Date("2025-01-12T13:30:00"),
    status: "pending",
    scheme: "wallet",
  },
  {
    id: "9",
    identification: "SOxFQx5_OYff9qC",
    recipient: "@luismartinez",
    orderAmount: 55000,
    currency: "COP",
    createdAt: new Date("2025-01-11T18:45:00"),
    completedAt: new Date("2025-01-11T19:15:00"),
    status: "completed",
    scheme: "limit",
  },
  {
    id: "10",
    identification: "SOxFQx5_OYff9qC",
    recipient: "@marialopez",
    orderAmount: 95000,
    currency: "COP",
    createdAt: new Date("2025-01-11T17:30:00"),
    completedAt: new Date("2025-01-11T18:00:00"),
    status: "rejected",
    scheme: "credit",
  },
  {
    id: "11",
    identification: "SOxFQx5_OYff9qC",
    recipient: "@pedrosanchez",
    orderAmount: 120000,
    currency: "COP",
    createdAt: new Date("2025-01-11T16:00:00"),
    completedAt: new Date("2025-01-11T16:30:00"),
    status: "completed",
    scheme: "wallet",
  },
  {
    id: "12",
    identification: "SOxFQx5_OYff9qC",
    recipient: "@lauragonzalez",
    orderAmount: 45000,
    currency: "COP",
    createdAt: new Date("2025-01-11T14:20:00"),
    completedAt: new Date("2025-01-11T14:50:00"),
    status: "completed",
    scheme: "limit",
  },
  {
    id: "13",
    identification: "SOxFQx5_OYff9qC",
    recipient: "@diegoramirez",
    orderAmount: 80000,
    currency: "COP",
    createdAt: new Date("2025-01-10T18:00:00"),
    completedAt: new Date("2025-01-10T18:30:00"),
    status: "pending",
    scheme: "credit",
  },
  {
    id: "14",
    identification: "SOxFQx5_OYff9qC",
    recipient: "@sofiacastro",
    orderAmount: 65000,
    currency: "COP",
    createdAt: new Date("2025-01-10T16:45:00"),
    completedAt: new Date("2025-01-10T17:15:00"),
    status: "completed",
    scheme: "limit",
  },
  {
    id: "15",
    identification: "SOxFQx5_OYff9qC",
    recipient: "@andresmora",
    orderAmount: 90000,
    currency: "COP",
    createdAt: new Date("2025-01-10T15:30:00"),
    completedAt: new Date("2025-01-10T16:00:00"),
    status: "rejected",
    scheme: "wallet",
  },
]

export const MOCK_STATS: PaymentStats = {
  balance: 23421350,
  totalPages: 15,
  totalPaid: 6026800,
}

// ============================================================================
// Repository Pattern - Data Access Layer
// ============================================================================

class PaymentRepository {
  private payments: Payment[] = [...MOCK_PAYMENTS]
  private stats: PaymentStats = { ...MOCK_STATS }

  /**
   * Get all payments
   */
  async getPayments(): Promise<Payment[]> {
    // Simulate network delay
    await this.delay(300)
    return [...this.payments]
  }

  /**
   * Get a single payment by ID
   */
  async getPaymentById(id: string): Promise<Payment | null> {
    await this.delay(200)
    return this.payments.find((p) => p.id === id) || null
  }

  /**
   * Get payment statistics
   */
  async getStats(): Promise<PaymentStats> {
    await this.delay(100)
    return { ...this.stats }
  }

  /**
   * Create a new payment
   */
  async createPayment(data: {
    scheme: string
    handle: string
    amount: number
    wallet: string
  }): Promise<Payment> {
    await this.delay(1000) // Simulate API call

    // Simulate random errors for testing (10% failure rate)
    if (Math.random() < 0.1) {
      throw new Error("Network error: Could not create payment")
    }

    const newPayment: Payment = {
      id: `${Date.now()}`,
      identification: "SOxFQx5_OYff9qC",
      recipient: data.handle.startsWith("@") ? data.handle : `@${data.handle}`,
      orderAmount: data.amount,
      currency: "COP",
      createdAt: new Date(),
      completedAt: new Date(),
      status: "pending",
      scheme: data.scheme as Payment["scheme"],
    }

    // Add to the beginning of the array (newest first)
    this.payments = [newPayment, ...this.payments]

    // Update stats
    this.stats = {
      ...this.stats,
      balance: this.stats.balance - data.amount,
      totalPages: this.stats.totalPages + 1,
      totalPaid: this.stats.totalPaid + data.amount,
    }

    return newPayment
  }

  /**
   * Filter payments by search query
   */
  async searchPayments(query: string): Promise<Payment[]> {
    await this.delay(200)

    if (!query.trim()) {
      return [...this.payments]
    }

    const searchLower = query.toLowerCase()
    return this.payments.filter(
      (payment) =>
        payment.identification.toLowerCase().includes(searchLower) ||
        payment.recipient.toLowerCase().includes(searchLower) ||
        payment.status.toLowerCase().includes(searchLower) ||
        payment.scheme.toLowerCase().includes(searchLower)
    )
  }

  /**
   * Simulate network delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  /**
   * Reset data to initial state (useful for testing)
   */
  reset(): void {
    this.payments = [...MOCK_PAYMENTS]
    this.stats = { ...MOCK_STATS }
  }
}

// Export singleton instance
export const paymentRepository = new PaymentRepository()
