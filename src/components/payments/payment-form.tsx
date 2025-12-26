"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  createPaymentSchema,
  type CreatePaymentFormData,
} from "@/lib/schemas/payment-schema"
import {
  WALLET_OPTIONS,
  PAYMENT_SCHEME_LABELS,
} from "@/lib/constants/payment-constants"
import { formatCurrency, parseAmount } from "@/lib/utils/format"
import { Select } from "../ui/select"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

interface PaymentFormProps {
  onSubmit: (data: CreatePaymentFormData) => void
  isPending: boolean
  errors?: Record<string, string[]>
}

export function PaymentForm({
  onSubmit,
  isPending,
  errors: serverErrors,
}: PaymentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CreatePaymentFormData>({
    resolver: zodResolver(createPaymentSchema),
    defaultValues: {
      scheme: "limit",
      wallet: "provedores-pay",
    },
  })

  const amountValue = watch("amount")
  const handleValue = watch("handle")

  // Format amount input
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const numericValue = parseAmount(value)
    setValue("amount", numericValue)
  }

  // Validate handle in real-time
  const isHandleValid =
    handleValue && !handleValue.match(/^[a-zA-Z0-9-_]+$/) === false

  const getError = (field: keyof CreatePaymentFormData) => {
    return errors[field]?.message || serverErrors?.[field]?.[0]
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Scheme Selection */}
      <div className="space-y-2">
        <label htmlFor="scheme" className="text-sm font-medium text-slate-700">
          Scheme
        </label>
        <Select
          id="scheme"
          {...register("scheme")}
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
          {...register("handle")}
          placeholder="Escribe el handle aquí"
          error={!!getError("handle")}
          disabled={isPending}
        />
        {getError("handle") && (
          <p className="text-xs text-red-600">{getError("handle")}</p>
        )}
        {!getError("handle") && handleValue && !isHandleValid && (
          <p className="text-xs text-red-600">
            Este handle no existe o está deshabilitado. Verifica la información
            nuevamente.
          </p>
        )}
      </div>

      {/* Amount Input */}
      <div className="space-y-2">
        <label htmlFor="amount" className="text-sm font-medium text-slate-700">
          Monto
        </label>
        <Input
          id="amount"
          type="text"
          {...register("amount", { valueAsNumber: true })}
          placeholder="$0.00"
          error={!!getError("amount")}
          disabled={isPending}
          onChange={handleAmountChange}
        />
        {getError("amount") && (
          <p className="text-xs text-red-600">{getError("amount")}</p>
        )}
        {amountValue && !getError("amount") && (
          <p className="text-xs text-slate-600">
            {formatCurrency(amountValue)}
          </p>
        )}
      </div>

      {/* Wallet Selection */}
      <div className="space-y-2">
        <label htmlFor="wallet" className="text-sm font-medium text-slate-700">
          Wallet
        </label>
        <Select
          id="wallet"
          {...register("wallet")}
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
          className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5"
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
        <Button type="button" variant="ghost" disabled={isPending}>
          Cancelar
        </Button>
        <Button
          type="submit"
          isLoading={isPending}
          disabled={isPending || !isHandleValid}
        >
          {isPending ? "Creando..." : "Crear interacción"}
        </Button>
      </div>
    </form>
  )
}
