from datetime import date

from pydantic import BaseModel, ConfigDict, Field

from app.models.enums import ReadingStatus


class ReadingBase(BaseModel):
    status: ReadingStatus
    start_reading: date | None = None
    finish_reading: date | None = None
    rating: int | None = Field(default=None, ge=1, le=5)
    notes: str | None = None
    new_author: bool = False


class ReadingCreate(ReadingBase):
    book_id: int


class ReadingResponse(ReadingBase):
    id: int
    book_id: int

    model_config = ConfigDict(from_attributes=True)