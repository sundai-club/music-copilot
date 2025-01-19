import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PersonaModel } from "@/types/api"

interface AudiencePersonasProps {
  personas: PersonaModel[]
}

export function AudiencePersonas({ personas }: AudiencePersonasProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Target Audience Personas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {personas.map((persona, index) => (
            <Card key={index} className="bg-muted/50">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-1">Age Range</h4>
                    <p className="text-muted-foreground">{persona.age}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Lifestyle</h4>
                    <p className="text-muted-foreground">{persona.lifestyle}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Music Preferences</h4>
                    <p className="text-muted-foreground">{persona.music_preferences}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Social Media Habits</h4>
                    <p className="text-muted-foreground">{persona.social_media_habits}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 