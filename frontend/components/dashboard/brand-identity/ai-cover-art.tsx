import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Loader2 } from "lucide-react"

interface AICoverArtProps {
  spotifyUrl: string
}

export function AICoverArt({ spotifyUrl }: AICoverArtProps) {
  const [coverInfo, setCoverInfo] = useState<{
    cover_image: string
    track: {
      name: string
      artists: string
    }
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCoverArt = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`https://music-copilot.onrender.com/api/spotify/cover?track_url=${encodeURIComponent(spotifyUrl)}`, {
          method: 'GET',
        })

        if (!response.ok) {
          throw new Error("Failed to generate cover art")
        }

        const data = await response.json()
        console.log('Response data:', data) // Debug log

        // Extract the relevant data from the response
        setCoverInfo({
          cover_image: data.image_url,
          track: {
            name: data.track.name,
            artists: data.track.artists
          }
        })
      } catch (err) {
        console.error("Error generating cover art:", err)
        setError(err instanceof Error ? err.message : "Failed to generate cover art")
      } finally {
        setLoading(false)
      }
    }

    if (spotifyUrl) {
      fetchCoverArt()
    }
  }, [spotifyUrl])

  if (!spotifyUrl) {
    return null
  }

  return (
    <Card className="backdrop-blur bg-card/50 border-muted overflow-hidden">
      <CardHeader className="border-b bg-muted/30">
        <CardTitle className="flex items-center gap-2">
          AI Generated Cover Art
        </CardTitle>
        <CardDescription>Unique artwork generated for your track</CardDescription>
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
        ) : coverInfo ? (
          <div className="flex flex-col items-center gap-6">
            <div className="aspect-square relative w-full max-w-[300px] overflow-hidden rounded-lg">
              <Image
                src={coverInfo.cover_image}
                alt={`AI-generated cover art for ${coverInfo.track.name}`}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center">
              <h3 className="font-medium text-xl mb-1">{coverInfo.track.name}</h3>
              <p className="text-muted-foreground">
                by {coverInfo.track.artists.join(", ")}
              </p>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
} 