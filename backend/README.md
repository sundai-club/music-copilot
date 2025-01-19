# Music Copilot Backend

Deployed at: https://music-copilot.onrender.com/api/docs

# Setup

## Install dependencies:
```bash
virtualenv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# add your API keys to .env
```

# Running the Application

## Locally:
```bash
python main.py
```

or

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, you can access:
- Swagger UI documentation at `http://localhost:8000/api/docs`
