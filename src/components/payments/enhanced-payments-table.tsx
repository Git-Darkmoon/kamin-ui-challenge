"use client"

import * as React from "react"
import { Download, ChevronUp, ChevronDown, ArrowUpDown } from "lucide-react"
import jsPDF from "jspdf"
import { formatCurrency } from "@/lib/utils/format"
import { formatShortDate } from "@/lib/utils/date"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PAYMENT_STATUS_LABELS } from "@/lib/constants/payment-constants"
import type { Payment } from "@/types/payment"

interface PaymentsTableProps {
  payments: Payment[]
  sortField?: SortField | null
  sortOrder?: SortOrder
  onSort?: (field: SortField) => void
}

type SortField = "orderAmount" | "createdAt" | "completedAt"
type SortOrder = "asc" | "desc" | "default"

export function PaymentsTable({
  payments,
  sortField,
  sortOrder = "default",
  onSort,
}: Readonly<PaymentsTableProps>) {
  const getStatusVariant = (status: Payment["status"]) => {
    switch (status) {
      case "completed":
        return "success"
      case "pending":
        return "warning"
      case "rejected":
        return "error"
      default:
        return "default"
    }
  }

  const handleSort = (field: SortField) => {
    if (onSort) {
      onSort(field)
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-3 w-3 ml-1 text-slate-400" />
    }

    switch (sortOrder) {
      case "asc":
        return <ChevronUp className="h-3 w-3 ml-1 text-slate-600" />
      case "desc":
        return <ChevronDown className="h-3 w-3 ml-1 text-slate-600" />
      default:
        return <ArrowUpDown className="h-3 w-3 ml-1 text-slate-400" />
    }
  }

  const downloadInvoicePDF = (payment: Payment) => {
    const doc = new jsPDF()

    // Define color palette
    const colors = {
      primary: "#1e40af", // Blue-700
      secondary: "#64748b", // Slate-500
      accent: "#0f172a", // Slate-900
      light: "#f8fafc", // Slate-50
      success: "#059669", // Emerald-600
      warning: "#d97706", // Amber-600
      danger: "#dc2626", // Red-600
    }

    // Helper function to convert hex to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? {
            r: Number.parseInt(result[1], 16),
            g: Number.parseInt(result[2], 16),
            b: Number.parseInt(result[3], 16),
          }
        : null
    }

    // Page dimensions
    const pageWidth = 210
    const pageHeight = 297
    const margin = 20

    // === HEADER SECTION ===
    // Header background
    const headerColor = hexToRgb(colors.primary)
    if (headerColor) {
      doc.setFillColor(headerColor.r, headerColor.g, headerColor.b)
      doc.rect(0, 0, pageWidth, 45, "F")
    }

    // Company logo area (placeholder)
    doc.setFillColor(255, 255, 255)
    doc.rect(margin, 12, 25, 20, "F")
    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.text("LOGO", margin + 10, 23)

    // Company name and tagline
    doc.setFontSize(24)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(255, 255, 255)
    doc.text("KAMIN STUDIO", margin + 35, 22)

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text("Payment Platform Solutions", margin + 35, 30)

    // Invoice title
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(255, 255, 255)
    doc.text("FACTURA / INVOICE", pageWidth - margin - 50, 22)

    // Invoice number
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(`#${payment.identification}`, pageWidth - margin - 50, 30)

    // Reset color for body content
    doc.setTextColor(0, 0, 0)

    // === COMPANY INFO SECTION ===
    let currentY = 60

    // Company details box
    doc.setFillColor(248, 250, 252) // Light background
    doc.rect(margin, currentY, 85, 35, "F")
    doc.setDrawColor(200, 200, 200)
    doc.rect(margin, currentY, 85, 35, "S")

    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(30, 64, 175) // Primary color for headers
    doc.text("KAMIN STUDIO", margin + 5, currentY + 8)

    doc.setFontSize(9)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(100, 116, 139) // Secondary color
    doc.text("Plataforma de Pagos Corporativa", margin + 5, currentY + 15)
    doc.text("Email: payment.platform@kamin.studio", margin + 5, currentY + 22)
    doc.text("Tel: +57 (1) 234-5678", margin + 5, currentY + 29)

    // Client details box
    doc.setFillColor(248, 250, 252)
    doc.rect(pageWidth - margin - 85, currentY, 85, 35, "F")
    doc.setDrawColor(200, 200, 200)
    doc.rect(pageWidth - margin - 85, currentY, 85, 35, "S")

    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(30, 64, 175)
    doc.text("DESTINATARIO", pageWidth - margin - 80, currentY + 8)

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(15, 23, 42) // Accent color
    doc.text(payment.recipient, pageWidth - margin - 80, currentY + 18)

    doc.setFontSize(9)
    doc.setTextColor(100, 116, 139)
    doc.text(
      `Fecha: ${formatShortDate(payment.createdAt)}`,
      pageWidth - margin - 80,
      currentY + 25
    )

    currentY += 50

    // === PAYMENT DETAILS SECTION ===
    // Section header
    doc.setFillColor(30, 64, 175)
    doc.rect(margin, currentY, pageWidth - 2 * margin, 12, "F")

    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(255, 255, 255)
    doc.text("DETALLES DEL PAGO", margin + 5, currentY + 8)

    currentY += 20

    // Payment details table
    const tableData = [
      { label: "Número de Transacción", value: payment.identification },
      {
        label: "Monto",
        value: formatCurrency(payment.orderAmount, payment.currency),
      },
      { label: "Estado", value: PAYMENT_STATUS_LABELS[payment.status] },
      { label: "Método de Pago", value: payment.scheme.toUpperCase() },
      { label: "Fecha de Creación", value: formatShortDate(payment.createdAt) },
      {
        label: "Fecha de Finalización",
        value: formatShortDate(payment.completedAt),
      },
    ]

    // Table styling
    const rowHeight = 12
    const labelWidth = 70

    tableData.forEach((row, index) => {
      const y = currentY + index * rowHeight
      const isEvenRow = index % 2 === 0

      // Alternate row background
      if (isEvenRow) {
        doc.setFillColor(248, 250, 252)
        doc.rect(margin, y - 2, pageWidth - 2 * margin, rowHeight, "F")
      }

      // Label
      doc.setFontSize(9)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(100, 116, 139)
      doc.text(row.label + ":", margin + 5, y + 6)

      // Value
      doc.setFont("helvetica", "normal")
      doc.setTextColor(15, 23, 42)

      // Special styling for amount
      if (row.label === "Monto") {
        doc.setFontSize(11)
        doc.setFont("helvetica", "bold")
        doc.setTextColor(5, 150, 105) // Success color for amount
      }

      // Special styling for status
      if (row.label === "Estado") {
        let statusColor
        if (payment.status === "completed") {
          statusColor = hexToRgb(colors.success)
        } else if (payment.status === "pending") {
          statusColor = hexToRgb(colors.warning)
        } else {
          statusColor = hexToRgb(colors.danger)
        }

        if (statusColor) {
          doc.setTextColor(statusColor.r, statusColor.g, statusColor.b)
        }
        doc.setFont("helvetica", "bold")
      }

      doc.text(row.value, margin + labelWidth + 5, y + 6)

      // Reset formatting
      doc.setFontSize(9)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(15, 23, 42)
    })

    currentY += tableData.length * rowHeight + 25

    // === AMOUNT SUMMARY BOX ===
    // Summary box
    doc.setFillColor(5, 150, 105) // Success color
    doc.rect(pageWidth - margin - 80, currentY, 80, 25, "F")

    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(255, 255, 255)
    doc.text("TOTAL PAGADO", pageWidth - margin - 75, currentY + 8)

    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text(
      formatCurrency(payment.orderAmount, payment.currency),
      pageWidth - margin - 75,
      currentY + 18
    )

    // === FOOTER SECTION ===
    const footerY = pageHeight - 40

    // Footer line
    doc.setDrawColor(200, 200, 200)
    doc.line(margin, footerY, pageWidth - margin, footerY)

    // Footer content
    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(100, 116, 139)

    const footerText = [
      "Este documento ha sido generado automáticamente por el sistema de KAMIN STUDIO.",
      "Para consultas o soporte técnico, contacte: support@kamin.studio",
      `Documento generado el ${formatShortDate(
        new Date()
      )} a las ${new Date().toLocaleTimeString("es-ES")}`,
    ]

    footerText.forEach((text, index) => {
      doc.text(text, margin, footerY + 8 + index * 6)
    })

    // Security watermark
    doc.setFontSize(6)
    doc.setTextColor(200, 200, 200)
    doc.text(
      "DOCUMENTO OFICIAL - KAMIN STUDIO PAYMENT PLATFORM",
      pageWidth - margin - 60,
      footerY + 25
    )

    // QR Code placeholder (future enhancement)
    doc.setDrawColor(200, 200, 200)
    doc.rect(pageWidth - margin - 20, footerY + 5, 15, 15, "S")
    doc.setFontSize(6)
    doc.setTextColor(150, 150, 150)
    doc.text("QR", pageWidth - margin - 14, footerY + 13)

    // Download the professionally styled PDF
    doc.save(`Factura-${payment.identification}-KAMIN.pdf`)
  }

  return (
    <div
      className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm"
      data-testid="payments-table"
    >
      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Identificación
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                <button
                  onClick={() => handleSort("orderAmount")}
                  className="flex items-center hover:text-slate-900 transition-colors"
                >
                  Order Amount
                  {getSortIcon("orderAmount")}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Esquema
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                <button
                  onClick={() => handleSort("createdAt")}
                  className="flex items-center hover:text-slate-900 transition-colors"
                >
                  Fecha de Creación
                  {getSortIcon("createdAt")}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                <button
                  onClick={() => handleSort("completedAt")}
                  className="flex items-center hover:text-slate-900 transition-colors"
                >
                  Fecha de Finalización
                  {getSortIcon("completedAt")}
                </button>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {payments.map((payment) => (
              <tr
                key={payment.id}
                data-testid="payment-row"
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-mono text-slate-700">
                  {payment.identification}
                </td>
                <td className="px-6 py-4 text-sm text-slate-900">
                  {payment.recipient}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                  {formatCurrency(payment.orderAmount, payment.currency)}
                </td>
                <td className="px-6 py-4">
                  <Badge variant={getStatusVariant(payment.status)}>
                    {PAYMENT_STATUS_LABELS[payment.status]}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {payment.scheme}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {formatShortDate(payment.createdAt)}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {formatShortDate(payment.completedAt)}
                </td>
                <td className="px-6 py-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => downloadInvoicePDF(payment)}
                    className="text-slate-600 hover:text-slate-900"
                    data-testid="download-button"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="border-b border-slate-200 bg-slate-50">
          <div className="px-4 py-3">
            <h3 className="text-sm font-medium text-slate-900">
              Lista de Pagos
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              {payments.length} {payments.length === 1 ? "pago" : "pagos"}
            </p>
          </div>
        </div>
        <table className="w-full">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-slate-600 uppercase tracking-wider">
                Total transacciones
              </th>
              <th className="px-4 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {payments.map((payment) => (
              <tr
                key={payment.id}
                data-testid="payment-row-mobile"
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-4 py-4 text-sm">
                  <div>
                    <div className="font-medium text-slate-900">
                      {payment.recipient}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {payment.identification}
                    </div>
                    <div className="mt-1">
                      <Badge
                        variant={getStatusVariant(payment.status)}
                        className="text-xs"
                      >
                        {PAYMENT_STATUS_LABELS[payment.status]}
                      </Badge>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-right text-sm">
                  <div className="font-medium text-slate-900">
                    {formatCurrency(payment.orderAmount, payment.currency)}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {formatShortDate(payment.createdAt)}
                  </div>
                </td>
                <td className="px-4 py-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => downloadInvoicePDF(payment)}
                    className="text-slate-600 hover:text-slate-900 p-1 h-8 w-8"
                    data-testid="download-button"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {payments.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-400 text-sm">
            No hay pagos para mostrar
          </div>
        </div>
      )}
    </div>
  )
}
