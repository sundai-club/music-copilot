import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CoreNarrativeProps {
  narrative: string
}

export function CoreNarrative({ narrative }: CoreNarrativeProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Core Song Narrative</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{narrative}</p>
      </CardContent>
    </Card>
  )
} 