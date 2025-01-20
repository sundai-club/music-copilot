import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { artistSetupSchema, type ArtistSetupFormData, formSteps } from "@/lib/validations/artist-setup"
import { useRouter } from "next/navigation"
import { getBrandIdentity } from "@/app/api/brand-identity"
import { useBrandIdentityStore } from "@/lib/store/brand-identity"
import { BrandIdentityResponse } from "@/types/api"
import { useToast } from "@/hooks/use-toast"

// Helper function to normalize Spotify URL
function normalizeSpotifyUrl(url: string): string {
  try {
    // Handle Spotify URI format (spotify:track:id)
    if (url.startsWith('spotify:track:')) {
      const id = url.split(':')[2]
      return `https://open.spotify.com/track/${id}`
    }
    
    // Handle short URL format
    if (url.includes('spotify.link')) {
      // We'll need to use the full URL as short URLs need to be expanded
      return url
    }
    
    // Handle normal URL format
    if (url.includes('spotify.com')) {
      const trackId = url.split('/track/')[1]?.split('?')[0]
      if (trackId) {
        return `https://open.spotify.com/track/${trackId}`
      }
    }
    
    return url
  } catch (error) {
    console.error('Error normalizing Spotify URL:', error)
    return url
  }
}

export function useArtistSetupForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(0)
  const totalSteps = formSteps.length
  const setBrandIdentity = useBrandIdentityStore((state: { setBrandIdentity: (data: BrandIdentityResponse) => void }) => state.setBrandIdentity)
  const setSpotifyUrl = useBrandIdentityStore((state: { setSpotifyUrl: (url: string) => void }) => state.setSpotifyUrl)

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
      // Debug log before setting Spotify URL
      console.log("Form values:", values)
      
      if (values.songSpotifyUrl) {
        // Normalize the Spotify URL
        const normalizedUrl = normalizeSpotifyUrl(values.songSpotifyUrl)
        console.log("Normalized Spotify URL:", normalizedUrl)
        
        // Store the normalized URL
        setSpotifyUrl(normalizedUrl)
        console.log("Spotify URL set in store:", normalizedUrl)

        // Call the brand identity API with normalized URL
        const response = await getBrandIdentity({
          spotify_url: normalizedUrl,
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
      } else {
        toast({
          title: "Error",
          description: "Please provide a valid Spotify track URL.",
          variant: "destructive",
        })
      }
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