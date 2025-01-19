"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Music2 } from "lucide-react"
import { cn } from "@/lib/utils"

const routes = [
  {
    label: "Artist Setup",
    href: "/setup",
  },
  {
    label: "Branding",
    href: "/branding",
  },
  {
    label: "Content",
    href: "/content",
  },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center">
        <Link href="/" className="flex items-center space-x-2 mr-8">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 transition-colors hover:bg-primary/20">
            <Music2 className="h-5 w-5 text-primary" />
          </div>
          <span className="hidden font-bold text-lg sm:inline-block">
            AmplfAi
          </span>
        </Link>
        <nav className="flex items-center space-x-8">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative py-1",
                pathname === route.href 
                  ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:content-[''] after:scale-x-100 after:transition-transform" 
                  : "text-muted-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:content-[''] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
} 