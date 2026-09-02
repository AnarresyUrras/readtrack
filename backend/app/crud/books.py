from datetime import date
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.book import Book
from app.schemas.book import BookCreate
from app.models.reading import Reading
from app.models.enums import ReadingStatus


def get_books(db: Session) -> list[Book]:
    statement = select(Book).order_by(Book.id)
    return list(db.scalars(statement).all())


def get_book(db: Session, book_id: int) -> Book | None:
    return db.get(Book, book_id)

def _derive_reading_status(start_reading: date | None, finish_reading: date | None) -> ReadingStatus | None:
    if finish_reading is not None:
        return ReadingStatus.read
    if start_reading is not None:
        return ReadingStatus.reading
    return None 

def create_book(db: Session, book: BookCreate) -> Book:
    db_book = Book(
        title=book.title,
        isbn=book.isbn,
        pages=book.pages,
        author_id=book.author_id,
        genre=book.genre,
        year=book.year,
        language=book.language,
        publisher=book.publisher,
        category=book.category,
        format=book.format,
    )

    db.add(db_book)
    db.flush()
    
    status = _derive_reading_status(book.start_reading, book.finish_reading)
    if status is not None:
        db_reading = Reading(
            book_id=db_book.id,
            status=status,
            start_reading=book.start_reading,
            finish_reading=book.finish_reading,
            rating=book.rating,
            notes=book.notes,
            new_author=book.new_author,
        )
        db.add(db_reading)
        
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
    db_book.genre = book.genre
    db_book.year = book.year
    db_book.language = book.language
    db_book.publisher = book.publisher
    db_book.category = book.category
    db_book.format = book.format

    db.commit()
    db.refresh(db_book)

    return db_book

def book_has_readings(db: Session, book_id: int) -> bool:
    statement = select(Reading).where(Reading.book_id == book_id).limit(1)
    return db.scalars(statement).first() is not None


def delete_book(db: Session, db_book: Book) -> None:
    db.delete(db_book)
    db.commit()