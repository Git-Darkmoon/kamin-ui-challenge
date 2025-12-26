"use client"

import * as React from "react"
import { CreatePaymentModal } from "./create-payment-modal"
import type { Payment, PaymentStats } from "@/types/payment"
import { Button } from "../ui/button"
import { PaymentStatsComponent } from "./payment-stats"
import { PaymentFilters } from "./payment-filters"
import { PaymentsTable } from "./payments-table"
import { PaymentCard } from "./payment-card"

interface PaymentsListProps {
  initialPayments: Payment[]
  stats: PaymentStats
}

export function PaymentsList({
  initialPayments,
  stats,
}: Readonly<PaymentsListProps>) {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [payments, setPayments] = React.useState(initialPayments)

  // Filter payments based on search query
  const filteredPayments = React.useMemo(() => {
    if (!searchQuery.trim()) return payments

    const query = searchQuery.toLowerCase()
    return payments.filter(
      (payment) =>
        payment.identification.toLowerCase().includes(query) ||
        payment.recipient.toLowerCase().includes(query) ||
        payment.status.toLowerCase().includes(query)
    )
  }, [payments, searchQuery])

  // Update payments when new one is created
  React.useEffect(() => {
    setPayments(initialPayments)
  }, [initialPayments])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Pagos</h1>
        <Button onClick={() => setIsModalOpen(true)}>Crear transacción</Button>
      </div>

      {/* Stats */}
      <PaymentStatsComponent stats={stats} />

      {/* Filters */}
      <PaymentFilters
        onSearchChange={setSearchQuery}
        dateRange="Sep 16, 2025 - Oct 15, 2025"
      />

      {/* Desktop Table View */}
      <div className="hidden md:block">
        {filteredPayments.length > 0 ? (
          <PaymentsTable payments={filteredPayments} />
        ) : (
          <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
            <p className="text-slate-600">No se encontraron pagos</p>
          </div>
        )}
      </div>

      {/* Mobile Card View with Horizontal Scroll */}
      <div className="md:hidden">
        <div className="pb-4">
          <h2 className="text-sm font-medium text-slate-700 mb-3">Pagos</h2>
          {filteredPayments.length > 0 ? (
            <div className="overflow-x-auto -mx-4 px-4">
              <div className="flex gap-3 pb-2">
                {filteredPayments.map((payment) => (
                  <PaymentCard key={payment.id} payment={payment} />
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
              <p className="text-slate-600 text-sm">No se encontraron pagos</p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-4">
        <p className="text-sm text-slate-600">
          Page 1 of {Math.ceil(stats.totalPages / 10)}
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>

      {/* Create Payment Modal */}
      <CreatePaymentModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  )
}
