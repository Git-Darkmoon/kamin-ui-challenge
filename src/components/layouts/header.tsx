"use client"

import { MobileNav } from "./mobile-nav"

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 md:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
            <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" fill="currentColor" />
          </svg>
          <span className="text-lg font-semibold">KAMIN</span>
        </div>
        <MobileNav />
      </div>
    </header>
  )
}
