"use client"

import { useEffect, useState } from "react"
import { BrandIdentityResponse } from "@/types/api"
import { CoreNarrative } from "@/components/dashboard/brand-identity/core-narrative"
import { PersonalityTraits } from "@/components/dashboard/brand-identity/personality-traits"
import { AudiencePersonas } from "@/components/dashboard/brand-identity/audience-personas"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loading } from "@/components/ui/loading"

export default function BrandingDashboard() {
  const [brandIdentity, setBrandIdentity] = useState<BrandIdentityResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // In a real app, you would get this from your form submission or state management
    const formData = {
      spotify_url: "https://open.spotify.com/track/7MXVkk9YMctZqd1Srtv4MB",
      song_lyrics: "...", // Get from form
      genre_description: "..." // Get from form
    }

    fetch("/api/brand-identity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data: BrandIdentityResponse) => {
        setBrandIdentity(data)
        setLoading(false)
      })
      .catch((err) => {
        setError("Failed to load brand identity data")
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  if (!brandIdentity) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">No Data Available</h2>
          <p className="text-muted-foreground">Please complete the artist setup form first.</p>
        </div>
      </div>
    )
  }

  const { brand_identity } = brandIdentity

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Brand Identity Dashboard</h1>
      
      <div className="grid gap-8">
        <CoreNarrative narrative={brand_identity.core_song_narrative} />
        
        <Card>
          <CardHeader>
            <CardTitle>Artist Positioning Statement</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {brand_identity.artist_positioning_statement}
            </p>
          </CardContent>
        </Card>
        
        <PersonalityTraits traits={brand_identity.brand_personality_traits} />
        
        <AudiencePersonas personas={brand_identity.target_audience_personas} />
      </div>
    </div>
  )
} 