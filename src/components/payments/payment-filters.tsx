"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CalendarIcon, SearchIcon, X } from "lucide-react"

interface PaymentFiltersProps {
  onSearchChange: (search: string) => void
  onDateRangeChange: (dateFrom?: Date, dateTo?: Date) => void
  dateFrom?: Date
  dateTo?: Date
}

export function PaymentFilters({
  onSearchChange,
  onDateRangeChange,
  dateFrom,
  dateTo,
}: Readonly<PaymentFiltersProps>) {
  const [search, setSearch] = React.useState("")
  const [startDate, setStartDate] = React.useState("")
  const [endDate, setEndDate] = React.useState("")

  // Debounce search input
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(search)
    }, 300)

    return () => clearTimeout(timer)
  }, [search, onSearchChange])

  // Handle date range changes
  const handleDateRangeUpdate = React.useCallback(
    (newStartDate: string, newEndDate: string) => {
      const fromDate = newStartDate ? new Date(newStartDate) : undefined
      const toDate = newEndDate ? new Date(newEndDate) : undefined

      // Validate dates
      if (fromDate && isNaN(fromDate.getTime())) return
      if (toDate && isNaN(toDate.getTime())) return
      if (fromDate && toDate && fromDate > toDate) return

      onDateRangeChange(fromDate, toDate)
    },
    [onDateRangeChange]
  )

  // Update internal state when start date changes
  const handleStartDateChange = (value: string) => {
    setStartDate(value)
    handleDateRangeUpdate(value, endDate)
  }

  // Update internal state when end date changes
  const handleEndDateChange = (value: string) => {
    setEndDate(value)
    handleDateRangeUpdate(startDate, value)
  }

  // Clear date range filter
  const clearDateRange = () => {
    setStartDate("")
    setEndDate("")
    onDateRangeChange(undefined, undefined)
  }

  // Format date for input display
  const formatDateForInput = (date: Date): string => {
    return date.toISOString().split("T")[0]
  }

  // Initialize date inputs with current filter values
  React.useEffect(() => {
    if (dateFrom) {
      setStartDate(formatDateForInput(dateFrom))
    }
    if (dateTo) {
      setEndDate(formatDateForInput(dateTo))
    }
  }, [dateFrom, dateTo])

  const hasDateFilter = startDate || endDate

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
      {/* Search Input */}
      <div className="w-full sm:w-96">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-primary-400" />
          <Input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex items-center gap-2">
          <CalendarIcon className="size-4 text-primary-400" />
          <span className="text-sm font-medium text-slate-700">
            Rango de fechas:
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Input
            type="date"
            value={startDate}
            onChange={(e) => handleStartDateChange(e.target.value)}
            className="w-36 text-sm"
            placeholder="Fecha inicio"
          />
          <span className="text-slate-400">-</span>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => handleEndDateChange(e.target.value)}
            className="w-36 text-sm"
            placeholder="Fecha fin"
            min={startDate}
          />

          {hasDateFilter && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearDateRange}
              className="p-2 h-8 w-8"
            >
              <X className="size-3" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
