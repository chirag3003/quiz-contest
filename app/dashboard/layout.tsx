"use client"

import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import Sidebar from "@/components/ui/sidebar"

const inter = Inter({ subsets: ["latin"] })

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between p-4 md:hidden">
            <h1 className="text-xl font-bold">Quiz Dashboard</h1>
          </div>
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}