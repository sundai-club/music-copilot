import { BrandIdentityResponse } from "@/types/api"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function getBrandIdentity(formData: {
  spotify_url: string
  song_lyrics: string
  genre_description: string
}): Promise<BrandIdentityResponse> {
  const response = await fetch(`${API_URL}/api/brand-identity`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch brand identity")
  }

  return response.json()
} 