"""add long_description to exams

Revision ID: d866af444209
Revises: 
Create Date: 2019-04-19 17:54:57.407418

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd866af444209'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('exams', sa.Column(
        'long_description',
        sa.Text,
        nullable=False,
        server_default='Default exam description'))


def downgrade():
    pass
