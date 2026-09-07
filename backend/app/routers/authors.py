from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.crud.authors import (
    author_has_books,
    create_author,
    delete_author,
    find_or_create_author,
    get_author,
    get_authors,
    update_author,
)
from app.database import get_db
from app.schemas.author import (
    AuthorCreate,
    AuthorResponse,
    AuthorFindOrCreate,
    AuthorMatchResult,
)


router = APIRouter(
    prefix="/authors",
    tags=["Authors"],
)


@router.get("/", response_model=list[AuthorResponse])
def read_authors(db: Session = Depends(get_db)):
    return get_authors(db)


@router.get("/{author_id}", response_model=AuthorResponse)
def read_author(author_id: int, db: Session = Depends(get_db)):
    author = get_author(db, author_id)

    if author is None:
        raise HTTPException(
            status_code=404,
            detail="Author not found",
        )

    return author


@router.post("/", response_model=AuthorResponse, status_code=201)
def add_author(author: AuthorCreate, db: Session = Depends(get_db)):
    return create_author(db, author)


@router.post("/find-or-create", response_model=AuthorMatchResult)
def find_or_create(data: AuthorFindOrCreate, db: Session = Depends(get_db)):
    return find_or_create_author(db, data)


@router.delete("/{author_id}", status_code=204)
def remove_author(author_id: int, db: Session = Depends(get_db)):
    author = get_author(db, author_id)

    if author is None:
        raise HTTPException(status_code=404, detail="Author not found")

    if author_has_books(db, author_id):
        raise HTTPException(status_code=400, detail="Cannot delete author with associated books",
        )
        
    delete_author(db, author)

@router.put("/{author_id}", response_model=AuthorResponse)
def edit_author(
    author_id: int,
    author: AuthorCreate,
    db: Session = Depends(get_db),
):
    db_author = get_author(db, author_id)

    if db_author is None:
        raise HTTPException(status_code=404, detail="Author not found")

    return update_author(db, db_author, author)