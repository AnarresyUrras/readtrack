from datetime import date

from pydantic import BaseModel, ConfigDict, Field

from app.models.enums import BookFormat
from app.schemas.author import AuthorResponse
from app.schemas.reading import ReadingResponse

class BookBase(BaseModel):
    title: str
    isbn: str | None = None
    pages: int | None = Field(default=None, gt=0)
    author_id: int
    genre: str | None = None
    year: int | None = None
    language: str | None = None
    publisher: str | None = None
    category: str | None = None
    format: BookFormat | None = None


class BookCreate(BookBase):
    start_reading: date | None = None
    finish_reading: date | None = None
    rating: int | None = Field(default=None, ge=1, le=5)
    notes: str | None = None
    new_author: bool = False


class BookResponse(BookBase):
    id: int
    author: AuthorResponse
    readings: list[ReadingResponse] = []

    model_config = ConfigDict(from_attributes=True)