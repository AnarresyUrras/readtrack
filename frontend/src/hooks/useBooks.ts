import { useState, useEffect } from 'react';
import { books as initialBooks } from '../data/books';
import type { Book } from '../types/Book';

const STORAGE_KEY = 'readtrack-books';

function loadBooks(): Book[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return initialBooks;

    try {
        return JSON.parse(stored) as Book[];
    } catch {
        return initialBooks;
    }
}

export function useBooks() {
    const [books, setBooks] = useState<Book[]>(loadBooks);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    }, [books]);

    function addBook(newBook: Book) {
        setBooks((prevBooks) => [...prevBooks, newBook]);
    }

    function updateBook(updatedBook: Book) {
        setBooks((prevBooks) =>
            prevBooks.map((book) =>
                book.id === updatedBook.id ? updatedBook : book
            )
        );
    }

    function deleteBook(id: number) {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    }

    return { books, addBook, updateBook, deleteBook };
}