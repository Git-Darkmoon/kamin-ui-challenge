import {
  CreditCardIcon,
  LifeBuoyIcon,
  ScrollTextIcon,
  SettingsIcon,
} from "lucide-react"

export const navigation = [
  {
    name: "Pagos",
    href: "/pagos",
    icon: <CreditCardIcon />,
  },
  {
    name: "Reportes",
    href: "/reportes",
    icon: <ScrollTextIcon />,
  },
  {
    name: "Ayuda",
    href: "/ayuda",
    icon: <LifeBuoyIcon />,
  },
  {
    name: "Configuración",
    href: "/configuracion",
    icon: <SettingsIcon />,
  },
]
