"use client"

import Logo from "../ui/logo"
import { MobileNav } from "./mobile-nav"

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 md:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <Logo />
        <MobileNav />
      </div>
    </header>
  )
}
