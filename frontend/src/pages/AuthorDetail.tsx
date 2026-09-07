import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorCard from "../components/AuthorCard";
import AuthorEditForm from "../components/AuthorEditForm";
import { authorsApi } from "../api/authors";
import { booksApi } from "../api/book";
import { fetchAuthorPhotoUrl } from "../utils/authorPhoto";
import { getDisplayStatus } from "../utils/readingStatus";
import type { Author } from "../types/Author";
import type { Book } from "../types/Book";

function AuthorDetail() {
  const { id } = useParams<{ id: string }>();
  const authorId = id ? Number(id) : NaN;

  const [author, setAuthor] = useState<Author | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!Number.isFinite(authorId)) {
      setError("Invalid author id.");
      setLoading(false);
      return;
    }

    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [loadedAuthor, loadedBooks] = await Promise.all([
          authorsApi.get(authorId),
          booksApi.listByAuthor(authorId),
        ]);
        if (cancelled) return;
        setAuthor(loadedAuthor);
        setBooks(loadedBooks);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Could not load author.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [authorId]);

  useEffect(() => {
    if (!author) {
      setPhotoUrl(null);
      return;
    }
    let cancelled = false;
    fetchAuthorPhotoUrl(author.name).then((url) => {
      if (!cancelled) setPhotoUrl(url);
    });
    return () => {
      cancelled = true;
    };
  }, [author]);

  async function handleEditSubmit(data: {
    author_gender?: string;
    country?: string;
  }) {
    if (!author) return;
    const updated = await authorsApi.update(author.id, {
      author_gender: data.author_gender,
      country: data.country,
    });
    setAuthor(updated);
    // Keep nested author data in the book list in sync.
    setBooks((prev) =>
      prev.map((book) => ({ ...book, author: updated }))
    );
  }

  if (loading) return <p className="author-detail-loading">Loading author…</p>;
  if (error) return <p role="alert" className="form-error">{error}</p>;
  if (!author) return <p role="alert" className="form-error">Author not found.</p>;

  return (
    <div className="author-detail">
      <Link to="/library" className="back-link">
        ← Back to Library
      </Link>

      <header className="author-detail-header">
        <AuthorCard author={author} photoUrl={photoUrl} />
        <p className="author-detail-meta">
          {books.length} book{books.length === 1 ? "" : "s"} in your library
        </p>
      </header>

      <section className="author-detail-edit">
        <h2>Edit author details</h2>
        <AuthorEditForm
          author={author}
          onSubmit={handleEditSubmit}
          submitLabel="Save changes"
        />
      </section>

      <section className="author-books">
        <h2>Books by {author.name}</h2>
        {books.length === 0 ? (
          <p className="author-books-empty">
            No books by this author yet.
          </p>
        ) : (
          <ul className="author-book-list">
            {books.map((book) => {
              return (
                <li key={book.id} className="author-book-item">
                  <div className="author-book-main">
                    <span className="author-book-title">{book.title}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}

export default AuthorDetail;