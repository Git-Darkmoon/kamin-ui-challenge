"use server"

import { revalidatePath } from "next/cache"
import { createPaymentSchema } from "@/lib/schemas/payment-schema"
import { paymentRepository } from "@/data/persistent-payments"
import type { ActionState } from "@/types/api"
import type { Payment } from "@/types/payment"

/**
 * Server action to create a new payment
 * Uses Next.js server actions with proper error handling
 * Compatible with useActionState hook
 *
 * @param prevState - Previous state from useActionState
 * @param formData - Form data from the client
 * @returns ActionState with success/error information
 */
export async function createPaymentAction(
  prevState: ActionState<Payment> | null,
  formData: FormData
): Promise<ActionState<Payment>> {
  try {
    // Extract and parse form data
    const rawData = {
      scheme: formData.get("scheme"),
      handle: formData.get("handle"),
      amount: formData.get("amount"),
      wallet: formData.get("wallet"),
    }

    // Convert amount to number
    const amountValue = rawData.amount ? Number(rawData.amount) : undefined

    // Validate with Zod schema
    const validationResult = createPaymentSchema.safeParse({
      scheme: rawData.scheme,
      handle: rawData.handle,
      amount: amountValue,
      wallet: rawData.wallet,
    })

    // Handle validation errors
    if (!validationResult.success) {
      const errors: Record<string, string[]> = {}

      for (const error of validationResult.error.issues) {
        const path = error.path.join(".")
        if (!errors[path]) {
          errors[path] = []
        }
        errors[path].push(error.message)
      }

      return {
        success: false,
        message: "Validation failed",
        errors,
      }
    }

    // Create payment through repository
    const payment = await paymentRepository.createPayment(validationResult.data)

    // Revalidate the payments page to show new data
    revalidatePath("/pagos")

    return {
      success: true,
      message: "Transacción creada con éxito",
      data: payment,
    }
  } catch (error) {
    console.error("Error creating payment:", error)

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Error al crear la transacción",
    }
  }
}

/**
 * Server action to fetch payments with filters
 * Demonstrates data fetching in server components
 */
export async function getPaymentsAction() {
  try {
    const payments = await paymentRepository.getPayments()
    return {
      success: true,
      message: "Payments fetched successfully",
      data: payments,
    }
  } catch (error) {
    console.error("Error searching payments:", error)

    return {
      success: false,
      message: "Error fetching payments",
    }
  }
}

/**
 * Server action to fetch payment statistics
 */
export async function getPaymentStatsAction() {
  try {
    const stats = await paymentRepository.getStats()
    return {
      success: true,
      message: "Stats fetched successfully",
      data: stats,
    }
  } catch (error) {
    console.error("Error searching payments:", error)

    return {
      success: false,
      message: "Error fetching stats",
    }
  }
}

/**
 * Server action to search payments
 */
export async function searchPaymentsAction(query: string) {
  try {
    const payments = await paymentRepository.searchPayments(query)
    return {
      success: true,
      message: "Search completed successfully",
      data: payments,
    }
  } catch (error) {
    console.error("Error searching payments:", error)
    return {
      success: false,
      message: "Error searching payments",
    }
  }
}
