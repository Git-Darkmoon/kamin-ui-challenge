"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils/cn"
import { LogOutIcon } from "lucide-react"
import Logo from "../ui/logo"
import { navigation } from "@/lib/constants/routes"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-slate-50 border-r border-slate-200">
      <Logo />

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                isActive
                  ? "bg-slate-200 text-slate-900"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="px-4 py-4 border-t border-slate-200">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="h-8 w-8 rounded-full bg-slate-300 flex items-center justify-center">
            <span className="text-xs font-medium text-slate-700">FG</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">
              Fernanda García
            </p>
            <p className="text-xs text-slate-600 truncate">
              fernanda@empresa.co
            </p>
          </div>
          <button
            type="button"
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <LogOutIcon />
          </button>
        </div>
      </div>
    </aside>
  )
}
