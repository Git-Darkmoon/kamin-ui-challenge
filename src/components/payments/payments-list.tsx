"use client"

import { CreatePaymentModal } from "./create-payment-modal"
import type { Payment, PaymentStats } from "@/types/payment"
import { Button } from "../ui/button"
import { PaymentStatsComponent } from "./payment-stats"
import { PaymentFilters } from "./payment-filters"
import { PaymentsTable } from "./enhanced-payments-table"
import { formatShortDate } from "@/lib/utils/date"
import { useEffect, useMemo, useState } from "react"

interface PaymentsListProps {
  initialPayments: Payment[]
  stats: PaymentStats
}

type SortField = "orderAmount" | "createdAt" | "completedAt"
type SortOrder = "asc" | "desc" | "default"

export function PaymentsList({
  initialPayments,
  stats,
}: Readonly<PaymentsListProps>) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [payments, setPayments] = useState(initialPayments)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>("default")
  const itemsPerPage = 6

  // Calculate dynamic date range from payments
  const dateRange = useMemo(() => {
    if (payments.length === 0) return "No hay pagos"

    const dates = payments.map((p) => new Date(p.createdAt))
    const minDate = new Date(Math.min(...dates.map((d) => d.getTime())))
    const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())))

    return `${formatShortDate(minDate)} - ${formatShortDate(maxDate)}`
  }, [payments])

  // Sort all payments before filtering and pagination
  const sortedPayments = useMemo(() => {
    if (!sortField || sortOrder === "default") {
      return payments
    }

    return [...payments].sort((a, b) => {
      let aValue: any
      let bValue: any

      switch (sortField) {
        case "orderAmount":
          aValue = a.orderAmount
          bValue = b.orderAmount
          break
        case "createdAt":
          aValue = new Date(a.createdAt).getTime()
          bValue = new Date(b.createdAt).getTime()
          break
        case "completedAt":
          aValue = new Date(a.completedAt).getTime()
          bValue = new Date(b.completedAt).getTime()
          break
        default:
          return 0
      }

      if (sortOrder === "asc") {
        if (aValue < bValue) return -1
        if (aValue > bValue) return 1
        return 0
      } else {
        if (aValue > bValue) return -1
        if (aValue < bValue) return 1
        return 0
      }
    })
  }, [payments, sortField, sortOrder])

  // Filter payments based on search query
  const filteredPayments = useMemo(() => {
    let filtered = sortedPayments

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = payments.filter(
        (payment) =>
          payment.identification.toLowerCase().includes(query) ||
          payment.recipient.toLowerCase().includes(query) ||
          payment.status.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [payments, searchQuery])

  // Paginated payments for current page
  const paginatedPayments = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredPayments.slice(startIndex, endIndex)
  }, [filteredPayments, currentPage, itemsPerPage])

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage)

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  // Update payments when new one is created
  useEffect(() => {
    setPayments(initialPayments)
  }, [initialPayments])

  // Function to handle new payment creation
  const handlePaymentCreated = (newPayment: Payment) => {
    setPayments((prev) => [newPayment, ...prev])
    setCurrentPage(1) // Go to first page to show the new payment
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-primary-950">Pagos</h1>
        <Button className="bg-[#15393F]" onClick={() => setIsModalOpen(true)}>
          Crear transacción
        </Button>
      </div>

      <PaymentStatsComponent stats={stats} />

      <PaymentFilters onSearchChange={setSearchQuery} dateRange={dateRange} />

      {/* Responsive Table View */}
      {paginatedPayments.length > 0 ? (
        <PaymentsTable
          payments={paginatedPayments}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={(field) => {
            if (sortField === field) {
              // Cycle through: default -> asc -> desc -> default
              switch (sortOrder) {
                case "default":
                  setSortOrder("asc")
                  break
                case "asc":
                  setSortOrder("desc")
                  break
                case "desc":
                  setSortField(null)
                  setSortOrder("default")
                  break
              }
            } else {
              setSortField(field)
              setSortOrder("asc")
            }
            setCurrentPage(1) // Reset to first page when sorting
          }}
        />
      ) : (
        <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
          <p className="text-slate-600">No se encontraron pagos</p>
        </div>
      )}

      {/* Pagination */}
      {filteredPayments.length > 0 && (
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-slate-600">
            Mostrando {(currentPage - 1) * itemsPerPage + 1} a{" "}
            {Math.min(currentPage * itemsPerPage, filteredPayments.length)} de{" "}
            {filteredPayments.length} pagos
          </p>
          <div className="flex items-center gap-2 text-slate-600">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Anterior
            </Button>
            <span className="text-sm text-slate-600 px-3">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}

      {/* Create Payment Modal */}
      <CreatePaymentModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onPaymentCreated={handlePaymentCreated}
      />
    </div>
  )
}
