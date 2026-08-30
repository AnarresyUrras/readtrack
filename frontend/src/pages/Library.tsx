import { useState } from 'react';
import { useBooks } from '../hooks/useBooks';
import BookCard from '../components/BookCard';
import Filters from '../components/Filters';
import SearchBar from '../components/SearchBar';
import AddBookForm from '../components/AddBookForm';
import type { Book } from '../types/Book';

function Library() {
    const { books, addBook, updateBook, deleteBook } = useBooks();
    const [filter, setFilter] = useState<Book['status'] | 'all'>('all');
    const [search, setSearch] = useState('');
    const [bookToEdit, setBookToEdit] = useState<Book | null>(null);

    const filteredBooks = books
        .filter((book) => filter === 'all' || book.status === filter)
        .filter((book) => {
            const query = search.toLowerCase();
            return (
                book.title.toLowerCase().includes(query) ||
                book.author.toLowerCase().includes(query)
            );
        });

    function handleEdit(book: Book) {
        setBookToEdit(book);
        document.getElementById('book-form')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }

    function handleEditBook(updatedBook: Book) {
        updateBook(updatedBook);
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

    return (
        <>
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
                        onUpdateBook={updateBook}
                        onEdit={handleEdit}
                        onDelete={deleteBook}
                    />
                ))}
            </section>
        </>
    );
}

export default Library;