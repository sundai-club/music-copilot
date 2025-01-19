import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.openapi.docs import get_swagger_ui_html
from openai import OpenAI
import replicate
from replicate.helpers import FileOutput
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

load_dotenv()

app = FastAPI(title="Music Copilot: AI Manager for Musicians")
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

@app.get("/")
async def root():
    return {"message": "Welcome to the Music Copilot API!"}

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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
