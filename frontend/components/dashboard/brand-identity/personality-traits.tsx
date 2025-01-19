import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PersonalityTraitsProps {
  traits: string[]
}

export function PersonalityTraits({ traits }: PersonalityTraitsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Brand Personality Traits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {traits.map((trait, index) => (
            <Badge key={index} variant="secondary" className="text-base px-4 py-2">
              {trait}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 