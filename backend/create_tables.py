from app.database import Base, engine
from app.models.author import Author
from app.models.book import Book


print("Creating tables...")

Base.metadata.create_all(bind=engine)

print("Done!")