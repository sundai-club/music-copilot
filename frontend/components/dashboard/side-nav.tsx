"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  BarChart,
  Palette,
  MessageSquare,
  Music2,
  Settings,
} from "lucide-react"

const routes = [
  {
    label: "Setup",
    icon: Settings,
    href: "/dashboard/setup",
    color: "text-sky-500",
  },
  {
    label: "Analytics",
    icon: BarChart,
    href: "/dashboard/analytics",
    color: "text-violet-500",
  },
  {
    label: "Branding",
    icon: Palette,
    href: "/dashboard/branding",
    color: "text-pink-700",
  },
  {
    label: "Content",
    icon: MessageSquare,
    href: "/dashboard/content",
    color: "text-orange-700",
  },
  {
    label: "Music",
    icon: Music2,
    href: "/dashboard/music",
    color: "text-emerald-500",
  },
]

export function SideNav() {
  const pathname = usePathname()

  return (
    <div className="fixed inset-y-0 flex flex-col w-72 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-r">
      <div className="flex flex-col flex-1 gap-2">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <Music2 className="h-4 w-4 text-primary" />
            </span>
            <h1 className="text-xl font-semibold">Music Copilot</h1>
          </Link>
        </div>
        <div className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary hover:bg-primary/10",
                  pathname === route.href 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground"
                )}
              >
                <route.icon className={cn("h-4 w-4", route.color)} />
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
} 