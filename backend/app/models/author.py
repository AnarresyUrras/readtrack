from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Enum as SAEnum
from app.models.enums import AuthorGender

from app.database import Base
if TYPE_CHECKING:
    from app.models.book import Book

class Author(Base):
    __tablename__ = "authors"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    books: Mapped[list["Book"]] = relationship(back_populates="author")
    author_gender: Mapped[AuthorGender | None] = mapped_column(
        SAEnum(AuthorGender, name="author_gender"),
        nullable=True)