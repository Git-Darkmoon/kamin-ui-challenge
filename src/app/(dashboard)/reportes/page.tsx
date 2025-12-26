import { BarChart3 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ReportesPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
      <div className="text-center space-y-6 max-w-md">
        {/* Construction Icon */}
        <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
          <BarChart3 className="w-12 h-12 text-blue-600" />
        </div>

        {/* Main Message */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-slate-900">
            Reportes en construcción
          </h1>
          <p className="text-lg text-slate-600">
            Sección de analytics y reportes en desarrollo
          </p>
        </div>

        {/* Description */}
        <div className="space-y-4 text-slate-500">
          <p>
            Estamos desarrollando un completo sistema de reportes con gráficos
            interactivos y análisis detallados de tus transacciones.
          </p>

          <div className="space-y-2">
            <p className="text-sm">
              <strong>Próximas funcionalidades:</strong>
            </p>
            <ul className="text-sm space-y-1 text-left">
              <li>• Dashboard con métricas en tiempo real</li>
              <li>• Gráficos de tendencias y patrones</li>
              <li>• Reportes exportables (PDF, Excel)</li>
              <li>• Comparativas entre períodos</li>
              <li>• Alertas y notificaciones</li>
            </ul>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Link href="/pagos">
            <Button className="flex items-center gap-2">Volver a Pagos</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
