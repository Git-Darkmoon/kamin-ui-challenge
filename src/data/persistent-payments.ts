import path from "node:path"
import type { Payment, PaymentStats } from "@/types/payment"

// In-memory storage for Vercel compatibility
// Note: Data will reset on server restart/deployment
let paymentsData: Payment[] = []
let statsData: PaymentStats | null = null

// Path to the JSON data file (kept for local development reference)
const DATA_DIR = path.join(process.cwd(), "data")
const PAYMENTS_FILE = path.join(DATA_DIR, "payments.json")
const STATS_FILE = path.join(DATA_DIR, "stats.json")

// Initial mock data with unique identifications and diverse dates
const INITIAL_PAYMENTS: Payment[] = [
  {
    id: "1",
    identification: "TX-2025-001-A7B9",
    recipient: "@matbaelo",
    orderAmount: 65000,
    currency: "COP",
    createdAt: new Date("2024-12-15T10:30:00"),
    completedAt: new Date("2024-12-15T11:00:00"),
    status: "pending",
    scheme: "limit",
  },
  {
    id: "2",
    identification: "TX-2025-002-K3M5",
    recipient: "@edugarcia",
    orderAmount: 95000,
    currency: "COP",
    createdAt: new Date("2024-12-10T09:15:00"),
    completedAt: new Date("2024-12-10T09:45:00"),
    status: "completed",
    scheme: "limit",
  },
  {
    id: "3",
    identification: "TX-2025-003-P8R2",
    recipient: "@samarahfelipez",
    orderAmount: 45000,
    currency: "COP",
    createdAt: new Date("2024-12-01T08:20:00"),
    completedAt: new Date("2024-12-01T08:50:00"),
    status: "completed",
    scheme: "limit",
  },
  {
    id: "4",
    identification: "TX-2025-004-L9N1",
    recipient: "@joenslegend",
    orderAmount: 125000,
    currency: "COP",
    createdAt: new Date("2024-11-28T07:45:00"),
    completedAt: new Date("2024-11-28T08:15:00"),
    status: "rejected",
    scheme: "limit",
  },
  {
    id: "5",
    identification: "TX-2025-005-Q4F7",
    recipient: "@jocolmerardz",
    orderAmount: 75000,
    currency: "COP",
    createdAt: new Date("2024-11-22T16:30:00"),
    completedAt: new Date("2024-11-22T17:00:00"),
    status: "completed",
    scheme: "limit",
  },
  {
    id: "6",
    identification: "TX-2025-006-X6T3",
    recipient: "@nullfran",
    orderAmount: 85000,
    currency: "COP",
    createdAt: new Date("2024-11-15T15:20:00"),
    completedAt: new Date("2024-11-15T15:50:00"),
    status: "completed",
    scheme: "limit",
  },
  {
    id: "7",
    identification: "TX-2025-007-B2H8",
    recipient: "@carlosmendez",
    orderAmount: 175000,
    currency: "COP",
    createdAt: new Date("2024-11-08T14:10:00"),
    completedAt: new Date("2024-11-08T14:40:00"),
    status: "completed",
    scheme: "credit",
  },
  {
    id: "8",
    identification: "TX-2025-008-W5G9",
    recipient: "@anarodriguez",
    orderAmount: 55000,
    currency: "COP",
    createdAt: new Date("2024-10-30T13:00:00"),
    completedAt: new Date("2024-10-30T13:30:00"),
    status: "pending",
    scheme: "wallet",
  },
  {
    id: "9",
    identification: "TX-2025-009-E1D4",
    recipient: "@luismartinez",
    orderAmount: 155000,
    currency: "COP",
    createdAt: new Date("2024-10-25T18:45:00"),
    completedAt: new Date("2024-10-25T19:15:00"),
    status: "completed",
    scheme: "limit",
  },
  {
    id: "10",
    identification: "TX-2025-010-V7C6",
    recipient: "@marialopez",
    orderAmount: 195000,
    currency: "COP",
    createdAt: new Date("2024-10-18T17:30:00"),
    completedAt: new Date("2024-10-18T18:00:00"),
    status: "rejected",
    scheme: "credit",
  },
  {
    id: "11",
    identification: "TX-2025-011-Z3J5",
    recipient: "@pedrosanchez",
    orderAmount: 220000,
    currency: "COP",
    createdAt: new Date("2024-10-12T16:00:00"),
    completedAt: new Date("2024-10-12T16:30:00"),
    status: "completed",
    scheme: "wallet",
  },
  {
    id: "12",
    identification: "TX-2025-012-M8U2",
    recipient: "@lauragonzalez",
    orderAmount: 35000,
    currency: "COP",
    createdAt: new Date("2024-10-05T14:20:00"),
    completedAt: new Date("2024-10-05T14:50:00"),
    status: "completed",
    scheme: "limit",
  },
  {
    id: "13",
    identification: "TX-2025-013-S4I7",
    recipient: "@diegoramirez",
    orderAmount: 180000,
    currency: "COP",
    createdAt: new Date("2024-09-28T18:00:00"),
    completedAt: new Date("2024-09-28T18:30:00"),
    status: "pending",
    scheme: "credit",
  },
  {
    id: "14",
    identification: "TX-2025-014-R9O1",
    recipient: "@sofiacastro",
    orderAmount: 105000,
    currency: "COP",
    createdAt: new Date("2024-09-20T16:45:00"),
    completedAt: new Date("2024-09-20T17:15:00"),
    status: "completed",
    scheme: "limit",
  },
  {
    id: "15",
    identification: "TX-2025-015-Y6A3",
    recipient: "@andresmejia",
    orderAmount: 270000,
    currency: "COP",
    createdAt: new Date("2024-09-15T15:30:00"),
    completedAt: new Date("2024-09-15T16:00:00"),
    status: "completed",
    scheme: "limit",
  },
]

const INITIAL_STATS: PaymentStats = {
  balance: 1250000,
  totalPages: 15,
  totalPaid: 980000,
}

// Initialize in-memory data
function initializeData() {
  if (paymentsData.length === 0) {
    paymentsData = [...INITIAL_PAYMENTS]
  }
  if (!statsData) {
    statsData = { ...INITIAL_STATS }
  }
}

// Generate unique identification for new payments
function generateUniqueIdentification(): string {
  const year = new Date().getFullYear()
  const timestamp = Date.now()
  const random = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `TX-${year}-${String(timestamp).slice(-3)}-${random}`
}

// No-op for in-memory storage
function ensureDataDir() {
  // Not needed for in-memory storage
}

// Read payments from in-memory storage
function readPayments(): Payment[] {
  initializeData()
  return paymentsData
}

// Write payments to in-memory storage
function writePayments(payments: Payment[]): void {
  paymentsData = [...payments]
}

// Read stats from in-memory storage
function readStats(): PaymentStats {
  initializeData()
  return statsData!
}

// Write stats to in-memory storage
function writeStats(stats: PaymentStats): void {
  statsData = { ...stats }
}

class PaymentRepository {
  /**
   * Get all payments from persistent storage
   */
  async getPayments(): Promise<Payment[]> {
    await this.delay(300)
    return readPayments()
  }

  /**
   * Get a single payment by ID
   */
  async getPaymentById(id: string): Promise<Payment | null> {
    await this.delay(200)
    const payments = readPayments()
    return payments.find((p) => p.id === id) || null
  }

  /**
   * Get payment statistics
   */
  async getStats(): Promise<PaymentStats> {
    await this.delay(100)
    return readStats()
  }

  /**
   * Create a new payment with persistent storage
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

    const payments = readPayments()
    const stats = readStats()

    // Ensure unique identification
    let identification: string
    let isUnique = false
    let attempts = 0

    do {
      identification = generateUniqueIdentification()
      isUnique = !payments.some((p) => p.identification === identification)
      attempts++
    } while (!isUnique && attempts < 100)

    if (!isUnique) {
      throw new Error("Could not generate unique identification")
    }

    const newPayment: Payment = {
      id: String(Date.now()),
      identification,
      recipient: data.handle.startsWith("@") ? data.handle : `@${data.handle}`,
      orderAmount: data.amount,
      currency: "COP",
      createdAt: new Date(),
      completedAt: new Date(),
      status: "pending",
      scheme: data.scheme as Payment["scheme"],
    }

    // Add to the beginning of the array (newest first)
    const updatedPayments = [newPayment, ...payments]

    // Update stats
    const updatedStats = {
      ...stats,
      balance: stats.balance - data.amount,
      totalPages: stats.totalPages + 1,
      totalPaid: stats.totalPaid + data.amount,
    }

    // Persist to in-memory storage
    writePayments(updatedPayments)
    writeStats(updatedStats)

    return newPayment
  }

  /**
   * Filter payments by search query
   */
  async searchPayments(query: string): Promise<Payment[]> {
    await this.delay(200)
    const payments = readPayments()

    if (!query.trim()) {
      return payments
    }

    const searchLower = query.toLowerCase()
    return payments.filter(
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
  async reset(): Promise<void> {
    writePayments(INITIAL_PAYMENTS)
    writeStats(INITIAL_STATS)
  }
}

// Export singleton instance
export const paymentRepository = new PaymentRepository()
