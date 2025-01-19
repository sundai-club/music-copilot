"use client"

import { cn } from "@/lib/utils"

interface ProgressBarProps {
  value: number
  label: string
  sublabel?: string
  className?: string
}

export function ProgressBar({
  value,
  label,
  sublabel,
  className
}: ProgressBarProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2">
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: `${value}%` }} 
          />
        </div>
        <span className="text-sm font-medium min-w-[3rem] text-right">{value}%</span>
        {sublabel && (
          <span className="text-sm text-muted-foreground">{sublabel}</span>
        )}
      </div>
      <p className="text-sm font-medium">{label}</p>
    </div>
  )
} 