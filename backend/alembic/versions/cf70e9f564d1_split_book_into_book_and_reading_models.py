"""split book into book and reading models

Revision ID: cf70e9f564d1
Revises: 2bacc4c9db9d
Create Date: 2026-09-02 22:15:19.853008

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision: str = 'cf70e9f564d1'
down_revision: Union[str, Sequence[str], None] = '2bacc4c9db9d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade():
    # Data de prueba, no importa perderla
    op.execute("DELETE FROM books")
    
    reading_status_enum = postgresql.ENUM("to_read", "read", "in_library", name="reading_status", create_type=False)

    op.create_table(
        "readings",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("book_id", sa.Integer(), sa.ForeignKey("books.id"), nullable=False),
        sa.Column("status", reading_status_enum, nullable=False),
        sa.Column("start_reading", sa.Date(), nullable=True),
        sa.Column("finish_reading", sa.Date(), nullable=True),
        sa.Column("rating", sa.Integer(), nullable=True),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column("new_author", sa.Boolean(), nullable=False, server_default=sa.false()),
    )

    op.drop_column("books", "status")
    op.drop_column("books", "start_reading")
    op.drop_column("books", "finish_reading")
    op.drop_column("books", "rating")
    op.drop_column("books", "notes")


def downgrade():
    op.add_column("books", sa.Column("notes", sa.Text(), nullable=True))
    op.add_column("books", sa.Column("rating", sa.Integer(), nullable=True))
    op.add_column("books", sa.Column("finish_reading", sa.Date(), nullable=True))
    op.add_column("books", sa.Column("start_reading", sa.Date(), nullable=True))
    reading_status_enum = postgresql.ENUM("to_read", "read", "in_library", name="reading_status", create_type=False)
    op.add_column("books", sa.Column("status", reading_status_enum, nullable=True))

    op.drop_table("readings")