import { ArtistSetupForm } from "@/components/forms/artist-setup-form"

export default function SetupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="container max-w-3xl px-4 py-16 mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">Artist Setup</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tell us about yourself and your music. This information will help us create a unique brand identity and content strategy for you.
          </p>
        </div>
        <div className="bg-card rounded-lg shadow-lg p-8">
          <ArtistSetupForm />
        </div>
      </div>
    </div>
  )
} 