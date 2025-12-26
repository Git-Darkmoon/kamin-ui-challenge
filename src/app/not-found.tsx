"use client"

import { Construction, Home } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
      <div className="text-center space-y-6 max-w-md">
        {/* Construction Icon */}
        <div className="mx-auto w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center">
          <Construction className="w-12 h-12 text-orange-600" />
        </div>

        {/* Main Message */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-slate-900">En construcción</h1>
          <p className="text-lg text-slate-600">
            Esta sección está siendo desarrollada
          </p>
        </div>

        {/* Description */}
        <div className="space-y-4 text-slate-500">
          <p>
            Estamos trabajando para ofrecerte una experiencia increíble. Esta
            funcionalidad estará disponible muy pronto.
          </p>

          <div className="space-y-2">
            <p className="text-sm">
              <strong>Próximamente:</strong>
            </p>
            <ul className="text-sm space-y-1 text-left">
              <li>• Reportes detallados y analytics</li>
              <li>• Centro de ayuda y documentación</li>
              <li>• Configuraciones avanzadas</li>
              <li>• Y mucho más...</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Link href="/pagos" className="w-full sm:w-auto">
            <Button className="flex items-center gap-2 w-full">
              <Home className="w-4 h-4" />
              Volver a Pagos
            </Button>
          </Link>

          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => globalThis.history.back()}
          >
            Atrás
          </Button>
        </div>

        {/* Footer Note */}
        <div className="pt-8 border-t border-slate-200">
          <p className="text-xs text-slate-400">
            Si necesitas ayuda inmediata, contacta al equipo de soporte
          </p>
        </div>
      </div>
    </div>
  )
}
