"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export default function BrandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto max-w-7xl px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {/* Header Section with gradient text */}
        <div className="space-y-2 text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            Brand Dashboard
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your complete brand identity and guidelines, powered by AI insights.
          </p>
        </div>

        <Tabs defaultValue="analytics" className="space-y-8">
          <div className="flex justify-center w-full">
            <TabsList className="inline-flex justify-center gap-4 p-1 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border rounded-full">
              <TabsTrigger value="analytics" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Analytics & Insights
              </TabsTrigger>
              <TabsTrigger value="identity" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Brand Identity
              </TabsTrigger>
              <TabsTrigger value="visual" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Visual Guidelines
              </TabsTrigger>
              <TabsTrigger value="messaging" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Voice & Messaging
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-6xl">
              <Card className="backdrop-blur bg-card/50 border-muted">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse"/>
                    Audience Demographics
                  </CardTitle>
                  <CardDescription>Real-time audience insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px] pr-4">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-2">Top Locations</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-muted rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }} />
                            </div>
                            <span className="text-sm font-medium">45%</span>
                            <span className="text-sm text-muted-foreground">US</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-muted rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{ width: '25%' }} />
                            </div>
                            <span className="text-sm font-medium">25%</span>
                            <span className="text-sm text-muted-foreground">UK</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-muted rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{ width: '15%' }} />
                            </div>
                            <span className="text-sm font-medium">15%</span>
                            <span className="text-sm text-muted-foreground">DE</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="backdrop-blur bg-card/50 border-muted">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse"/>
                    Musical Identity
                  </CardTitle>
                  <CardDescription>Genre and sound analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm font-medium mb-2">Primary Genre</p>
                      <p className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">Pop</p>
                    </div>
                    <Separator className="my-4"/>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Energy</span>
                          <span className="font-medium">High</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div className="bg-primary h-1.5 rounded-full w-[85%]" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Danceability</span>
                          <span className="font-medium">Medium</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div className="bg-primary h-1.5 rounded-full w-[60%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur bg-card/50 border-muted">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse"/>
                    Market Position
                  </CardTitle>
                  <CardDescription>Competitive landscape</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm font-medium">Similar Artists</p>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Artist A</span>
                          <span className="text-sm text-primary">80%</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Audience overlap</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Artist B</span>
                          <span className="text-sm text-primary">65%</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Audience overlap</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Brand Identity Tab */}
          <TabsContent value="identity" className="space-y-6 mx-auto max-w-6xl">
            <Card className="backdrop-blur bg-card/50 border-muted">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse"/>
                  Core Brand Narrative
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed">
                  Your unique artistic voice blends modern pop sensibilities with authentic storytelling, 
                  creating an immersive musical experience that resonates with a young, digitally-native audience.
                </p>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="backdrop-blur bg-card/50 border-muted">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse"/>
                    Brand Personality
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Authentic</span>
                        <div className="flex gap-1">
                          <span className="h-2 w-2 rounded-full bg-primary"/>
                          <span className="h-2 w-2 rounded-full bg-primary"/>
                          <span className="h-2 w-2 rounded-full bg-primary"/>
                          <span className="h-2 w-2 rounded-full bg-primary"/>
                          <span className="h-2 w-2 rounded-full bg-muted"/>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Innovative</span>
                        <div className="flex gap-1">
                          <span className="h-2 w-2 rounded-full bg-primary"/>
                          <span className="h-2 w-2 rounded-full bg-primary"/>
                          <span className="h-2 w-2 rounded-full bg-primary"/>
                          <span className="h-2 w-2 rounded-full bg-muted"/>
                          <span className="h-2 w-2 rounded-full bg-muted"/>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Energetic</span>
                        <div className="flex gap-1">
                          <span className="h-2 w-2 rounded-full bg-primary"/>
                          <span className="h-2 w-2 rounded-full bg-primary"/>
                          <span className="h-2 w-2 rounded-full bg-primary"/>
                          <span className="h-2 w-2 rounded-full bg-primary"/>
                          <span className="h-2 w-2 rounded-full bg-primary"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur bg-card/50 border-muted">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse"/>
                    Target Audience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="font-medium mb-2">Primary Persona</p>
                      <p className="text-sm leading-relaxed">
                        Urban professionals, 25-34, tech-savvy music enthusiasts who value authenticity and innovation.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Visual Guidelines Tab */}
          <TabsContent value="visual" className="space-y-6 mx-auto max-w-6xl">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="backdrop-blur bg-card/50 border-muted">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse"/>
                    Color Palette
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-5 gap-3">
                      <div className="space-y-2 text-center">
                        <div className="h-16 rounded-lg bg-[#FF4545] shadow-lg hover:scale-105 transition-transform" />
                        <p className="text-xs font-medium">Primary</p>
                      </div>
                      <div className="space-y-2 text-center">
                        <div className="h-16 rounded-lg bg-[#45A7FF] shadow-lg hover:scale-105 transition-transform" />
                        <p className="text-xs font-medium">Secondary</p>
                      </div>
                      <div className="space-y-2 text-center">
                        <div className="h-16 rounded-lg bg-[#FFB545] shadow-lg hover:scale-105 transition-transform" />
                        <p className="text-xs font-medium">Accent 1</p>
                      </div>
                      <div className="space-y-2 text-center">
                        <div className="h-16 rounded-lg bg-[#45FFB5] shadow-lg hover:scale-105 transition-transform" />
                        <p className="text-xs font-medium">Accent 2</p>
                      </div>
                      <div className="space-y-2 text-center">
                        <div className="h-16 rounded-lg bg-[#B545FF] shadow-lg hover:scale-105 transition-transform" />
                        <p className="text-xs font-medium">Accent 3</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur bg-card/50 border-muted">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse"/>
                    Typography
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-2xl font-bold mb-2">Montserrat</p>
                      <p className="text-sm text-muted-foreground">Headings - Bold, impactful, modern</p>
                      <div className="mt-2 space-y-1">
                        <p className="text-xl">The quick brown fox</p>
                        <p className="text-lg">jumps over the lazy dog</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-2xl font-medium mb-2">Inter</p>
                      <p className="text-sm text-muted-foreground">Body - Clean, readable, versatile</p>
                      <div className="mt-2 space-y-1">
                        <p className="text-base">The quick brown fox</p>
                        <p className="text-sm">jumps over the lazy dog</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Voice & Messaging Tab */}
          <TabsContent value="messaging" className="space-y-6 mx-auto max-w-6xl">
            <Card className="backdrop-blur bg-card/50 border-muted">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse"/>
                  Tone of Voice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors">
                    <p className="font-medium mb-2">Social Media</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Casual, engaging, and authentic with a touch of humor
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors">
                    <p className="font-medium mb-2">Press & Media</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Professional yet approachable, emphasizing artistic vision
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur bg-card/50 border-muted">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse"/>
                  Key Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="group p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-all hover:scale-105">
                    <p className="font-medium mb-2 group-hover:text-primary transition-colors">Artistic Vision</p>
                    <p className="text-sm text-muted-foreground">
                      Pushing boundaries while staying true to authentic roots
                    </p>
                  </div>
                  <div className="group p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-all hover:scale-105">
                    <p className="font-medium mb-2 group-hover:text-primary transition-colors">Fan Connection</p>
                    <p className="text-sm text-muted-foreground">
                      Creating meaningful connections through shared experiences
                    </p>
                  </div>
                  <div className="group p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-all hover:scale-105">
                    <p className="font-medium mb-2 group-hover:text-primary transition-colors">Musical Journey</p>
                    <p className="text-sm text-muted-foreground">
                      Constant evolution and growth in artistry
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