"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"

interface PaymentFiltersProps {
  onSearchChange: (search: string) => void
  dateRange?: string
}

export function PaymentFilters({
  onSearchChange,
  dateRange,
}: Readonly<PaymentFiltersProps>) {
  const [search, setSearch] = React.useState("")

  // Debounce search input
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(search)
    }, 300)

    return () => clearTimeout(timer)
  }, [search, onSearchChange])

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      {/* Search Input */}
      <div className="w-full sm:w-96">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <Input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Date Range Display */}
      {dateRange && (
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{dateRange}</span>
        </div>
      )}
    </div>
  )
}
