import os
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
from typing import List

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

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Initialize Spotify client
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

class BrandIdentityRequest(BaseModel):
    spotify_url: str
    song_lyrics: str
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
            model="gpt-4o-mini",
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
        output = replicate.run(
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
        output = replicate.run(
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
    Generate branding guidelines based on a Spotify track URL
    """
    try:
        # Extract track ID from URL
        track_id = track_url.split("/")[-1].split("?")[0]
        
        # Get track details using existing function
        track_details = await get_track_details(track_id)
        
        # Prepare prompt for OpenAI
        prompt = f"""Generate 2-3 concise sentences of branding guidelines for the song '{track_details['name']}' by {track_details['artists'][0]}.
        Consider the song's genre, mood, and artistic style. Focus on visual and brand identity elements that would resonate with the music."""
        
        # Generate branding guidelines using OpenAI
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a professional brand strategist with expertise in music marketing."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=150
        )
        
        return {
            "track": track_details,
            "branding_guidelines": response.choices[0].message.content.strip()
        }
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

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

        # Read the prompt template
        prompt_template = open("prompt-brand-identity.txt", "r").read()
                
        # Format the prompt
        prompt = prompt_template.replace("{ song_name }", song_name)
        prompt = prompt.replace("{ artist_names }", artist_names)
        prompt = prompt.replace("{ song_lyrics }", request.song_lyrics)
        prompt = prompt.replace("{ genre_description }", request.genre_description)

        # Initialize the Pydantic output parser
        parser = PydanticOutputParser(pydantic_object=BrandIdentityOutput)
        format_instructions = parser.get_format_instructions()


        # Add format instructions to the prompt
        prompt_with_format = f"{prompt}\n\nPlease provide your response in the following format:\n{format_instructions}"
                
        # Generate brand identity using GPT-4
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": prompt_with_format},
                {"role": "user", "content": "Please generate the brand identity based on the provided information."}
            ],
            temperature=0.7
        )
        
        # Parse the response into structured format
        parsed_response = parser.parse(response.choices[0].message.content)
        
        # Convert to dictionary for JSON response
        structured_response = parsed_response.dict()
        
        return {"brand_identity": structured_response}
        
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
