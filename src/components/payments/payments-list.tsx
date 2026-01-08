"use client"

import { CreatePaymentModal } from "./create-payment-modal"
import type { Payment, PaymentStats } from "@/types/payment"
import { Button } from "../ui/button"
import { PaymentStatsComponent } from "./payment-stats"
import { PaymentFilters } from "./payment-filters"
import { PaymentsTable } from "./enhanced-payments-table"
import { useEffect, useMemo, useState, useCallback } from "react"

interface PaymentsListProps {
  initialPayments: Payment[]
  stats: PaymentStats
}

type SortField = "orderAmount" | "createdAt" | "completedAt"
type SortOrder = "asc" | "desc" | "default"

export function PaymentsList({
  initialPayments,
  stats: initialStats,
}: Readonly<PaymentsListProps>) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [payments, setPayments] = useState(
    Array.isArray(initialPayments) ? initialPayments : []
  )
  const [stats, setStats] = useState(initialStats)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>("default")
  const [dateFrom, setDateFrom] = useState<Date | undefined>()
  const [dateTo, setDateTo] = useState<Date | undefined>()
  const itemsPerPage = 6

  // Sort all payments before filtering and pagination
  const sortedPayments = useMemo(() => {
    if (!payments || !Array.isArray(payments)) {
      return []
    }

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

  // Filter payments based on search query and date range
  const filteredPayments = useMemo(() => {
    if (!sortedPayments || !Array.isArray(sortedPayments)) {
      return []
    }

    let filtered = sortedPayments

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (payment) =>
          payment.identification.toLowerCase().includes(query) ||
          payment.recipient.toLowerCase().includes(query) ||
          payment.status.toLowerCase().includes(query)
      )
    }

    // Apply date range filter
    if (dateFrom || dateTo) {
      filtered = filtered.filter((payment) => {
        const paymentDate = new Date(payment.createdAt)
        const paymentDateOnly = new Date(
          paymentDate.getFullYear(),
          paymentDate.getMonth(),
          paymentDate.getDate()
        )

        if (dateFrom) {
          const fromDateOnly = new Date(
            dateFrom.getFullYear(),
            dateFrom.getMonth(),
            dateFrom.getDate()
          )
          if (paymentDateOnly < fromDateOnly) return false
        }

        if (dateTo) {
          const toDateOnly = new Date(
            dateTo.getFullYear(),
            dateTo.getMonth(),
            dateTo.getDate()
          )
          if (paymentDateOnly > toDateOnly) return false
        }

        return true
      })
    }

    return filtered
  }, [sortedPayments, searchQuery, dateFrom, dateTo])

  // Paginated payments for current page
  const paginatedPayments = useMemo(() => {
    if (!filteredPayments || !Array.isArray(filteredPayments)) {
      return []
    }

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredPayments.slice(startIndex, endIndex)
  }, [filteredPayments, currentPage, itemsPerPage])

  const totalPages = Math.ceil((filteredPayments?.length || 0) / itemsPerPage)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, dateFrom, dateTo])

  // Handle date range filter changes
  const handleDateRangeChange = (newDateFrom?: Date, newDateTo?: Date) => {
    setDateFrom(newDateFrom)
    setDateTo(newDateTo)
  }

  // Function to fetch fresh data from API
  const refreshData = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/payments", {
        cache: "no-store",
      })

      if (response.ok) {
        const { data } = await response.json()
        setPayments(Array.isArray(data?.payments) ? data.payments : [])
        setStats(data?.stats || { balance: 0, totalPages: 0, totalPaid: 0 })
      }
    } catch (error) {
      console.error("Error refreshing data:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Update payments when initial data changes
  useEffect(() => {
    setPayments(Array.isArray(initialPayments) ? initialPayments : [])
    setStats(initialStats || { balance: 0, totalPages: 0, totalPaid: 0 })
  }, [initialPayments, initialStats])

  // Function to handle new payment creation
  const handlePaymentCreated = async (newPayment: Payment) => {
    // Refresh data from API to ensure consistency
    await refreshData()
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

      <PaymentFilters
        onSearchChange={setSearchQuery}
        onDateRangeChange={handleDateRangeChange}
        dateFrom={dateFrom}
        dateTo={dateTo}
      />

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
