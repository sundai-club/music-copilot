import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { artistSetupSchema, type ArtistSetupFormData, formSteps } from "@/lib/validations/artist-setup"
import { useRouter } from "next/navigation"
import { getBrandIdentity } from "@/app/api/brand-identity"
import { useBrandIdentityStore } from "@/lib/store/brand-identity"
import { BrandIdentityResponse } from "@/types/api"
import { useToast } from "@/hooks/use-toast"

export function useArtistSetupForm() {
  const router = useRouter()
  const { toast } = useToast()
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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const values = form.getValues()
    
    try {
      // Call the brand identity API
      const response = await getBrandIdentity({
        spotify_url: values.songSpotifyUrl || "",
        song_lyrics: values.artistBio || "",
        genre_description: values.primaryGenre || "",
      })
      
      // Store the response
      setBrandIdentity(response)
      
      // Show success message
      toast({
        title: "Success!",
        description: "Your brand identity has been generated.",
      })
      
      // Redirect to branding page immediately after response
      router.push("/branding")
    } catch (error) {
      console.error("Failed to generate brand identity:", error)
      toast({
        title: "Error",
        description: "Failed to generate brand identity. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleNext = async () => {
    const step = formSteps[currentStep]
    
    // Since fields are optional, we can just proceed
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  return {
    form,
    currentStep,
    totalSteps,
    onSubmit,
    handleBack,
    handleNext,
  }
} 