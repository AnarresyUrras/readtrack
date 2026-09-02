"""add reading status to reading_status enum

Revision ID: 5858ae2445f1
Revises: cf70e9f564d1
Create Date: 2026-09-02 22:56:12.565199

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5858ae2445f1'
down_revision: Union[str, Sequence[str], None] = 'cf70e9f564d1'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade():
    op.execute("ALTER TYPE reading_status ADD VALUE IF NOT EXISTS 'reading'")


def downgrade():
    pass