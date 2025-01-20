import * as z from "zod"

const spotifyUrlSchema = z.string().refine(
  (url) => {
    // Accept empty string as the field is optional
    if (!url) return true
    
    // Handle Spotify URI format
    if (url.startsWith('spotify:track:')) {
      return true
    }
    
    // Handle short URL format
    if (url.includes('spotify.link')) {
      return true
    }
    
    // Handle normal URL format
    if (url.includes('spotify.com/track/')) {
      return true
    }
    
    return false
  },
  {
    message: "Please enter a valid Spotify track URL (e.g., https://open.spotify.com/track/...)",
  }
)

export const artistSetupSchema = z.object({
  songSpotifyUrl: spotifyUrlSchema.optional(),
  instagramHandle: z.string().optional(),
  primaryGenre: z.string().optional(),
  secondaryGenre: z.string().optional(),
  artistBio: z.string().max(500, "Bio should not exceed 500 characters").optional(),
  storyMaterials: z.string().optional(),
  visualStyle: z.string().optional(),
  brandColors: z.array(z.string()).optional(),
})

export type ArtistSetupFormData = z.infer<typeof artistSetupSchema>

type FormStep = {
  name: keyof ArtistSetupFormData | "genres"
  label: string
}

export const formSteps: FormStep[] = [
  { name: "songSpotifyUrl", label: "Song URL" },
  { name: "instagramHandle", label: "Instagram Handle" },
  { name: "genres", label: "Music Genres" },
  { name: "artistBio", label: "Artist Bio" },
  { name: "storyMaterials", label: "Lyrics & Story" },
  { name: "visualStyle", label: "Visual Style" },
  { name: "brandColors", label: "Brand Colors" },
]

export const getPlaceholder = (fieldName: string) => {
  switch (fieldName) {
    case "songSpotifyUrl":
      return "https://open.spotify.com/track/..."
    case "instagramHandle":
      return "@yourusername"
    case "brandColors":
      return "e.g., #FF5733, #33FF57"
    default:
      return ""
  }
}

export const getDescription = (fieldName: string) => {
  switch (fieldName) {
    case "songSpotifyUrl":
      return "Your Spotify song URL (e.g., https://open.spotify.com/track/...)"
    case "instagramHandle":
      return "Your Instagram username without the @ symbol"
    case "brandColors":
      return "Enter hex codes of your brand colors, if any"
    default:
      return null
  }
} 