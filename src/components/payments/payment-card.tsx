import { formatCurrency } from "@/lib/utils/format"
import { formatShortDate } from "@/lib/utils/date"
import { Badge } from "@/components/ui/badge"
import { PAYMENT_STATUS_LABELS } from "@/lib/constants/payment-constants"
import type { Payment } from "@/types/payment"

interface PaymentCardProps {
  payment: Payment
}

export function PaymentCard({ payment }: Readonly<PaymentCardProps>) {
  const getStatusVariant = (status: Payment["status"]) => {
    switch (status) {
      case "completed":
        return "success"
      case "pending":
        return "warning"
      case "rejected":
        return "error"
      default:
        return "default"
    }
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 min-w-70 shrink-0 shadow-sm hover:shadow-md transition-shadow">
      {/* Header with ID and Status */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs text-slate-500 mb-1">Identificación</p>
          <p className="text-sm font-medium text-slate-900">
            {payment.identification}
          </p>
        </div>
        <Badge variant={getStatusVariant(payment.status)}>
          {PAYMENT_STATUS_LABELS[payment.status]}
        </Badge>
      </div>

      {/* Payment Details */}
      <div className="space-y-2">
        {/* Recipient */}
        <div>
          <p className="text-xs text-slate-500 mb-0.5">Lleva receptora</p>
          <p className="text-sm font-medium text-slate-900">
            {payment.recipient}
          </p>
        </div>

        {/* Amount */}
        <div>
          <p className="text-xs text-slate-500 mb-0.5">Order amount</p>
          <p className="text-sm font-semibold text-slate-900">
            {formatCurrency(payment.orderAmount, payment.currency)}
          </p>
        </div>

        {/* Dates */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div>
            <p className="text-xs text-slate-500 mb-0.5">Creado</p>
            <p className="text-xs text-slate-700">
              {formatShortDate(payment.createdAt)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-0.5">Completado</p>
            <p className="text-xs text-slate-700">
              {formatShortDate(payment.completedAt)}
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        type="button"
        className="mt-3 w-full flex items-center justify-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors py-2 rounded-md hover:bg-slate-50"
      >
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
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Ver detalles
      </button>
    </div>
  )
}
