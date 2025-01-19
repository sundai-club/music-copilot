'use client'

import { cn } from "@/lib/utils"

interface ProgressStepsProps {
  currentStep: number
  totalSteps: number
  className?: string
}

export function ProgressSteps({ currentStep, totalSteps, className }: ProgressStepsProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
        <span className="text-sm font-medium">{Math.round((currentStep / totalSteps) * 100)}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-in-out rounded-full"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  )
} 