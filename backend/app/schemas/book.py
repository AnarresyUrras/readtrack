from datetime import date

from pydantic import BaseModel, ConfigDict, Field


class BookBase(BaseModel):
    title: str
    isbn: str | None = None
    pages: int | None = Field(default=None, gt=0)
    author_id: int
    status: str
    start_reading: date | None = None
    finish_reading: date | None = None
    rating: int | None = Field(default=None, ge=1, le=5)
    notes: str | None = None


class BookCreate(BookBase):
    pass


class BookResponse(BookBase):
    id: int

    model_config = ConfigDict(from_attributes=True)