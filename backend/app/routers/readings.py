from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.crud.readings import (
    create_reading,
    delete_reading,
    get_reading,
    get_readings_by_book,
    update_reading,
)
from app.database import get_db
from app.schemas.reading import ReadingCreate, ReadingResponse


router = APIRouter(
    prefix="/readings",
    tags=["Readings"],
)


@router.get("/book/{book_id}", response_model=list[ReadingResponse])
def read_readings_by_book(book_id: int, db: Session = Depends(get_db)):
    return get_readings_by_book(db, book_id)


@router.get("/{reading_id}", response_model=ReadingResponse)
def read_reading(reading_id: int, db: Session = Depends(get_db)):
    reading = get_reading(db, reading_id)

    if reading is None:
        raise HTTPException(status_code=404, detail="Reading not found")

    return reading


@router.post("/", response_model=ReadingResponse, status_code=201)
def add_reading(reading: ReadingCreate, db: Session = Depends(get_db)):
    return create_reading(db, reading)


@router.put("/{reading_id}", response_model=ReadingResponse)
def edit_reading(reading_id: int, reading: ReadingCreate, db: Session = Depends(get_db)):
    db_reading = get_reading(db, reading_id)

    if db_reading is None:
        raise HTTPException(status_code=404, detail="Reading not found")

    return update_reading(db, db_reading, reading)


@router.delete("/{reading_id}", status_code=204)
def remove_reading(reading_id: int, db: Session = Depends(get_db)):
    db_reading = get_reading(db, reading_id)

    if db_reading is None:
        raise HTTPException(status_code=404, detail="Reading not found")

    delete_reading(db, db_reading)