'use client'

import { AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { ProgressSteps } from "@/components/ui/progress-steps"
import { useArtistSetupForm } from "@/hooks/use-artist-setup-form"
import { ArtistSetupFields } from "./artist-setup-fields"
import { formSteps } from "@/lib/validations/artist-setup"

export function ArtistSetupForm() {
  const { form, currentStep, totalSteps, onSubmit, handleBack, handleNext } = useArtistSetupForm()

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="max-w-2xl mx-auto">
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
                className="min-w-[100px] h-11 text-base transition-all duration-200 hover:bg-secondary"
              >
                Back
              </Button>
            )}
            {currentStep === totalSteps - 1 ? (
              <Button 
                type="submit"
                className="min-w-[100px] h-11 text-base font-medium transition-all duration-200"
              >
                Submit
              </Button>
            ) : (
              <Button 
                type="button" 
                onClick={handleNext}
                className="min-w-[100px] h-11 text-base font-medium transition-all duration-200"
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  )
} 