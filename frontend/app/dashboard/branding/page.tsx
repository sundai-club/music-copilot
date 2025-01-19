"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { MetricCard } from "@/components/dashboard/metric-card"
import { ProgressBar } from "@/components/dashboard/progress-bar"
import { PageHeader } from "@/components/dashboard/page-header"

export default function BrandingPage() {
  return (
    <>
      <PageHeader 
        heading="Brand Dashboard"
        subheading="Your complete brand identity and guidelines, powered by AI insights."
      />

      <Tabs defaultValue="analytics" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-full bg-background/95 p-1 text-muted-foreground backdrop-blur supports-[backdrop-filter]:bg-background/60 border">
            <TabsTrigger 
              value="analytics" 
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
            >
              Analytics & Insights
            </TabsTrigger>
            <TabsTrigger 
              value="identity"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
            >
              Brand Identity
            </TabsTrigger>
            <TabsTrigger 
              value="visual"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
            >
              Visual Guidelines
            </TabsTrigger>
            <TabsTrigger 
              value="messaging"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
            >
              Voice & Messaging
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="mt-4 space-y-8">
          <TabsContent value="analytics" className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <MetricCard
                title="Audience Demographics"
                description="Real-time audience insights"
              >
                <ScrollArea className="h-[200px] pr-4">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Top Locations</p>
                      <div className="space-y-4">
                        <ProgressBar value={45} label="United States" sublabel="US" />
                        <ProgressBar value={25} label="United Kingdom" sublabel="UK" />
                        <ProgressBar value={15} label="Germany" sublabel="DE" />
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </MetricCard>

              <MetricCard
                title="Musical Identity"
                description="Genre and sound analysis"
              >
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm font-medium mb-2">Primary Genre</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                      Pop
                    </p>
                  </div>
                  <Separator className="my-4"/>
                  <div className="space-y-4">
                    <ProgressBar value={85} label="Energy" />
                    <ProgressBar value={60} label="Danceability" />
                  </div>
                </div>
              </MetricCard>

              <MetricCard
                title="Market Position"
                description="Competitive landscape"
              >
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
              </MetricCard>
            </div>
          </TabsContent>

          {/* Other tabs remain similar but use MetricCard component */}
          {/* ... */}
        </div>
      </Tabs>
    </>
  )
} 