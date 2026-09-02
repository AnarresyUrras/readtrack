from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.crud.books import (
    create_book,
    delete_book,
    get_book,
    get_books,
    update_book,
    book_has_readings
)
from app.database import get_db
from app.schemas.book import BookCreate, BookResponse


router = APIRouter(
    prefix="/books",
    tags=["Books"],
)


@router.get("/", response_model=list[BookResponse])
def read_books(db: Session = Depends(get_db)):
    return get_books(db)


@router.get("/{book_id}", response_model=BookResponse)
def read_book(book_id: int, db: Session = Depends(get_db)):
    book = get_book(db, book_id)

    if book is None:
        raise HTTPException(
            status_code=404,
            detail="Book not found",
        )

    return book


@router.post("/", response_model=BookResponse, status_code=201)
def add_book(book: BookCreate, db: Session = Depends(get_db)):
    return create_book(db, book)


@router.put("/{book_id}", response_model=BookResponse)
def edit_book(
    book_id: int,
    book: BookCreate,
    db: Session = Depends(get_db),
):
    db_book = get_book(db, book_id)

    if db_book is None:
        raise HTTPException(
            status_code=404,
            detail="Book not found",
        )

    return update_book(db, db_book, book)


@router.delete("/{book_id}", status_code=204)
def remove_book(book_id: int, db: Session = Depends(get_db)):
    db_book = get_book(db, book_id)

    if db_book is None:
        raise HTTPException(
            status_code=404,
            detail="Book not found",
        )

    if book_has_readings(db, book_id):
        raise HTTPException(
            status_code=400,
            detail="Cannot delete book with associated readings. Delete its readings first.",
        )
        
    delete_book(db, db_book)