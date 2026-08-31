from datetime import date
from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Enum as SAEnum
from app.models.enums import ReadingStatus

from app.database import Base

if TYPE_CHECKING:
    from app.models.author import Author


class Book(Base):
    __tablename__ = "books"

    id: Mapped[int] = mapped_column(primary_key=True)

    title: Mapped[str] = mapped_column(String(200), nullable=False)

    isbn: Mapped[str | None] = mapped_column(String(20), nullable=True)

    pages: Mapped[int | None] = mapped_column(nullable=True)

    author_id: Mapped[int] = mapped_column(
        ForeignKey("authors.id"),
        nullable=False
    )

    status: Mapped[ReadingStatus] = mapped_column(
        SAEnum(ReadingStatus, name="reading_status"),
        nullable=False
    )

    start_reading: Mapped[date | None] = mapped_column(nullable=True)

    finish_reading: Mapped[date | None] = mapped_column(nullable=True)

    rating: Mapped[int | None] = mapped_column(nullable=True)

    notes: Mapped[str | None] = mapped_column(nullable=True)

    author: Mapped["Author"] = relationship(back_populates="books")