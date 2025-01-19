# Music Artist Agents - Enhanced MVP Specification

## System Overview
Two AI-powered agents that generate actionable branding and social media content for music artists, focused on immediate implementation and value delivery.

## Tech Stack
- Backend: FastAPI
- Frontend: Next.js
- AI: OpenAI GPT-4o
- APIs: Spotify, Instagram Basic Display API
- Database: PostgreSQL (for caching and user data)

## 1. Branding Agent

### Inputs
1. Required:
   - Spotify link
   - instagram profile
   - Sample lyrics or song descriptions
   - Upcoming release type (single/EP/album)

2. Optional:
   - Current brand colors (hex codes) 
   - Style preferences (e.g., minimalist, bold, etc.)

### Data Collection Process
1. Spotify API Calls:
   - Artist Profile Analysis:
     - Primary and secondary genres
     - Monthly listener count and top markets
     - Artist popularity score
     - Total follower count
   
   - Top Tracks Analysis:
     - Top 10 performing tracks
     - Audio features analysis (tempo, valence, danceability, energy)
     - Track popularity trends
     - Release date patterns
   
   - Market Analysis:
     - Geographic distribution of listeners
     - Top performing territories
     - Market-specific track performance
   
   - Related Artists Analysis:
     - Genre overlap analysis
     - Shared audience metrics
     - Competitive positioning

2. Additional Analysis:
   - Genre trend mapping
   - Audience demographic profiling
   - Cross-platform performance correlation
   - Brand differentiation opportunities

### Outputs

1. Brand Analytics & Insights:
   - Audience Demographics:
     - Age and gender distribution
     - Top 5 listener locations with percentages
     - Peak listening hours and days
   
   - Musical Identity Analysis:
     - Genre positioning map
     - Sound signature breakdown (based on audio features)
     - Trending musical elements in their genre
   
   - Competitive Landscape:
     - Direct competitor comparison
     - Market gap opportunities
     - Unique selling propositions

2. Brand Identity:
   - Core brand narrative (2-3 sentences)
   - Artist positioning statement
   - Top 3 brand personality traits
   - Target audience personas (2-3 detailed profiles)
   - Brand archetype identification

3. Visual Guidelines:
   - Color palette (primary, secondary, accent colors with hex codes)
   - Typography recommendations (2 font pairings)
   - Photography style guide with mood board
   - Instagram grid layout strategy
   - Visual do's and don'ts checklist

4. Voice and Messaging:
   - Tone of voice guide with examples for different platforms
   - Key messaging pillars (3-5)
   - Content themes aligned with audience interests
   - Response templates for fan engagement
   - Hashtag strategy (branded & community)

5. Growth Strategy Recommendations:
   - Platform-specific growth opportunities
   - Collaboration suggestions based on audience overlap
   - Content gap analysis
   - Engagement rate benchmarks
   - Seasonal trend calendar

## 2. Social Content Agent

### Inputs
1. Required:
   - Branding agent output
   - Instagram handle
   - Content objective (awareness/engagement/conversion)
   - Preferred video length (15/30/60 seconds)

2. Optional:
   - Existing top-performing content URLs
   - Specific announcements/news to promote
   - Release dates or important events

### Data Collection Process
1. Instagram API:
   - Account basic metrics
   - Best performing content types
   - Optimal posting times
   - Top-performing hashtags

2. Content Analysis:
   - Trending audio analysis
   - Hashtag performance check
   - Competitor content review

### Outputs

1. Reel Production Plan:

   - Lighting and location recommendations
   - Music selection guidelines
   - Text overlay timing suggestions

2. Content Package:
   - Primary caption with hook
   - 15 relevant hashtags (sorted by reach)
   - 2 CTA options
   - 3 engagement question alternatives

3. Performance Guidelines:
   - Optimal posting time window
   - First-hour engagement targets
   - Response templates for comments


## Implementation Features

### Frontend Interfaces

1. Artist Setup Screen:
   - Spotify artist search
   - Basic info collection form
   - Instagram account connection
   - Brand preferences input

2. Branding Dashboard:
   - Brand identity display
   - Visual guidelines viewer
   - Export options (PDF/PNG)
   - Brand update requests

3. Content Generation Screen:
   - Reel concept generator
   - Caption preview/editor
   - Hashtag management
   - Publishing scheduler

### Backend Endpoints

1. Branding API:
   ```
   POST /api/v1/branding/generate
   POST /api/v1/branding/update
   GET /api/v1/branding/{artist_id}
   ```

2. Content API:
   ```
   POST /api/v1/content/reel/generate
   POST /api/v1/content/hashtags
   GET /api/v1/content/analytics
   ```

## MVP Success Metrics

1. Brand Consistency:
   - Brand guideline completion rate
   - Brand element usage tracking
   - Style guide adherence score

2. Content Performance:
   - Reel completion rates
   - Hashtag reach effectiveness
   - Engagement rate comparison

3. User Value:
   - Time saved in content creation
   - Brand asset utilization
   - Platform growth metrics