from fastapi import FastAPI

app = FastAPI(title="ReadTrack API")


@app.get("/")
def root():
    return {"message": "ReadTrack API is running!"}