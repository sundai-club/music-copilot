export interface PersonaModel {
  age: string
  lifestyle: string
  music_preferences: string
  social_media_habits: string
}

export interface BrandIdentityOutput {
  core_song_narrative: string
  artist_positioning_statement: string
  brand_personality_traits: string[]
  target_audience_personas: PersonaModel[]
}

export interface BrandIdentityResponse {
  brand_identity: BrandIdentityOutput
} 