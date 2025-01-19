"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useBrandIdentityStore } from "@/lib/store/brand-identity"
import { useRouter } from "next/navigation"
import { Loading } from "@/components/ui/loading"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Music2, Target, Users, MessageSquare, Palette } from "lucide-react"
import { useEffect, useState } from "react"

export default function BrandingPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const brandIdentity = useBrandIdentityStore((state: any) => state.brandIdentity)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch by not rendering until client-side
  if (!mounted) {
    return null
  }

  if (!brandIdentity) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Music2 className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold">No Brand Identity Data</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Complete the artist setup form to generate your personalized brand identity and guidelines.
          </p>
          <button
            onClick={() => router.push("/setup")}
            className="mt-4 px-6 py-2.5 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors duration-200 inline-flex items-center gap-2"
          >
            Start Setup
            <span className="text-primary-foreground/80">→</span>
          </button>
        </div>
      </div>
    )
  }

  const { brand_identity } = brandIdentity

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto max-w-7xl px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {/* Header Section */}
        <div className="space-y-4 text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
            Brand Identity
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your comprehensive brand strategy and guidelines, crafted with AI precision.
          </p>
        </div> 

        <Tabs defaultValue="identity" className="space-y-12">
          <div className="flex justify-center w-full">
            <TabsList className="inline-flex justify-center gap-4 p-1.5 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border rounded-full">
              <TabsTrigger value="identity" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
                <Target className="w-4 h-4" />
                Brand Identity
              </TabsTrigger>
              <TabsTrigger value="audience" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
                <Users className="w-4 h-4" />
                Target Audience
              </TabsTrigger>
              <TabsTrigger value="voice" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
                <MessageSquare className="w-4 h-4" />
                Voice & Messaging
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Brand Identity Tab */}
          <TabsContent value="identity" className="space-y-8 mx-auto max-w-6xl">
            <Card className="backdrop-blur bg-card/50 border-muted overflow-hidden">
              <CardHeader className="border-b bg-muted/30">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  Core Brand Narrative
                </CardTitle>
                <CardDescription>Your unique artistic story and vision</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-lg leading-relaxed">
                  {brand_identity.core_song_narrative}
                </p>
              </CardContent>
            </Card>

            <div className="grid gap-8 md:grid-cols-2">
              <Card className="backdrop-blur bg-card/50 border-muted overflow-hidden">
                <CardHeader className="border-b bg-muted/30">
                  <CardTitle className="flex items-center gap-2">
                    Brand Personality
                  </CardTitle>
                  <CardDescription>Key traits that define your brand</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {brand_identity.brand_personality_traits.map((trait: string, index: number) => (
                      <div key={trait} className="group p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex justify-between items-center">
                          <span className="font-medium group-hover:text-primary transition-colors">{trait}</span>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <span 
                                key={i}
                                className={cn(
                                  "h-2 w-2 rounded-full transition-all duration-300",
                                  i <= index 
                                    ? "bg-primary group-hover:scale-110" 
                                    : "bg-muted group-hover:bg-muted/80"
                                )}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur bg-card/50 border-muted overflow-hidden">
                <CardHeader className="border-b bg-muted/30">
                  <CardTitle className="flex items-center gap-2">
                    Artist Positioning
                  </CardTitle>
                  <CardDescription>Your unique place in the music landscape</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-lg leading-relaxed">
                    {brand_identity.artist_positioning_statement}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Target Audience Tab */}
          <TabsContent value="audience" className="space-y-8 mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-2">
              {brand_identity.target_audience_personas.map((persona: {
                age: string;
                lifestyle: string;
                music_preferences: string;
                social_media_habits: string;
              }, index: number) => (
                <Card key={index} className="backdrop-blur bg-card/50 border-muted overflow-hidden">
                  <CardHeader className="border-b bg-muted/30">
                    <Badge variant="outline" className="w-fit mb-2">Persona {index + 1}</Badge>
                    <CardTitle className="flex items-center gap-2">
                      Target Audience Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-muted/30">
                        <p className="font-medium mb-1 text-sm text-muted-foreground">Age Range</p>
                        <p className="font-medium">{persona.age}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/30">
                        <p className="font-medium mb-1 text-sm text-muted-foreground">Lifestyle</p>
                        <p className="font-medium">{persona.lifestyle}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/30">
                        <p className="font-medium mb-1 text-sm text-muted-foreground">Music Preferences</p>
                        <p className="font-medium">{persona.music_preferences}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/30">
                        <p className="font-medium mb-1 text-sm text-muted-foreground">Social Media Habits</p>
                        <p className="font-medium">{persona.social_media_habits}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Voice & Messaging Tab */}
          <TabsContent value="voice" className="space-y-8 mx-auto max-w-6xl">
            <Card className="backdrop-blur bg-card/50 border-muted overflow-hidden">
              <CardHeader className="border-b bg-muted/30">
                <CardTitle className="flex items-center gap-2">
                  Brand Voice Guidelines
                </CardTitle>
                <CardDescription>How to communicate your brand message</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="p-4 rounded-lg bg-muted/30">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Communication Style
                    </h3>
                    <p className="text-muted-foreground">
                      Based on your brand personality traits, maintain a {brand_identity.brand_personality_traits.join(", ").toLowerCase()} tone in all communications.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Key Messages
                    </h3>
                    <p className="text-muted-foreground">
                      Focus on {brand_identity.core_song_narrative.split('.')[0].toLowerCase()}.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 