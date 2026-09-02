from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.author import Author
from app.schemas.author import AuthorCreate
from app.models.book import Book


def get_authors(db: Session) -> list[Author]:
    statement = select(Author).order_by(Author.name)
    return list(db.scalars(statement).all())


def get_author(db: Session, author_id: int) -> Author | None:
    return db.get(Author, author_id)


def create_author(db: Session, author: AuthorCreate) -> Author:
    db_author = Author(
        name=author.name,
        author_gender=author.author_gender,
        country=author.country,
    )

    db.add(db_author)
    db.commit()
    db.refresh(db_author)    
    return db_author

def update_author(db: Session, db_author: Author, author: AuthorCreate) -> Author:
    db_author.name = author.name
    db.commit()
    db.refresh(db_author)
    return db_author

def author_has_books(db: Session, author_id: int) -> bool:
    statement = select(Book).where(Book.author_id == author_id).limit(1)
    return db.scalars(statement).first() is not None


def delete_author(db: Session, author: Author) -> None:
    db.delete(author)
    db.commit()