import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.openapi.docs import get_swagger_ui_html
from openai import OpenAI
import replicate
from replicate.helpers import FileOutput

load_dotenv()

app = FastAPI(title="Music Copilot: AI Manager for Musicians")
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
