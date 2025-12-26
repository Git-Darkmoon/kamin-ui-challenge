import { Sidebar } from "@/components/layouts/sidebar"
import { Header } from "@/components/layouts/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <Header />
      <div className="md:pl-64">
        <main className="px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  )
}
