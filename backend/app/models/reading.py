from datetime import date
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Enum as SAEnum
from app.models.enums import ReadingStatus

from app.database import Base

if TYPE_CHECKING:
    from app.models.book import Book


class Reading(Base):
    __tablename__ = "readings"

    id: Mapped[int] = mapped_column(primary_key=True)
    book_id: Mapped[int] = mapped_column(ForeignKey("books.id"), nullable=False)

    status: Mapped[ReadingStatus] = mapped_column(
        SAEnum(ReadingStatus, name="reading_status"), nullable=False
    )
    start_reading: Mapped[date | None] = mapped_column(nullable=True)
    finish_reading: Mapped[date | None] = mapped_column(nullable=True)
    rating: Mapped[int | None] = mapped_column(nullable=True)
    notes: Mapped[str | None] = mapped_column(nullable=True)
    new_author: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    book: Mapped["Book"] = relationship(back_populates="readings")