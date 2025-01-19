import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { artistSetupSchema, type ArtistSetupFormData, formSteps } from "@/lib/validations/artist-setup"
import { useRouter } from "next/navigation"
import { getBrandIdentity } from "@/app/api/brand-identity"
import { useBrandIdentityStore } from "@/lib/store/brand-identity"
import { BrandIdentityResponse } from "@/types/api"

export function useArtistSetupForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const totalSteps = formSteps.length
  const setBrandIdentity = useBrandIdentityStore((state: { setBrandIdentity: (data: BrandIdentityResponse) => void }) => state.setBrandIdentity)

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
    try {
      // Call the brand identity API
      const response = await getBrandIdentity({
        spotify_url: values.songSpotifyUrl,
        song_lyrics: values.artistBio,
        genre_description: values.primaryGenre,
      })
      
      // Store the response
      setBrandIdentity(response)
      
      // Redirect to branding page
      router.push("/branding")
    } catch (error) {
      console.error("Failed to generate brand identity:", error)
      // Handle error appropriately
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