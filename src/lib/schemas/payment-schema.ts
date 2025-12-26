import { z } from "zod"

export const createPaymentSchema = z.object({
  scheme: z.enum(["limit", "credit", "wallet"], {
    message: "Invalid scheme",
  }),
  handle: z
    .string()
    .min(1, "Handle is required")
    .regex(
      /^[a-zA-Z0-9-_]+$/,
      "Handle must contain only letters, numbers, hyphens and underscores"
    ),
  amount: z
    .number({
      error: "Amount must be a valid number",
    })
    .positive("Amount must be greater than 0")
    .max(1000000000, "Amount is too large"),
  wallet: z.string().min(1, "Wallet is required"),
})

export type CreatePaymentFormData = z.infer<typeof createPaymentSchema>
