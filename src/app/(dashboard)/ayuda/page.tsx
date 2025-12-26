import { HelpCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AyudaPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
      <div className="text-center space-y-6 max-w-md">
        {/* Construction Icon */}
        <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
          <HelpCircle className="w-12 h-12 text-green-600" />
        </div>

        {/* Main Message */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-slate-900">
            Centro de Ayuda en construcción
          </h1>
          <p className="text-lg text-slate-600">
            Estamos preparando recursos de apoyo para ti
          </p>
        </div>

        {/* Description */}
        <div className="space-y-4 text-slate-500">
          <p>
            Muy pronto tendrás acceso a una completa base de conocimientos,
            tutoriales y soporte técnico especializado.
          </p>

          <div className="space-y-2">
            <p className="text-sm">
              <strong>En desarrollo:</strong>
            </p>
            <ul className="text-sm space-y-1 text-left">
              <li>• Base de conocimientos con tutoriales</li>
              <li>• Chat de soporte en vivo</li>
              <li>• Videos explicativos</li>
              <li>• FAQ (Preguntas frecuentes)</li>
              <li>• Documentación API</li>
              <li>• Comunidad de usuarios</li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-slate-50 rounded-lg p-4 text-sm">
          <p className="font-semibold text-slate-700 mb-2">
            ¿Necesitas ayuda ahora?
          </p>
          <p className="text-slate-600">
            Contacta a nuestro equipo de soporte:
            <br />
            <strong>Email:</strong> support@kamin.studio
            <br />
            <strong>Teléfono:</strong> +57 (1) 234-5678
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
