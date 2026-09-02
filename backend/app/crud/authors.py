from sqlalchemy import select, func
from sqlalchemy.orm import Session

from app.models.author import Author
from app.schemas.author import AuthorFindOrCreate, AuthorMatchResult, AuthorCreate
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

def find_or_create_author(db: Session, data: AuthorFindOrCreate) -> AuthorMatchResult:
    normalized_name = data.name.strip()

    statement = select(Author).where(func.lower(Author.name) == normalized_name.lower())
    existing = db.scalars(statement).first()
    if existing:
        return AuthorMatchResult(status="found", author=existing)

    # 2. Si no forzamos creación, buscar sugerencias por apellido
    if not data.force_create:
        surname = _extract_surname(normalized_name)
        if surname:
            statement = select(Author).where(Author.name.ilike(f"%{surname}%"))
            candidates = list(db.scalars(statement).all())
            if candidates:
                return AuthorMatchResult(status="suggestions", suggestions=candidates)

    # 3. No hay match ni sugerencias (o se forzó creación) -> crear
    new_author = create_author(db, data)
    return AuthorMatchResult(status="created", author=new_author)


def _extract_surname(name: str) -> str | None:
    words = [w.strip(".") for w in name.split()]
    meaningful = [w for w in words if len(w) > 2]
    return meaningful[-1] if meaningful else None