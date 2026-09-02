"""add extended book and author fields

Revision ID: 2bacc4c9db9d
Revises: 406e617ae25c
Create Date: 2026-09-02 14:02:25.848359

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision: str = '2bacc4c9db9d'
down_revision: Union[str, Sequence[str], None] = '406e617ae25c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.execute("DELETE FROM books")

    op.execute("ALTER TABLE books ALTER COLUMN status TYPE text USING status::text")
    op.execute("DROP TYPE reading_status")
    op.execute("CREATE TYPE reading_status AS ENUM ('to_read', 'read', 'in_library')")
    op.execute("ALTER TABLE books ALTER COLUMN status TYPE reading_status USING status::reading_status")

    op.execute("ALTER TABLE authors ALTER COLUMN author_gender TYPE text USING author_gender::text")
    op.execute("DROP TYPE author_gender")
    op.execute("CREATE TYPE author_gender AS ENUM ('female', 'male', 'diverse')")
    op.execute("ALTER TABLE authors ALTER COLUMN author_gender TYPE author_gender USING author_gender::author_gender")

    op.add_column("authors", sa.Column("country", sa.String(length=100), nullable=True))

    book_format = postgresql.ENUM("paperback", "ebook", "audiobook", name="book_format")
    book_format.create(op.get_bind())

    op.add_column("books", sa.Column("genre", sa.String(length=100), nullable=True))
    op.add_column("books", sa.Column("year", sa.Integer(), nullable=True))
    op.add_column("books", sa.Column("language", sa.String(length=50), nullable=True))
    op.add_column("books", sa.Column("publisher", sa.String(length=150), nullable=True))
    op.add_column("books", sa.Column("category", sa.String(length=100), nullable=True))
    op.add_column("books", sa.Column("format", book_format, nullable=True))


def downgrade():
    op.drop_column("books", "format")
    op.drop_column("books", "category")
    op.drop_column("books", "publisher")
    op.drop_column("books", "language")
    op.drop_column("books", "year")
    op.drop_column("books", "genre")

    book_format = postgresql.ENUM("paperback", "ebook", "audiobook", name="book_format")
    book_format.drop(op.get_bind())

    op.drop_column("authors", "country")

    op.execute("DELETE FROM books")
    op.execute("ALTER TABLE books ALTER COLUMN status TYPE text USING status::text")
    op.execute("DROP TYPE reading_status")
    op.execute("CREATE TYPE reading_status AS ENUM ('to_read', 'reading', 'finished')")
    op.execute("ALTER TABLE books ALTER COLUMN status TYPE reading_status USING status::reading_status")

    op.execute("ALTER TABLE authors ALTER COLUMN author_gender TYPE text USING author_gender::text")
    op.execute("DROP TYPE author_gender")
    op.execute("CREATE TYPE author_gender AS ENUM ('male', 'female', 'non_binary', 'unknown')")
    op.execute("ALTER TABLE authors ALTER COLUMN author_gender TYPE author_gender USING author_gender::author_gender")