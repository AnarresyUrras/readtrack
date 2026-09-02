import { useState } from 'react';
import { useBooks } from '../hooks/useBooks';
import BookCard from '../components/BookCard';
import Filters from '../components/Filters';
import SearchBar from '../components/SearchBar';
import AddBookForm from '../components/AddBookForm';
import type { Book, ReadingStatus } from '../types/Book';
import { getDisplayStatus } from '../utils/readingStatus';

function Library() {
    const { books, loading, error, addBook, updateBook, deleteBook, deleteBookWithReadings, updateBookStatus } = useBooks();
    const [filter, setFilter] = useState<ReadingStatus | 'all'>('all');
    const [search, setSearch] = useState('');
    const [bookToEdit, setBookToEdit] = useState<Book | null>(null);
    const [actionError, setActionError] = useState<string | null>(null);

    const filteredBooks = books
        .filter((book) => filter === 'all' || getDisplayStatus(book) === filter)
        .filter((book) => {
            const query = search.toLowerCase();
            return (
                book.title.toLowerCase().includes(query) ||
                book.author.name.toLowerCase().includes(query)
            );
        });

    function handleEdit(book: Book) {
        setBookToEdit(book);
        document.getElementById('book-form')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }

    async function handleEditBook(id: number, updatedBook: Parameters<typeof updateBook>[1]) {
        await updateBook(id, updatedBook);
        setBookToEdit(null);
    }

    function handleCancelEdit() {
        if (bookToEdit) {
            document.getElementById(`book-${bookToEdit.id}`)?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
        setBookToEdit(null);
    }

   async function handleDelete(book: Book) {
        setActionError(null);
        try {
            if (book.readings.length > 0) {
                const count = book.readings.length;
                const confirmed = window.confirm(
                    `"${book.title}" has ${count} reading${count > 1 ? 's' : ''} recorded. ` +
                    `Delete the book and all its readings? This can't be undone.`
                );
                if (!confirmed) return;
                await deleteBookWithReadings(book);
            } else {
                await deleteBook(book.id);
            }
        } catch {
            setActionError('Could not delete the book. Please try again.');
        }
    }

    if (loading) return <p>Loading books…</p>;
    if (error) return <p role="alert">Error: {error}</p>;

    return (
        <>
            {actionError && <p role="alert" className="form-error">{actionError}</p>}
            <AddBookForm
                onAddBook={addBook}
                bookToEdit={bookToEdit}
                onEditBook={handleEditBook}
                onCancelEdit={handleCancelEdit}
            />
            <SearchBar value={search} onSearchChange={setSearch} />
            <Filters currentFilter={filter} onFilterChange={setFilter} />
            <section>
                {filteredBooks.map((book) => (
                    <BookCard
                        key={book.id}
                        book={book}
                        onUpdateStatus={updateBookStatus}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </section>
        </>
    );
}

export default Library;