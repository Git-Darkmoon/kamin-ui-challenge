import { formatCurrency } from "@/lib/utils/format"
import type { PaymentStats } from "@/types/payment"

interface PaymentStatsProps {
  stats: PaymentStats
}

export function PaymentStatsComponent({ stats }: Readonly<PaymentStatsProps>) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Balance Card */}
      <div className="bg-white rounded-lg p-4 border border-primary-200">
        <p className="text-2xl font-semibold tracking-tighter text-primary-900">
          {formatCurrency(stats.balance)}
        </p>
        <p className="text-sm text-primary-600 mb-1">
          Saldo en tu cuenta *6416
        </p>
      </div>

      {/* Total Pages Card */}
      <div className="bg-white rounded-lg p-4 border border-primary-200">
        <div>
          <p className="text-3xl font-semibold tracking-tighter text-primary-900">
            {stats.totalPages}
          </p>
          <p className="text-sm text-primary-600">Pagos este mes</p>
        </div>
      </div>

      {/* Total Paid Card */}
      <div className="bg-white rounded-lg p-4 border border-primary-200">
        <p className="text-2xl font-semibold tracking-tighter text-primary-900">
          {formatCurrency(stats.totalPaid)}
        </p>
        <p className="text-sm text-primary-600 mb-1">Total pagado este mes</p>
      </div>
    </div>
  )
}
