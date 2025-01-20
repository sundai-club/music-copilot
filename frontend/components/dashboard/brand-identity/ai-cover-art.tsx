import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Loader2 } from "lucide-react"

interface AICoverArtProps {
  spotifyUrl: string
}

export function AICoverArt({ spotifyUrl }: AICoverArtProps) {
  const [trackInfo, setTrackInfo] = useState<{
    name: string
    artists: string[]
    album: string
    image_url: string
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTrackInfo = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Extract track ID from URL
        const trackId = spotifyUrl.split('/track/')[1]?.split('?')[0]
        if (!trackId) {
          throw new Error("Invalid Spotify URL")
        }

        const response = await fetch(`/api/spotify/track/${trackId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch track details")
        }
        
        const data = await response.json()
        setTrackInfo({
          name: data.name,
          artists: data.artists,
          album: data.album,
          image_url: data.image_url
        })
      } catch (err) {
        console.error("Error fetching track info:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch track details")
      } finally {
        setLoading(false)
      }
    }

    if (spotifyUrl) {
      fetchTrackInfo()
    }
  }, [spotifyUrl])

  if (!spotifyUrl) {
    return null
  }

  return (
    <Card className="backdrop-blur bg-card/50 border-muted overflow-hidden">
      <CardHeader className="border-b bg-muted/30">
        <CardTitle className="flex items-center gap-2">
          Track Cover Art
        </CardTitle>
        <CardDescription>Original artwork from Spotify</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {loading ? (
          <div className="flex items-center justify-center h-[300px]">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            {error}
          </div>
        ) : trackInfo ? (
          <div className="flex flex-col items-center gap-6">
            <div className="aspect-square relative w-full max-w-[300px] overflow-hidden rounded-lg">
              <Image
                src={trackInfo.image_url}
                alt={`Cover art for ${trackInfo.name}`}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center">
              <h3 className="font-medium text-xl mb-1">{trackInfo.name}</h3>
              <p className="text-muted-foreground">
                by {trackInfo.artists.join(", ")} • {trackInfo.album}
              </p>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
} 