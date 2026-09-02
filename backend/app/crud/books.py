from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.book import Book
from app.schemas.book import BookCreate


def get_books(db: Session) -> list[Book]:
    statement = select(Book).order_by(Book.id)
    return list(db.scalars(statement).all())


def get_book(db: Session, book_id: int) -> Book | None:
    return db.get(Book, book_id)


def create_book(db: Session, book: BookCreate) -> Book:
    db_book = Book(
        title=book.title,
        isbn=book.isbn,
        pages=book.pages,
        author_id=book.author_id,
        status=book.status,
        start_reading=book.start_reading,
        finish_reading=book.finish_reading,
        rating=book.rating,
        notes=book.notes,
        genre=book.genre,
        year=book.year,
        language=book.language,
        publisher=book.publisher,
        category=book.category,
        format=book.format,
    )

    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book


def update_book(
    db: Session,
    db_book: Book,
    book: BookCreate,
) -> Book:
    db_book.title = book.title
    db_book.isbn = book.isbn
    db_book.pages = book.pages
    db_book.author_id = book.author_id
    db_book.status = book.status
    db_book.start_reading = book.start_reading
    db_book.finish_reading = book.finish_reading
    db_book.rating = book.rating
    db_book.notes = book.notes

    db.commit()
    db.refresh(db_book)

    return db_book


def delete_book(db: Session, db_book: Book) -> None:
    db.delete(db_book)
    db.commit()