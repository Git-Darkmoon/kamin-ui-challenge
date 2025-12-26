import { formatCurrency } from "@/lib/utils/format"
import { formatShortDate } from "@/lib/utils/date"
import { Badge } from "@/components/ui/badge"
import { PAYMENT_STATUS_LABELS } from "@/lib/constants/payment-constants"
import type { Payment } from "@/types/payment"

interface PaymentsTableProps {
  payments: Payment[]
}

export function PaymentsTable({ payments }: Readonly<PaymentsTableProps>) {
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
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Identificación
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Lleva receptora
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Order amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Creado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Completado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  {payment.identification}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {payment.recipient}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  {formatCurrency(payment.orderAmount, payment.currency)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {formatShortDate(payment.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {formatShortDate(payment.completedAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={getStatusVariant(payment.status)}>
                    {PAYMENT_STATUS_LABELS[payment.status]}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button
                    type="button"
                    className="text-slate-600 hover:text-slate-900 transition-colors p-1 rounded hover:bg-slate-100"
                    aria-label="Ver detalles del pago"
                  >
                    <svg
                      className="h-5 w-5"
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
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {payments.length === 0 && (
        <div className="py-12 text-center">
          <svg
            className="mx-auto h-12 w-12 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-slate-900">
            No hay pagos
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            No se encontraron pagos que coincidan con tu búsqueda.
          </p>
        </div>
      )}
    </div>
  )
}
