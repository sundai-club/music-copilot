# Setup

## Install dependencies:
```bash
virtualenv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

# Running the Application

Start the server with:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, you can access:
- Swagger UI documentation at `http://localhost:8000/api/docs`
