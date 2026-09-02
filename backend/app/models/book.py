from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Enum as SAEnum
from app.models.enums import BookFormat

from app.database import Base

if TYPE_CHECKING:
    from app.models.author import Author
    from app.models.reading import Reading


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

    
    genre: Mapped[str | None] = mapped_column(String(100), nullable=True)    
    year: Mapped[int | None] = mapped_column(nullable=True)    
    language: Mapped[str | None] = mapped_column(String(50), nullable=True)    
    publisher: Mapped[str | None] = mapped_column(String(150), nullable=True)    
    category: Mapped[str | None] = mapped_column(String(100), nullable=True)    
    format: Mapped[BookFormat | None] = mapped_column(
        SAEnum(BookFormat, name="book_format"), nullable=True
    )

    author: Mapped["Author"] = relationship(back_populates="books")
    readings: Mapped[list["Reading"]] = relationship(back_populates="book")