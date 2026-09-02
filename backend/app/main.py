from fastapi import FastAPI

from app.routers import authors, books, readings


app = FastAPI(
    title="ReadTrack API",
    version="0.1.0",
)

app.include_router(books.router)
app.include_router(authors.router)
app.include_router(readings.router)

@app.get("/")
def root():
    return {"message": "ReadTrack API"}