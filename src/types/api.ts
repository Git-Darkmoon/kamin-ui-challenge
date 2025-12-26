export interface ActionState<T = unknown> {
  success: boolean
  message: string
  data?: T
  errors?: Record<string, string[]>
}

export type AsyncActionState<T = unknown> =
  | { status: "idle" }
  | { status: "pending" }
  | { status: "success"; data: T; message: string }
  | { status: "error"; message: string; errors?: Record<string, string[]> }
