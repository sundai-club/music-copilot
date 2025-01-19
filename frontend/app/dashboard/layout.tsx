"use client"

import { SideNav } from "@/components/dashboard/side-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen">
      <SideNav />
      <div className="flex min-h-screen flex-col lg:pl-72">
        <main className="flex-1">
          <div className="relative flex flex-col min-h-screen bg-gradient-to-b from-background to-background/80">
            <div className="flex-1 space-y-8 px-2 pt-6 pb-16 md:px-6 lg:px-8">
              <div className="mx-auto max-w-4xl space-y-8">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 