"use client"

import * as React from "react"
import { useActionState } from "react"
import { toast } from "sonner"
import type { ActionState } from "@/types/api"
import type { Payment } from "@/types/payment"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { SimplePaymentForm } from "./simple-payment-form"
import { createPaymentAction } from "@/lib/actions/payment-actions"

interface CreatePaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onPaymentCreated?: (payment: Payment) => void
}

export function CreatePaymentModal({
  open,
  onOpenChange,
  onPaymentCreated,
}: Readonly<CreatePaymentModalProps>) {
  const [state, formAction, isPending] = useActionState<
    ActionState<Payment> | null,
    FormData
  >(createPaymentAction, null)

  // Handle successful payment creation
  React.useEffect(() => {
    if (state?.success) {
      toast.success(state.message, {
        description: "Encuentra tu pago en la tabla",
      })

      // Call the callback with the new payment if provided
      if (onPaymentCreated && state.data) {
        onPaymentCreated(state.data)
      }

      onOpenChange(false)
    } else if (state?.success === false && state.message) {
      toast.error(state.message)
    }
  }, [state, onOpenChange, onPaymentCreated])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear transacción</DialogTitle>
          <DialogDescription>
            Completa los datos para continuar
          </DialogDescription>
        </DialogHeader>
        <SimplePaymentForm
          action={formAction}
          isPending={isPending}
          errors={state?.errors}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
