import { Suspense } from "react"
import { PaymentsList } from "@/components/payments/payments-list"
import { Skeleton } from "@/components/ui/skeleton"
import { paymentRepository } from "@/data/mock-payments"

// Enable Partial Pre-Rendering
export const experimental_ppr = true

async function PaymentsData() {
  const [payments, stats] = await Promise.all([
    paymentRepository.getPayments(),
    paymentRepository.getStats(),
  ])

  return <PaymentsList initialPayments={payments} stats={stats} />
}

function PaymentsLoading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-10 w-40" />
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 w-full rounded-lg" />
        ))}
      </div>

      {/* Filters Skeleton */}
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-10 w-96" />
        <Skeleton className="h-10 w-48" />
      </div>

      {/* Table Skeleton */}
      <div className="hidden md:block">
        <Skeleton className="h-96 w-full rounded-lg" />
      </div>

      {/* Mobile Cards Skeleton */}
      <div className="md:hidden flex gap-3 overflow-x-auto">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-64 min-w-70 rounded-lg" />
        ))}
      </div>
    </div>
  )
}

export default function PaymentsPage() {
  return (
    <Suspense fallback={<PaymentsLoading />}>
      <PaymentsData />
    </Suspense>
  )
}
