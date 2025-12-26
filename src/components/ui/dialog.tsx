"use client"

import * as React from "react"
import { cn } from "@/lib/utils/cn"

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

function Dialog({ open, onOpenChange, children }: Readonly<DialogProps>) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50 w-full max-w-lg">{children}</div>
    </div>
  )
}

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {}

function DialogContent({ className, children, ...props }: DialogContentProps) {
  return (
    <div
      className={cn("mx-4 rounded-xl bg-white p-6 shadow-xl", className)}
      {...props}
    >
      {children}
    </div>
  )
}

interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-1.5 text-center sm:text-left",
        className
      )}
      {...props}
    />
  )
}

interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

function DialogTitle({ className, children, ...props }: DialogTitleProps) {
  return (
    <h2
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  )
}

interface DialogDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return <p className={cn("text-sm text-slate-600", className)} {...props} />
}

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription }
