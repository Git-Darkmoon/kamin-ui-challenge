import { Settings } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ConfiguracionPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
      <div className="text-center space-y-6 max-w-md">
        <div className="mx-auto w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center">
          <Settings className="w-12 h-12 text-purple-600" />
        </div>

        {/* Main Message */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-slate-900">
            Configuración en construcción
          </h1>
          <p className="text-lg text-slate-600">
            Panel de configuración avanzada en desarrollo
          </p>
        </div>

        {/* Description */}
        <div className="space-y-4 text-slate-500">
          <p>
            Estamos trabajando en un completo panel de configuración que te
            permitirá personalizar completamente tu experiencia.
          </p>

          <div className="space-y-2">
            <p className="text-sm">
              <strong>Configuraciones disponibles pronto:</strong>
            </p>
            <ul className="text-sm space-y-1 text-left">
              <li>• Perfil de usuario y empresa</li>
              <li>• Preferencias de notificaciones</li>
              <li>• Configuración de pagos y monedas</li>
              <li>• Integraciones con terceros</li>
              <li>• Políticas de seguridad</li>
              <li>• Gestión de usuarios y permisos</li>
              <li>• Personalización de la interfaz</li>
            </ul>
          </div>
        </div>

        {/* Security Note */}
        <div className="bg-slate-50 rounded-lg p-4 text-sm">
          <p className="font-semibold text-slate-700 mb-2">🔒 Seguridad</p>
          <p className="text-slate-600">
            Todas las configuraciones estarán protegidas con autenticación de
            dos factores y encriptación de extremo a extremo.
          </p>
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
