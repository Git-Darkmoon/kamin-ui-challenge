"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { CalendarIcon, SearchIcon } from "lucide-react"

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

      {/* Date Range Display */}
      {dateRange && (
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <CalendarIcon className="size-4 text-primary-400" />
          <span>{dateRange}</span>
        </div>
      )}
    </div>
  )
}
