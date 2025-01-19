import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { artistSetupSchema, type ArtistSetupFormData, formSteps } from "@/lib/validations/artist-setup"

export function useArtistSetupForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const totalSteps = formSteps.length

  const form = useForm<ArtistSetupFormData>({
    resolver: zodResolver(artistSetupSchema),
    defaultValues: {
      songSpotifyUrl: "",
      instagramHandle: "",
      primaryGenre: "",
      secondaryGenre: "",
      artistBio: "",
      storyMaterials: "",
      visualStyle: "",
      brandColors: [],
    },
    mode: "onChange",
  })

  const onSubmit = async (values: ArtistSetupFormData) => {
    if (currentStep < totalSteps - 1) {
      const step = formSteps[currentStep]
      
      try {
        let isValid = false
        if (step.name === "genres") {
          isValid = await form.trigger(["primaryGenre", "secondaryGenre"])
        } else {
          isValid = await form.trigger(step.name as keyof ArtistSetupFormData)
        }
        
        if (isValid) {
          setCurrentStep(prev => prev + 1)
        }
      } catch (error) {
        console.error("Validation error:", error)
      }
    } else {
      const isValid = await form.trigger()
      if (isValid) {
        console.log("Form submitted:", values)
        // Add your submission logic here
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleNext = async () => {
    const step = formSteps[currentStep]
    let isValid = false
    
    if (step.name === "genres") {
      isValid = await form.trigger(["primaryGenre", "secondaryGenre"])
    } else {
      isValid = await form.trigger(step.name as keyof ArtistSetupFormData)
    }

    if (isValid && currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  return {
    form,
    currentStep,
    totalSteps,
    onSubmit: form.handleSubmit(onSubmit),
    handleBack,
    handleNext,
  }
} 