from fastapi import FastAPI
from fastapi.openapi.docs import get_swagger_ui_html

app = FastAPI(title="Music Copilot: AI Manager for Musicians")

@app.get("/")
async def root():
    return {"message": "Welcome to the Music Copilot API!"}

@app.get("/api/docs", include_in_schema=False)
async def get_documentation():
    return get_swagger_ui_html(openapi_url="/openapi.json", title="docs")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
