"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  description?: string
  className?: string
  children: React.ReactNode
}

export function MetricCard({
  title,
  description,
  className,
  children
}: MetricCardProps) {
  return (
    <Card 
      className={cn(
        "backdrop-blur bg-card/50 border-muted hover:bg-card/60 transition-colors",
        "overflow-hidden relative flex flex-col",
        className
      )}
    >
      <CardHeader className="px-6 pb-4 flex flex-col space-y-1.5">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse"/>
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-sm">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="px-6 pt-0 flex-1">
        {children}
      </CardContent>
    </Card>
  )
} 