'use client'

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { ProgressSteps } from "@/components/ui/progress-steps"
import { useArtistSetupForm } from "@/hooks/use-artist-setup-form"
import { ArtistSetupFields } from "./artist-setup-fields"
import { formSteps } from "@/lib/validations/artist-setup"
import { Loader2 } from "lucide-react"
import { PageTransition } from "@/components/ui/page-transition"

export function ArtistSetupForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { form, currentStep, totalSteps, onSubmit, handleBack, handleNext } = useArtistSetupForm()

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await onSubmit(e)
    setIsSubmitting(false)
  }

  return (
    <>
      <PageTransition isActive={isSubmitting} />
      <Form {...form}>
        <form onSubmit={handleFormSubmit} className="max-w-2xl mx-auto">
          <div className="bg-card rounded-xl border shadow-sm p-8">
            <ProgressSteps 
              currentStep={currentStep + 1} 
              totalSteps={totalSteps}
              className="mb-10"
            />
            
            <div className="min-h-[300px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <div className="space-y-2 mb-6">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    {formSteps[currentStep].label}
                  </h2>
                </div>
                <ArtistSetupFields 
                  step={currentStep} 
                  form={form} 
                />
              </AnimatePresence>
            </div>

            <div className="flex gap-3 justify-end mt-10 pt-6 border-t">
              {currentStep > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="min-w-[100px] h-11 text-base transition-all duration-200 hover:bg-secondary"
                >
                  Back
                </Button>
              )}
              {currentStep === totalSteps - 1 ? (
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="min-w-[100px] h-11 text-base font-medium transition-all duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              ) : (
                <Button 
                  type="button" 
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="min-w-[100px] h-11 text-base font-medium transition-all duration-200"
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </>
  )
} 