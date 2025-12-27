"use client"

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
      return <ArrowUpDown className="size-4 ml-1 text-primary-500" />
    }

    switch (sortOrder) {
      case "asc":
        return <ChevronUp className="size-4 ml-1 text-primary-500" />
      case "desc":
        return <ChevronDown className="size-4 ml-1 text-primary-500" />
      default:
        return <ArrowUpDown className="size-4 ml-1 text-primary-500" />
    }
  }

  const downloadInvoicePDF = (payment: Payment) => {
    const doc = new jsPDF()

    // Define color palette based on CSS theme
    const colors = {
      // Primary palette
      primary: "#1a3a41", // Approximate hex for oklch(32.122% 0.0422 210.019)
      primary50: "#f7f9fa",
      primary100: "#eff3f4",
      primary200: "#dae6e9",
      primary300: "#c5d9de",
      primary400: "#9cc2cb",
      primary500: "#6fa7b3",
      primary600: "#4a8694",
      primary700: "#376570",
      primary800: "#1a3a41",
      primary900: "#142e33",
      primary950: "#0f2328",
      // Neutrals
      neutral50: "#f9fafa",
      neutral100: "#f3f4f4",
      neutral200: "#e7e8e9",
      neutral300: "#d4d6d7",
      neutral400: "#a8acae",
      neutral500: "#7c8285",
      neutral600: "#64696c",
      neutral700: "#515659",
      neutral800: "#3e4245",
      neutral900: "#2b2f32",
      neutral950: "#1d2125",
      // Status colors
      success: "#059669",
      warning: "#d97706",
      danger: "#dc2626",
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
    const headerColor = hexToRgb(colors.primary800)
    if (headerColor) {
      doc.setFillColor(headerColor.r, headerColor.g, headerColor.b)
      doc.rect(0, 0, pageWidth, 45, "F")
    }

    // Company logo - Load SVG logo
    const logoUrl = "/logomark.png"
    // Create a white background circle for logo visibility
    doc.setFillColor(255, 255, 255)
    doc.circle(margin + 12.5, 22, 10, "F")

    // Logo container with subtle border
    const logoContainerColor = hexToRgb(colors.primary600)
    if (logoContainerColor) {
      doc.setDrawColor(
        logoContainerColor.r,
        logoContainerColor.g,
        logoContainerColor.b
      )
      doc.setLineWidth(0.5)
      doc.circle(margin + 12.5, 22, 10, "S")
    }

    // Center the logo within the circle (15x15 logo centered in 20x20 circle)
    doc.setFontSize(7)
    doc.setTextColor(100, 100, 100)
    doc.addImage(logoUrl, "PNG", margin + 5, 14.5, 15, 15)

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
    const companyBgColor = hexToRgb(colors.primary50)
    if (companyBgColor) {
      doc.setFillColor(companyBgColor.r, companyBgColor.g, companyBgColor.b)
    }
    doc.rect(margin, currentY, 85, 35, "F")
    const companyBorderColor = hexToRgb(colors.primary200)
    if (companyBorderColor) {
      doc.setDrawColor(
        companyBorderColor.r,
        companyBorderColor.g,
        companyBorderColor.b
      )
    }
    doc.rect(margin, currentY, 85, 35, "S")

    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    const companyNameColor = hexToRgb(colors.primary700)
    if (companyNameColor) {
      doc.setTextColor(
        companyNameColor.r,
        companyNameColor.g,
        companyNameColor.b
      )
    }
    doc.text("KAMIN STUDIO", margin + 5, currentY + 8)

    doc.setFontSize(9)
    doc.setFont("helvetica", "normal")
    const companyTextColor = hexToRgb(colors.neutral600)
    if (companyTextColor) {
      doc.setTextColor(
        companyTextColor.r,
        companyTextColor.g,
        companyTextColor.b
      )
    }
    doc.text("Plataforma de Pagos Corporativa", margin + 5, currentY + 15)
    doc.text("Email: payment.platform@kamin.studio", margin + 5, currentY + 22)
    doc.text("Tel: +57 (1) 234-5678", margin + 5, currentY + 29)

    // Client details box
    const clientBgColor = hexToRgb(colors.primary50)
    if (clientBgColor) {
      doc.setFillColor(clientBgColor.r, clientBgColor.g, clientBgColor.b)
    }
    doc.rect(pageWidth - margin - 85, currentY, 85, 35, "F")
    const clientBorderColor = hexToRgb(colors.primary200)
    if (clientBorderColor) {
      doc.setDrawColor(
        clientBorderColor.r,
        clientBorderColor.g,
        clientBorderColor.b
      )
    }
    doc.rect(pageWidth - margin - 85, currentY, 85, 35, "S")

    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    const clientHeaderColor = hexToRgb(colors.primary700)
    if (clientHeaderColor) {
      doc.setTextColor(
        clientHeaderColor.r,
        clientHeaderColor.g,
        clientHeaderColor.b
      )
    }
    doc.text("DESTINATARIO", pageWidth - margin - 80, currentY + 8)

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    const clientNameColor = hexToRgb(colors.neutral800)
    if (clientNameColor) {
      doc.setTextColor(clientNameColor.r, clientNameColor.g, clientNameColor.b)
    }
    doc.text(payment.recipient, pageWidth - margin - 80, currentY + 18)

    doc.setFontSize(9)
    const clientDateColor = hexToRgb(colors.neutral600)
    if (clientDateColor) {
      doc.setTextColor(clientDateColor.r, clientDateColor.g, clientDateColor.b)
    }
    doc.text(
      `Fecha: ${formatShortDate(payment.createdAt)}`,
      pageWidth - margin - 80,
      currentY + 25
    )

    currentY += 50

    // === PAYMENT DETAILS SECTION ===
    // Section header
    const sectionHeaderColor = hexToRgb(colors.primary700)
    if (sectionHeaderColor) {
      doc.setFillColor(
        sectionHeaderColor.r,
        sectionHeaderColor.g,
        sectionHeaderColor.b
      )
    }
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
        const rowBgColor = hexToRgb(colors.neutral50)
        if (rowBgColor) {
          doc.setFillColor(rowBgColor.r, rowBgColor.g, rowBgColor.b)
        }
        doc.rect(margin, y - 2, pageWidth - 2 * margin, rowHeight, "F")
      }

      // Label
      doc.setFontSize(9)
      doc.setFont("helvetica", "bold")
      const labelColor = hexToRgb(colors.neutral600)
      if (labelColor) {
        doc.setTextColor(labelColor.r, labelColor.g, labelColor.b)
      }
      doc.text(row.label + ":", margin + 5, y + 6)

      // Value
      doc.setFont("helvetica", "normal")
      const valueColor = hexToRgb(colors.neutral800)
      if (valueColor) {
        doc.setTextColor(valueColor.r, valueColor.g, valueColor.b)
      }

      // Special styling for amount
      if (row.label === "Monto") {
        doc.setFontSize(11)
        doc.setFont("helvetica", "bold")
        const amountColor = hexToRgb(colors.success)
        if (amountColor) {
          doc.setTextColor(amountColor.r, amountColor.g, amountColor.b)
        }
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
      const resetColor = hexToRgb(colors.neutral800)
      if (resetColor) {
        doc.setTextColor(resetColor.r, resetColor.g, resetColor.b)
      }
    })

    currentY += tableData.length * rowHeight + 25

    // === AMOUNT SUMMARY BOX ===
    // Summary box
    const summaryColor = hexToRgb(colors.success)
    if (summaryColor) {
      doc.setFillColor(summaryColor.r, summaryColor.g, summaryColor.b)
    }
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
    const footerLineColor = hexToRgb(colors.primary200)
    if (footerLineColor) {
      doc.setDrawColor(footerLineColor.r, footerLineColor.g, footerLineColor.b)
    }
    doc.line(margin, footerY, pageWidth - margin, footerY)

    // Footer content
    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    const footerTextColor = hexToRgb(colors.neutral600)
    if (footerTextColor) {
      doc.setTextColor(footerTextColor.r, footerTextColor.g, footerTextColor.b)
    }

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
    const watermarkColor = hexToRgb(colors.neutral300)
    if (watermarkColor) {
      doc.setTextColor(watermarkColor.r, watermarkColor.g, watermarkColor.b)
    }
    doc.text(
      "DOCUMENTO OFICIAL - KAMIN STUDIO PAYMENT PLATFORM",
      pageWidth - margin - 60,
      footerY + 25
    )

    // QR Code placeholder (future enhancement)
    const qrColor = hexToRgb(colors.primary300)
    if (qrColor) {
      doc.setDrawColor(qrColor.r, qrColor.g, qrColor.b)
    }
    doc.rect(pageWidth - margin - 20, footerY + 5, 15, 15, "S")
    doc.setFontSize(6)
    const qrTextColor = hexToRgb(colors.primary400)
    if (qrTextColor) {
      doc.setTextColor(qrTextColor.r, qrTextColor.g, qrTextColor.b)
    }
    doc.text("QR", pageWidth - margin - 14, footerY + 13)

    // Download the professionally styled PDF
    doc.save(`Factura-${payment.identification}-KAMIN.pdf`)
  }

  return (
    <div
      className="bg-white rounded-lg border border-primary-200 overflow-hidden shadow-sm"
      data-testid="payments-table"
    >
      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-primary-50 border-b border-primary-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-600 uppercase tracking-wider">
                Identificación
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-600 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-600 uppercase tracking-wider">
                <button
                  onClick={() => handleSort("orderAmount")}
                  className="flex items-center hover:text-primary-900 transition-colors min-w-0"
                >
                  <span className="shrink-0">Cantidad</span>
                  <span className="shrink-0 ml-1">
                    {getSortIcon("orderAmount")}
                  </span>
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-600 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-600 uppercase tracking-wider">
                <button
                  onClick={() => handleSort("createdAt")}
                  className="flex items-center hover:text-primary-900 transition-colors min-w-0"
                >
                  <span className="wrap-break-word">Fecha de Creación</span>
                  <span className="shrink-0 ml-1">
                    {getSortIcon("createdAt")}
                  </span>
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-600 uppercase tracking-wider">
                <button
                  onClick={() => handleSort("completedAt")}
                  className="flex items-center hover:text-primary-900 transition-colors min-w-0"
                >
                  <span className="wrap-break-word">Fecha de Finalización</span>
                  <span className="shrink-0 ml-1">
                    {getSortIcon("completedAt")}
                  </span>
                </button>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-primary-600 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-200 bg-white">
            {payments.map((payment) => (
              <tr
                key={payment.id}
                data-testid="payment-row"
                className="hover:bg-primary-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-family-sans font-semibold text-primary-700">
                  {payment.identification}
                </td>
                <td className="px-6 py-4 text-sm text-primary-900">
                  {payment.recipient}
                </td>
                <td className="px-6 py-4 text-sm font-medium tracking-tighter text-primary-600">
                  {formatCurrency(payment.orderAmount, payment.currency)}
                  &nbsp;COP
                </td>
                <td className="px-6 py-4">
                  <Badge variant={getStatusVariant(payment.status)}>
                    {PAYMENT_STATUS_LABELS[payment.status]}
                  </Badge>
                </td>

                <td className="px-6 py-4 text-sm text-primary-600">
                  {formatShortDate(payment.createdAt)}
                </td>
                <td className="px-6 py-4 text-sm text-primary-600">
                  {formatShortDate(payment.completedAt)}
                </td>
                <td className="px-6 py-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => downloadInvoicePDF(payment)}
                    className="text-primary-600 hover:text-primary-900"
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
        <div className="border-b border-primary-200 bg-primary-50">
          <div className="px-4 py-3">
            <h3 className="text-sm font-medium text-primary-900">
              Lista de Pagos
            </h3>
            <p className="text-xs text-primary-600 mt-1">
              {payments.length} {payments.length === 1 ? "pago" : "pagos"}
            </p>
          </div>
        </div>
        <table className="w-full">
          <thead className="border-b border-primary-200 bg-primary-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-primary-600 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-primary-600 uppercase tracking-wider">
                Total transacciones
              </th>
              <th className="px-4 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-200 bg-white">
            {payments.map((payment) => (
              <tr
                key={payment.id}
                data-testid="payment-row-mobile"
                className="hover:bg-primary-50 transition-colors"
              >
                <td className="px-4 py-4 text-sm">
                  <div>
                    <div className="font-medium text-primary-900">
                      {payment.recipient}
                    </div>
                    <div className="text-xs text-primary-500 mt-1">
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
                  <div className="font-medium text-primary-900">
                    {formatCurrency(payment.orderAmount, payment.currency)}
                  </div>
                  <div className="text-xs text-primary-500 mt-1">
                    {formatShortDate(payment.createdAt)}
                  </div>
                </td>
                <td className="px-4 py-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => downloadInvoicePDF(payment)}
                    className="text-primary-600 hover:text-primary-900 p-1 h-8 w-8"
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
          <div className="text-primary-400 text-sm">
            No hay pagos para mostrar
          </div>
        </div>
      )}
    </div>
  )
}
