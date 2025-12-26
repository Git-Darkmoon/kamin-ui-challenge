"use client"

import * as React from "react"
import { useActionState } from "react"
import { toast } from "sonner"
import type { CreatePaymentFormData } from "@/lib/schemas/payment-schema"
import type { ActionState } from "@/types/api"
import type { Payment } from "@/types/payment"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { PaymentForm } from "./payment-form"
import { createPaymentAction } from "@/lib/actions/payment-actions"

interface CreatePaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreatePaymentModal({
  open,
  onOpenChange,
}: Readonly<CreatePaymentModalProps>) {
  const [state, formAction, isPending] = useActionState<
    ActionState<Payment> | null,
    FormData
  >(createPaymentAction, null)

  const formRef = React.useRef<HTMLFormElement>(null)

  // Handle successful payment creation
  React.useEffect(() => {
    if (state?.success) {
      toast.success(state.message, {
        description: "Encuentra tu pago en la tabla",
      })
      onOpenChange(false)
      formRef.current?.reset()
    } else if (state?.success === false && state.message) {
      toast.error(state.message)
    }
  }, [state, onOpenChange])

  const handleFormSubmit = (data: CreatePaymentFormData) => {
    const formData = new FormData()
    formData.append("scheme", data.scheme)
    formData.append("handle", data.handle)
    formData.append("amount", data.amount.toString())
    formData.append("wallet", data.wallet)
    formAction(formData)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear transacción</DialogTitle>
          <DialogDescription>
            Completa los datos para continuar
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef}>
          <PaymentForm
            onSubmit={handleFormSubmit}
            isPending={isPending}
            errors={state?.errors}
          />
        </form>
      </DialogContent>
    </Dialog>
  )
}
