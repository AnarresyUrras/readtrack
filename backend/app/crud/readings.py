from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.reading import Reading
from app.schemas.reading import ReadingCreate


def get_readings_by_book(db: Session, book_id: int) -> list[Reading]:
    statement = select(Reading).where(Reading.book_id == book_id).order_by(Reading.id)
    return list(db.scalars(statement).all())


def get_reading(db: Session, reading_id: int) -> Reading | None:
    return db.get(Reading, reading_id)


def create_reading(db: Session, reading: ReadingCreate) -> Reading:
    db_reading = Reading(
        book_id=reading.book_id,
        status=reading.status,
        start_reading=reading.start_reading,
        finish_reading=reading.finish_reading,
        rating=reading.rating,
        notes=reading.notes,
        new_author=reading.new_author,
    )
    db.add(db_reading)
    db.commit()
    db.refresh(db_reading)
    return db_reading


def update_reading(db: Session, db_reading: Reading, reading: ReadingCreate) -> Reading:
    db_reading.status = reading.status
    db_reading.start_reading = reading.start_reading
    db_reading.finish_reading = reading.finish_reading
    db_reading.rating = reading.rating
    db_reading.notes = reading.notes
    db_reading.new_author = reading.new_author

    db.commit()
    db.refresh(db_reading)
    return db_reading


def delete_reading(db: Session, db_reading: Reading) -> None:
    db.delete(db_reading)
    db.commit()