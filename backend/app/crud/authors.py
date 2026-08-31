from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.author import Author
from app.schemas.author import AuthorCreate


def get_authors(db: Session) -> list[Author]:
    statement = select(Author).order_by(Author.name)
    return list(db.scalars(statement).all())


def get_author(db: Session, author_id: int) -> Author | None:
    return db.get(Author, author_id)


def create_author(db: Session, author: AuthorCreate) -> Author:
    db_author = Author(name=author.name)

    db.add(db_author)
    db.commit()
    db.refresh(db_author)

    return db_author


def delete_author(db: Session, author: Author) -> None:
    db.delete(author)
    db.commit()