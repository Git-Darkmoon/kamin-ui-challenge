import * as React from "react"
import { cn } from "@/lib/utils/cn"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error"
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-slate-100 text-slate-700 border-slate-200",
      success: "bg-green-100 text-green-700 border-green-200",
      warning: "bg-orange-100 text-orange-700 border-orange-200",
      error: "bg-red-100 text-red-700 border-red-200",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors",
          variants[variant],
          className
        )}
        {...props}
      />
    )
  }
)

Badge.displayName = "Badge"

export { Badge }
