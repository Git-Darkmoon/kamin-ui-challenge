import { formatCompactCurrency } from "@/lib/utils/format"
import type { PaymentStats } from "@/types/payment"

interface PaymentStatsProps {
  stats: PaymentStats
}

export function PaymentStatsComponent({ stats }: Readonly<PaymentStatsProps>) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Balance Card */}
      <div className="bg-white rounded-lg p-4 border border-slate-200">
        <p className="text-sm text-slate-600 mb-1">Saldo en tu cuenta *64165</p>
        <p className="text-2xl font-semibold text-slate-900">
          {formatCompactCurrency(stats.balance)}
        </p>
      </div>

      {/* Total Pages Card */}
      <div className="bg-white rounded-lg p-4 border border-slate-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-3xl font-semibold text-slate-900">
            {stats.totalPages}
          </p>
          <p className="text-sm text-slate-600">Pagos este mes</p>
        </div>
      </div>

      {/* Total Paid Card */}
      <div className="bg-white rounded-lg p-4 border border-slate-200">
        <p className="text-sm text-slate-600 mb-1">Total pagado este mes</p>
        <p className="text-2xl font-semibold text-slate-900">
          {formatCompactCurrency(stats.totalPaid)}
        </p>
      </div>
    </div>
  )
}
