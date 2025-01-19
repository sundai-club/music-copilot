"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <span className="hidden font-bold sm:inline-block">
          Music Copilot
        </span>
      </Link>
      <nav className="flex gap-6">
        <Link
          href="/setup"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/setup" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Artist Setup
        </Link>
        <Link
          href="/branding"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/branding" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Branding
        </Link>
        <Link
          href="/content"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/content" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Content
        </Link>
      </nav>
    </div>
  )
} 