"use client"

import * as React from "react"
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
      <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-3 flex items-start gap-2">
        <svg
          className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <p className="text-xs text-yellow-800">
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
