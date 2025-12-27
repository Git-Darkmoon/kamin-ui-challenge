"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils/cn"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer"
import Logo from "../ui/logo"
import { navigation } from "@/lib/constants/routes"
import { MenuIcon } from "lucide-react"

export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  return (
    <div className="md:hidden">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <button
            type="button"
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <MenuIcon />
          </button>
        </DrawerTrigger>
        <DrawerContent className="bg-white">
          <div className="p-6 space-y-6">
            {/* Hidden accessibility labels */}
            <DrawerTitle className="sr-only">Navigation Menu</DrawerTitle>
            <DrawerDescription className="sr-only">
              Main navigation links
            </DrawerDescription>

            <Logo />

            {/* Navigation Links */}
            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 text-base font-medium rounded-lg transition-colors",
                      isActive
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                )
              })}
            </nav>

            {/* User Profile */}
            <div className="pt-6 border-t border-slate-200">
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="h-10 w-10 rounded-full bg-slate-300 flex items-center justify-center">
                  <span className="text-sm font-medium text-slate-700">FG</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    Fernanda García
                  </p>
                  <p className="text-xs text-slate-600 truncate">
                    fernanda@empresa.co
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
