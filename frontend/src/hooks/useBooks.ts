import { useState, useEffect, useCallback } from "react";
import { booksApi } from "../api/book";
import { readingsApi } from "../api/reading";
import { getCurrentReading } from "../utils/readingStatus";
import type { Book, BookCreate, Reading, ReadingStatus } from "../types/Book";

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await booksApi.list();
      setBooks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load books");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function addBook(newBook: BookCreate) {
    const created = await booksApi.create(newBook);
    setBooks((prev) => [...prev, created]);
  }

  async function updateBook(id: number, updatedBook: BookCreate) {
    const saved = await booksApi.update(id, updatedBook);
    setBooks((prev) => prev.map((book) => (book.id === id ? saved : book)));
  }

  async function deleteBook(id: number) {
    await booksApi.delete(id);
    setBooks((prev) => prev.filter((book) => book.id !== id));
  }

  async function deleteBookWithReadings(book: Book) {
    await Promise.all(book.readings.map((reading) => readingsApi.delete(reading.id)));
    await booksApi.delete(book.id);
    setBooks((prev) => prev.filter((b) => b.id !== book.id));
}

  async function updateBookStatus(book: Book, newStatus: ReadingStatus) {
    const current = getCurrentReading(book);        

    let saved: Reading;
    if (current) {
      saved = await readingsApi.update(current.id, {
        book_id: book.id,
        status: newStatus,
        start_reading: current.start_reading,
        finish_reading: current.finish_reading,
        rating: current.rating,
        notes: current.notes,
        new_author: current.new_author,
      });
    } else {
      saved = await readingsApi.create({
        book_id: book.id,
        status: newStatus,
        new_author: false,
      });
    }

      setBooks((prev) =>
      prev.map((b) => {
        if (b.id !== book.id) return b;
        const exists = b.readings.some((r) => r.id === saved.id);
        return {
          ...b,
          readings: exists
            ? b.readings.map((r) => (r.id === saved.id ? saved : r))
            : [...b.readings, saved],
        };
      })
    );
}

  return { books, loading, error, addBook, updateBook, deleteBook, deleteBookWithReadings, updateBookStatus, refresh };
}