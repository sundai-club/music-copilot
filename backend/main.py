import os
import requests
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.docs import get_swagger_ui_html
from openai import OpenAI
import replicate
from replicate.helpers import FileOutput
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from pydantic import BaseModel
from langchain.output_parsers import PydanticOutputParser
from pydantic import BaseModel, Field
from typing import List, Optional
from bs4 import BeautifulSoup

load_dotenv()

app = FastAPI(title="Music Copilot: AI Manager for Musicians")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Initialize clients
spotify_client_id = os.getenv("SPOTIFY_CLIENT_ID")
spotify_client_secret = os.getenv("SPOTIFY_CLIENT_SECRET")

if not spotify_client_id or not spotify_client_secret:
    raise ValueError(
        "Spotify credentials not found. Please make sure SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET "
        "are set in your .env file. You can get these from https://developer.spotify.com/dashboard"
    )

try:
    spotify = spotipy.Spotify(auth_manager=SpotifyClientCredentials(
        client_id=spotify_client_id,
        client_secret=spotify_client_secret
    ))
except Exception as e:
    print(f"Error initializing Spotify client: {str(e)}")
    raise

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
replicate_client = replicate.Client(api_token=os.getenv("REPLICATE_API_TOKEN"))

class BrandIdentityRequest(BaseModel):
    spotify_url: str
    song_lyrics: Optional[str] = ""
    genre_description: str

class PersonaModel(BaseModel):
    age: str = Field(description="Age range of the persona")
    lifestyle: str = Field(description="Lifestyle description")
    music_preferences: str = Field(description="Music preferences and habits")
    social_media_habits: str = Field(description="Social media behavior and patterns")

class BrandIdentityOutput(BaseModel):
    core_song_narrative: str = Field(description="2-3 sentence description of the song's essence")
    artist_positioning_statement: str = Field(description="Concise statement about artist positioning")
    brand_personality_traits: List[str] = Field(description="Top 3 brand personality traits")
    target_audience_personas: List[PersonaModel] = Field(description="2-3 detailed listener profiles")

class BrandIdentityResponse(BaseModel):
    brand_identity: BrandIdentityOutput

class InstagramPostRequest(BaseModel):
    track_url: str
    style_preference: Optional[str] = Field(
        default="modern",
        description="Style preference for the post (e.g., modern, vintage, minimalist)"
    )

class InstagramPost(BaseModel):
    caption: str = Field(description="Engaging caption for the Instagram post")
    hashtags: List[str] = Field(description="List of relevant hashtags")
    photo_concept: str = Field(description="Description of the photo concept")
    visual_style: str = Field(description="Style guidelines for the photo")
    image_url: str = Field(description="URL of the generated image")

class InstagramPostResponse(BaseModel):
    post: InstagramPost

@app.get("/")
async def root():
    return {"message": "Welcome to the Music Copilot API! Docs: https://music-copilot.onrender.com/api/docs"}

@app.get("/api/docs", include_in_schema=False)
async def get_documentation():
    return get_swagger_ui_html(openapi_url="/openapi.json", title="docs")


@app.get("/random")
async def get_random_idea():
    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are a creative music assistant. Generate a random, innovative musical idea."},
                {"role": "user", "content": "Give me a random musical idea in 2-3 sentences. Be specific and creative."}
            ],
            temperature=0.9,  # Higher temperature for more randomness
            max_tokens=150
        )
        return {"idea": response.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/cover")
async def generate_cover(title: str):
    try:
        # Using Replicate's Flux model to generate album cover
        output = replicate_client.run(
            "black-forest-labs/flux-1.1-pro",
            input={
                "prompt": f"album cover for song titled '{title}', modern, artistic, high quality",
                "negative_prompt": "text, words, letters, low quality, blurry",
                "num_inference_steps": 30,
                "guidance_scale": 7.5
            }
        )
        
        # Flux model returns a list with one URL
        if output and isinstance(output, FileOutput):
            return {"image_url": output.url}
        else:
            raise HTTPException(status_code=500, detail="Failed to generate image")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/spotify/search")
async def search_spotify(query: str, limit: int = 10):
    """
    Search for tracks on Spotify
    """
    try:
        results = spotify.search(q=query, limit=limit, type='track')
        tracks = results['tracks']['items']
        
        formatted_tracks = [{
            'id': track['id'],
            'name': track['name'],
            'artists': [artist['name'] for artist in track['artists']],
            'album': track['album']['name'],
            'preview_url': track['preview_url'],
            'external_url': track['external_urls']['spotify'],
            'image_url': track['album']['images'][0]['url'] if track['album']['images'] else None
        } for track in tracks]
        
        return {"tracks": formatted_tracks}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/spotify/track/{track_id}")
async def get_track_details(track_id: str):
    """
    Get detailed information about a specific track
    """
    try:
        track = spotify.track(track_id)
        
        # Get audio features separately and handle potential failure
        try:
            audio_features = spotify.audio_features([track_id])[0]
        except Exception as audio_feat_error:
            print(f"Failed to get audio features: {str(audio_feat_error)}")
            audio_features = None
        
        track_info = {
            'id': track['id'],
            'name': track['name'],
            'artists': [artist['name'] for artist in track['artists']],
            'album': track['album']['name'],
            'release_date': track['album']['release_date'],
            'duration_ms': track['duration_ms'],
            'preview_url': track['preview_url'],
            'external_url': track['external_urls']['spotify'],
            'image_url': track['album']['images'][0]['url'] if track['album']['images'] else None,
            'popularity': track['popularity']
        }
        
        if audio_features:
            track_info['audio_features'] = {
                'danceability': audio_features['danceability'],
                'energy': audio_features['energy'],
                'key': audio_features['key'],
                'loudness': audio_features['loudness'],
                'mode': audio_features['mode'],
                'tempo': audio_features['tempo'],
                'time_signature': audio_features['time_signature'],
                'valence': audio_features['valence']
            }
        
        return track_info
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching track details: {str(e)}. Please ensure your Spotify credentials are correct."
        )

@app.get("/api/spotify/cover")
async def generate_spotify_cover(track_url: str):
    """
    Generate cover art based on a Spotify track URL
    """
    try:
        # Extract track ID from URL
        if "spotify.com/track/" not in track_url:
            raise HTTPException(status_code=400, detail="Invalid Spotify track URL")
        
        track_id = track_url.split("track/")[1].split("?")[0]
        
        # Get track details
        track = spotify.track(track_id)
        
        # Create a rich prompt using track information
        artist_names = ", ".join([artist["name"] for artist in track["artists"]])
        prompt = f"album cover for '{track['name']}' by {artist_names}, capturing the essence of the song, modern artistic style, high quality"
        
        # Generate cover using Replicate
        output = replicate_client.run(
            "black-forest-labs/flux-1.1-pro",
            input={
                "prompt": prompt,
                "negative_prompt": "text, words, letters, low quality, blurry",
                "num_inference_steps": 30,
                "guidance_scale": 7.5
            }
        )
        
        # Return both the generated image and track details
        if output and isinstance(output, FileOutput):
            return {
                "image_url": output.url,
                "track": {
                    "name": track["name"],
                    "artists": artist_names,
                    "album": track["album"]["name"],
                    "original_cover": track["album"]["images"][0]["url"] if track["album"]["images"] else None
                }
            }
        else:
            raise HTTPException(status_code=500, detail="Failed to generate image")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/brand")
async def generate_brand_guidelines(track_url: str):
    """
    Generate branding guidelines and AI cover art based on a Spotify track URL
    """
    try:
        # Extract track ID from URL
        track_id = track_url.split("/")[-1].split("?")[0]
        
        # Get track details using existing function
        track_details = await get_track_details(track_id)
        
        # Generate AI cover art
        cover_response = await generate_cover(track_details['name'])
        
        # Prepare prompt for OpenAI
        prompt = f"""Generate 2-3 concise sentences of branding guidelines for the song '{track_details['name']}' by {track_details['artists'][0]}.
        Consider the song's genre, mood, and artistic style. Focus on visual and brand identity elements that would resonate with the music."""
        
        # Generate branding guidelines using OpenAI
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are a professional brand strategist with expertise in music marketing."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=150
        )
        
        # Create a simplified track details object without Spotify cover
        simplified_track = {
            'id': track_details['id'],
            'name': track_details['name'],
            'artists': track_details['artists'],
            'album': track_details['album'],
            'external_url': track_details['external_url']
        }
        
        return {
            "track": simplified_track,
            "branding_guidelines": response.choices[0].message.content.strip(),
            "cover_image": cover_response["image_url"]
        }
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


def search_genius(track_name, artist_name):
    """
    Search for a song on Genius
    """
    base_url = "https://api.genius.com"
    genius_token = os.getenv("GENIUS_TOKEN")
    headers = {'Authorization': f'Bearer {genius_token}'}
    search_url = f"{base_url}/search"
    
    try:
        response = requests.get(
            search_url,
            params={'q': f"{track_name} {artist_name}"},
            headers=headers
        )
        response.raise_for_status()
        
        return response.json()
    except Exception as e:
        raise Exception(f"Error searching Genius: {str(e)}")

def extract_lyrics_from_genius(genius_url):
    """
    Extract lyrics from Genius webpage
    """
    try:
        # Add headers to mimic browser request
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(genius_url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Try different possible lyrics containers
        lyrics_div = soup.find('div', class_='lyrics')
        if not lyrics_div:
            lyrics_div = soup.find('div', class_='Lyrics__Container-sc-1ynbvzw-6')
        if not lyrics_div:
            # Find all lyric containers if the above methods fail
            lyrics_divs = soup.find_all('div', {'data-lyrics-container': 'true'})
            if lyrics_divs:
                lyrics = '\n'.join([div.get_text() for div in lyrics_divs])
                return lyrics
        
        if lyrics_div:
            lyrics = lyrics_div.get_text()
            # Clean up lyrics
            return '\n'.join(line.strip() for line in lyrics.split('\n') if line.strip())
        
        return None
    except Exception as e:
        raise Exception(f"Error extracting lyrics: {str(e)}")


def get_lyrics(song_name, artist_names):
    """
    Main method to get lyrics from Spotify URL
    """
    try:
        
        # Search for the song on Genius
        genius_response = search_genius(
            song_name,
            artist_names
        )
        
        # Process Genius response
        if 'response' in genius_response and genius_response['response']['hits']:
            song_info = genius_response['response']['hits'][0]['result']
            
            # Get lyrics from Genius page
            lyrics = extract_lyrics_from_genius(song_info['url'])
            
            return lyrics if lyrics else ""

        return ""

    except Exception as e:
        return ""

@app.post("/api/brand-identity")
async def generate_brand_identity(request: BrandIdentityRequest) -> BrandIdentityResponse:
    try:
        # Get track details from Spotify URL
        track_id = request.spotify_url.split("/")[-1].split("?")[0]
        
        # Get track details
        track = spotify.track(track_id)
        
        # Create a rich prompt using track information
        artist_names = ", ".join([artist["name"] for artist in track["artists"]])
        song_name = track["name"]
        album_name = track["album"]["name"]
        print(track)

        song_lyrics = request.song_lyrics

        if not song_lyrics:
            try:
                song_lyrics = get_lyrics(song_name, artist_names)
                print(song_lyrics)
            except Exception as e:
                print(e)
        
        print(song_lyrics)
        # Read the prompt template
        prompt_template = open("prompt-brand-identity.txt", "r").read()
                
        # Format the prompt
        prompt = prompt_template
        prompt = prompt.replace("{ song_name }", song_name)
        prompt = prompt.replace("{ album_name }", album_name)
        prompt = prompt.replace("{ artist_names }", artist_names)
        prompt = prompt.replace("{ song_lyrics }", song_lyrics)
        prompt = prompt.replace("{ genre_description }", request.genre_description)

        # Initialize the Pydantic output parser
        parser = PydanticOutputParser(pydantic_object=BrandIdentityOutput)
        format_instructions = parser.get_format_instructions()

        # Add format instructions to the prompt
        prompt_with_format = f"{prompt}\n\nPlease provide your response in the following format:\n{format_instructions}"
                
        # Generate brand identity using GPT-4
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": prompt_with_format},
                {"role": "user", "content": "Please generate the brand identity based on the provided information."}
            ],
            temperature=0.7
        )
        
        # Parse the response into structured format
        parsed_response = parser.parse(response.choices[0].message.content)
        
        # Return proper BrandIdentityResponse object
        return BrandIdentityResponse(brand_identity=parsed_response)
        
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/instagram-post", response_model=InstagramPostResponse)
async def generate_instagram_post(request: InstagramPostRequest):
    """
    Generate an Instagram post concept based on a Spotify track
    """
    try:
        # Get track ID from URL
        track_id = request.track_url.split('/')[-1].split('?')[0]
        
        # Get track details directly from Spotify
        track = spotify.track(track_id)
        
        # Get track genre from Spotify artist data
        artist_id = track['artists'][0]['id']
        artist = spotify.artist(artist_id)
        genre_description = ", ".join(artist['genres']) if artist['genres'] else "contemporary"
        
        # Generate brand identity for context
        brand_identity_response = await generate_brand_identity(BrandIdentityRequest(
            spotify_url=request.track_url,
            genre_description=genre_description
        ))
        
        # Create prompt for Instagram post generation
        prompt = f"""Create an engaging Instagram post for this song:
        
Song: {track['name']}
Artist: {track['artists'][0]['name']}
Brand Identity: {brand_identity_response.brand_identity.core_song_narrative}
Style Preference: {request.style_preference}

Generate:
1. An attention-grabbing caption that reflects the song's essence
2. A list of 15 relevant hashtags
3. A creative photo concept that aligns with the song's mood
4. Visual style guidelines for the photo

Keep the caption engaging but concise, include emojis naturally, and ensure hashtags are trending and relevant."""

        # Generate Instagram post content using OpenAI
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are an expert social media manager specializing in music promotion."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7
        )
        
        # Parse the response
        content = response.choices[0].message.content
        
        # Extract different components using simple parsing
        sections = content.split('\n\n')
        caption = ""
        hashtags = []
        photo_concept = ""
        visual_style = ""
        
        for section in sections:
            if section.lower().startswith('caption:'):
                caption = section.replace('Caption:', '').strip()
            elif section.lower().startswith('hashtags:'):
                hashtags_text = section.replace('Hashtags:', '').strip()
                hashtags = [tag.strip() for tag in hashtags_text.split('#') if tag.strip()]
            elif section.lower().startswith('photo concept:'):
                photo_concept = section.replace('Photo Concept:', '').strip()
            elif section.lower().startswith('visual style:'):
                visual_style = section.replace('Visual Style:', '').strip()
        
        # Generate image using Replicate's Flux model
        image_prompt = f"{photo_concept}. {visual_style}. modern, artistic, high quality"
        output = replicate_client.run(
            "black-forest-labs/flux-1.1-pro",
            input={
                "prompt": image_prompt,
                "num_inference_steps": 50,
                "guidance_scale": 7.5,
                "negative_prompt": "low quality, blurry, distorted, disfigured, bad art, poor lighting",
                "width": 768,
                "height": 768,
            }
        )
        
        # Get the image URL from the output
        image_url = output.url if isinstance(output, FileOutput) and output else ""
        
        return InstagramPostResponse(
            post=InstagramPost(
                caption=caption,
                hashtags=hashtags,
                photo_concept=photo_concept,
                visual_style=visual_style,
                image_url=image_url
            )
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
