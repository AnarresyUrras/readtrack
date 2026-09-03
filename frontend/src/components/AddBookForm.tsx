import { useState, useEffect } from "react";
import type { Author } from "../types/Author";
import type { Book, BookCreate, BookFormat } from "../types/Book";
import { getCurrentReading } from "../utils/readingStatus";
import AuthorModal from "./AuthorModal";

interface AddBookFormProps {
    onAddBook: (book: BookCreate) => Promise<void>;
    bookToEdit?: Book | null;
    onEditBook: (id: number, book: BookCreate) => Promise<void>;
    onCancelEdit: () => void;
}

function AddBookForm({
    onAddBook,
    bookToEdit,
    onEditBook,
    onCancelEdit,
}: AddBookFormProps) {
    const [isOpen, setIsOpen] = useState(false);

    // --- Author resolution state ---
    const [resolvedAuthor, setResolvedAuthor] = useState<Author | null>(null);
    const [authorModalOpen, setAuthorModalOpen] = useState(false);
    const [authorModalMode, setAuthorModalMode] = useState<'search' | 'edit'>('search');

    // --- Book fields ---
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const [language, setLanguage] = useState('');
    const [publisher, setPublisher] = useState('');
    const [pages, setPages] = useState('');
    const [category, setCategory] = useState('');
    const [isbn, setIsbn] = useState('');
    const [format, setFormat] = useState<BookFormat | ''>('');

    // --- Reading fields ---
    const [rating, setRating] = useState<number | ''>('');
    const [notes, setNotes] = useState('');
    const [newAuthor, setNewAuthor] = useState(false);
    const [startReading, setStartReading] = useState('');
    const [finishReading, setFinishReading] = useState('');

    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    function openAuthorSearch() {
        setAuthorModalMode('search');
        setAuthorModalOpen(true);
    }

    function openAuthorEdit() {
        setAuthorModalMode('edit');
        setAuthorModalOpen(true);
    }

    function handleAuthorResolved(author: Author) {
        setResolvedAuthor(author);
        setAuthorModalOpen(false);
    }

    useEffect(() => {
        if (bookToEdit) {
            setResolvedAuthor(bookToEdit.author);
            
            setTitle(bookToEdit.title);
            setGenre(bookToEdit.genre ?? '');
            setYear(bookToEdit.year ? bookToEdit.year.toString() : '');
            setLanguage(bookToEdit.language ?? '');
            setPublisher(bookToEdit.publisher ?? '');
            setPages(bookToEdit.pages ? bookToEdit.pages.toString() : '');
            setCategory(bookToEdit.category ?? '');
            setIsbn(bookToEdit.isbn ?? '');
            setFormat(bookToEdit.format ?? '');

            const currentReading = getCurrentReading(bookToEdit);
            setRating(currentReading?.rating ?? '');
            setNotes(currentReading?.notes ?? '');
            setNewAuthor(currentReading?.new_author ?? false);
            setStartReading(currentReading?.start_reading ?? '');
            setFinishReading(currentReading?.finish_reading ?? '');

            setIsOpen(true);
        }
    }, [bookToEdit]);

    function resetForm() {
        setTitle('');
        setGenre('');
        setYear('');
        setLanguage('');
        setPublisher('');
        setPages('');
        setCategory('');
        setIsbn('');
        setFormat('');

        setRating('');
        setNotes('');
        setNewAuthor(false);
        setStartReading('');
        setFinishReading('');
        setSubmitError(null);
    }
    
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!resolvedAuthor) return;

        const book: BookCreate = {
            title: title.trim(),
            author_id: resolvedAuthor.id,
            isbn: isbn.trim() || undefined,
            pages: pages ? Number(pages) : undefined,
            genre: genre.trim() || undefined,
            year: year ? Number(year) : undefined,
            language: language.trim() || undefined,
            publisher: publisher.trim() || undefined,
            category: category.trim() || undefined,
            format: format || undefined,
            start_reading: startReading || undefined,
            finish_reading: finishReading || undefined,
            rating: rating === '' ? undefined : rating,
            notes: notes.trim() || undefined,
            new_author: newAuthor,
        };

        setSubmitting(true);
        setSubmitError(null);
        try {
            if (bookToEdit) {
                await onEditBook(bookToEdit.id, book);
            } else {
                await onAddBook(book);
            }
            resetForm();
            setIsOpen(false);
        } catch {
            setSubmitError('Could not save the book. Please try again.');
        } finally {
            setSubmitting(false);
        }
    }

    if (!isOpen) {
        return (
            <div id="book-form" className="add-book-toggle">
                <button className="btn btn-primary" onClick={() => setIsOpen(true)}>Add Book</button>
            </div>
        );
    }

    return (
        <div id="book-form">
            <form className="add-book-form" onSubmit={handleSubmit}>

                {/* --- Author resolution --- */}
                {!resolvedAuthor ? (
                    <div className="form-row">
                        <label>Author</label>
                        <button type="button" className="btn btn-secondary" onClick={openAuthorSearch}>
                            Select author
                        </button>
                    </div>
                ) : (
                    <div className="form-row author-resolved">
                        <span>Author: <strong>{resolvedAuthor.name}</strong></span>
                        <button type="button" className="btn btn-secondary btn-small" onClick={openAuthorEdit}>
                            Edit
                        </button>
                        <button type="button" className="btn btn-secondary btn-small" onClick={openAuthorSearch}>
                            Change
                        </button>
                    </div>
                )}

                <AuthorModal
                    isOpen={authorModalOpen}
                    mode={authorModalMode}
                    initialAuthor={resolvedAuthor}
                    onClose={() => setAuthorModalOpen(false)}
                    onResolved={handleAuthorResolved}
                />

                {resolvedAuthor && (
                    <>
                        <div className="form-row">
                            <label htmlFor="title">Title:</label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-row">
                            <label htmlFor="genre">Genre:</label>
                            <input
                                id="genre"
                                type="text"
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                            />
                        </div>

                        <div className="form-row">
                            <label htmlFor="year">Year:</label>
                            <input
                                id="year"
                                type="number"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            />
                        </div>

                        <div className="form-row">
                            <label htmlFor="language">Language:</label>
                            <input
                                id="language"
                                type="text"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            />
                        </div>

                        <div className="form-row">
                            <label htmlFor="publisher">Publisher:</label>
                            <input
                                id="publisher"
                                type="text"
                                value={publisher}
                                onChange={(e) => setPublisher(e.target.value)}
                            />
                        </div>

                        <div className="form-row">
                            <label htmlFor="pages">Pages:</label>
                            <input
                                id="pages"
                                type="number"
                                value={pages}
                                onChange={(e) => setPages(e.target.value)}
                            />
                        </div>

                        <div className="form-row">
                            <label htmlFor="category">Category:</label>
                            <input
                                id="category"
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>

                        <div className="form-row">
                            <label htmlFor="isbn">ISBN:</label>
                            <input
                                id="isbn"
                                type="text"
                                value={isbn}
                                onChange={(e) => setIsbn(e.target.value)}
                            />
                        </div>

                        <div className="form-row">
                            <label htmlFor="format">Format:</label>
                            <select
                                id="format"
                                value={format}
                                onChange={(e) => setFormat(e.target.value as BookFormat | '')}
                            >
                                <option value="">Select Format</option>
                                <option value="paperback">Paperback</option>
                                <option value="ebook">E-book</option>
                                <option value="audiobook">Audiobook</option>
                            </select>
                        </div>

                        <p className="form-hint">
                            Add a start or finish date below to record this as a reading.
                        </p>

                        <div className="form-row form-row-final">
                            <div className="new-author">
                                <input
                                    id="newAuthor"
                                    type="checkbox"
                                    checked={newAuthor}
                                    onChange={(e) => setNewAuthor(e.target.checked)}
                                />
                                <label htmlFor="newAuthor">New author for me</label>
                            </div>
                            <div>
                                <label htmlFor="startReading">Start reading:</label>
                                <input
                                    id="startReading"
                                    type="date"
                                    value={startReading}
                                    onChange={(e) => setStartReading(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="finishReading">Finished reading:</label>
                                <input
                                    id="finishReading"
                                    type="date"
                                    value={finishReading}
                                    min={startReading || undefined}
                                    onChange={(e) => setFinishReading(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <label htmlFor="rating">Rating:</label>
                            <input
                                id="rating"
                                type="number"
                                min="1"
                                max="5"
                                value={rating}
                                onChange={(e) =>
                                    setRating(e.target.value ? Number(e.target.value) : '')
                                }
                            />
                        </div>

                        <div className="form-row">
                            <label htmlFor="notes">Notes:</label>
                            <textarea
                                id="notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>

                        {submitError && <p className="form-error">{submitError}</p>}

                        <div className="form-actions">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => {
                                    setIsOpen(false);
                                    onCancelEdit();
                                    resetForm();
                                }}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-secondary" disabled={submitting}>
                                {submitting ? 'Saving…' : bookToEdit ? 'Save changes' : 'Add Book'}
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}

export default AddBookForm;