"use client"

import { TriangleAlertIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Select } from "../ui/select"
import {
  PAYMENT_SCHEME_LABELS,
  WALLET_OPTIONS,
} from "@/lib/constants/payment-constants"

interface SimplePaymentFormProps {
  action: (formData: FormData) => void
  isPending: boolean
  errors?: Record<string, string[]>
  onCancel?: () => void
}

export function SimplePaymentForm({
  action,
  isPending,
  errors,
  onCancel,
}: Readonly<SimplePaymentFormProps>) {
  const getError = (field: string) => {
    return errors?.[field]?.[0]
  }

  return (
    <form action={action} className="space-y-4">
      {/* Scheme Selection */}
      <div className="space-y-2">
        <label htmlFor="scheme" className="text-sm font-medium text-slate-700">
          Scheme
        </label>
        <Select
          id="scheme"
          name="scheme"
          defaultValue="limit"
          error={!!getError("scheme")}
          disabled={isPending}
        >
          {Object.entries(PAYMENT_SCHEME_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
        {getError("scheme") && (
          <p className="text-xs text-red-600">{getError("scheme")}</p>
        )}
      </div>

      {/* Handle Input */}
      <div className="space-y-2">
        <label htmlFor="handle" className="text-sm font-medium text-slate-700">
          Handle
        </label>
        <Input
          id="handle"
          name="handle"
          placeholder="Escribe el handle aquí"
          error={!!getError("handle")}
          disabled={isPending}
          required
        />
        {getError("handle") && (
          <p className="text-xs text-red-600">{getError("handle")}</p>
        )}
      </div>

      {/* Amount Input */}
      <div className="space-y-2">
        <label htmlFor="amount" className="text-sm font-medium text-slate-700">
          Monto
        </label>
        <Input
          id="amount"
          name="amount"
          type="number"
          placeholder="50000"
          error={!!getError("amount")}
          disabled={isPending}
          required
          min="1"
          step="1"
        />
        {getError("amount") && (
          <p className="text-xs text-red-600">{getError("amount")}</p>
        )}
      </div>

      {/* Wallet Selection */}
      <div className="space-y-2">
        <label htmlFor="wallet" className="text-sm font-medium text-slate-700">
          Wallet
        </label>
        <Select
          id="wallet"
          name="wallet"
          defaultValue="provedores-pay"
          error={!!getError("wallet")}
          disabled={isPending}
        >
          {WALLET_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        {getError("wallet") && (
          <p className="text-xs text-red-600">{getError("wallet")}</p>
        )}
      </div>

      {/* Warning Message */}
      <div className="rounded-lg bg-primary-50 border border-primary-200 p-3 flex items-center gap-2">
        <TriangleAlertIcon className="size-8 rounded-full bg-amber-50 p-2 text-amber-700" />
        <p className="text-xs text-primary-800">
          Revisa bien los datos antes de crear la transacción.
        </p>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="ghost"
          disabled={isPending}
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button type="submit" isLoading={isPending} disabled={isPending}>
          {isPending ? "Creando..." : "Crear interacción"}
        </Button>
      </div>
    </form>
  )
}
