import { useState, useEffect } from "react";
import type { Book } from "../types/Book";

interface AddBookFormProps {
  onAddBook: (book: Book) => void;
  bookToEdit?: Book | null;
  onEditBook: (book: Book) => void;
  onCancelEdit: () => void;
}

function AddBookForm({
    onAddBook,
    bookToEdit,
    onEditBook,
    onCancelEdit
}: AddBookFormProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [authorGender, setAuthorGender] = useState<Book['authorGender']>('female');
    const [year, setYear] = useState('');
    const [country, setCountry] = useState('');
    const [language, setLanguage] = useState('');
    const [publisher, setPublisher] = useState('');
    const [pages, setPages] = useState('');
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState<Book['rating']>(3);
    const [isbn, setIsbn] = useState('');
    const [newAuthor, setNewAuthor] = useState(false);
    const [status, setStatus] = useState<Book['status']>('to_read');
    const [format, setFormat] = useState('');
    const [started, setReadingStarted] = useState('');
    const [finished, setReadingFinished] = useState('');

    useEffect(() => {
        if (bookToEdit) {
            setTitle(bookToEdit.title);
            setAuthor(bookToEdit.author);
            setGenre(bookToEdit.genre ?? '');
            setAuthorGender(bookToEdit.authorGender ?? 'female');
            setYear(bookToEdit.year ? bookToEdit.year.toString() : '');
            setCountry(bookToEdit.country ?? '');
            setLanguage(bookToEdit.language ?? '');
            setPublisher(bookToEdit.publisher ?? '');
            setPages(bookToEdit.pages ? bookToEdit.pages.toString() : '');
            setCategory(bookToEdit.category ?? '');
            setRating(bookToEdit.rating ? bookToEdit.rating : 3);
            setIsbn(bookToEdit.isbn ?? '');
            setNewAuthor(bookToEdit.newAuthor ?? false);
            setStatus(bookToEdit.status);
            setFormat(bookToEdit.format ?? '');
            setReadingStarted(bookToEdit.started ?? '');
            setReadingFinished(bookToEdit.finished ?? '');
            setIsOpen(true);
        }
    }, [bookToEdit]);

    function resetForm() {
        setTitle('');
        setAuthor('');
        setGenre('');
        setAuthorGender('female');
        setYear('');
        setCountry('');
        setLanguage('');
        setPublisher('');
        setPages('');
        setCategory('');
        setRating(3);
        setIsbn('');
        setNewAuthor(false);
        setStatus('to_read');
        setFormat('');
        setReadingStarted('');
        setReadingFinished('');
    }

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const book: Book = {
            id: bookToEdit ? bookToEdit.id : Date.now(),
            title: title.trim(),
            author: author.trim(),
            genre: genre.trim() || undefined,
            authorGender: authorGender || undefined,
            year: year ? Number(year) : undefined,
            country: country.trim() || undefined,
            language: language.trim() || undefined,
            publisher: publisher.trim() || undefined,
            pages: pages ? Number(pages) : undefined,
            category: category.trim() || undefined,
            rating: rating,
            isbn: isbn.trim() || undefined,
            newAuthor: newAuthor,
            format: format.trim() || undefined,
            status,
            started: started || undefined,
            finished: finished || undefined,
        };
        if (bookToEdit) {
            onEditBook(book);
        } else {
            onAddBook(book);
        }
        resetForm();
        setIsOpen(false);
    }

    if (!isOpen){
        return (
            <div id="book-form"className="add-book-toggle">
                <button onClick={() => setIsOpen(true)}>Add Book</button>
            </div>
        );
    }

    return (
        <div id="book-form">
            <form className="add-book-form" onSubmit={handleSubmit}>
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
                    <label htmlFor="author">Author:</label>
                    <input
                        id="author"
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
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
                    <label htmlFor="authorGender">Author gender:</label>
                    <select
                        id="authorGender"
                        value={authorGender}
                        onChange={(e) => setAuthorGender(e.target.value as Book['authorGender'])}
                    >
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="divers">Divers</option>
                    </select>
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
                    <label htmlFor="country">Country:</label>
                    <input
                        id="country"
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
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
                    <label htmlFor="rating">Rating:</label>
                    <input
                        id="rating"
                        type="number"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(Math.min(5, Math.max(1, parseInt(e.target.value) || 3)))}
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
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value as Book['status'])}
                    >
                        <option value="to_read">To Read</option>
                        <option value="library">Library</option>
                        <option value="read">Read</option>
                    </select>
                </div>

                <div className="form-row">
                    <label htmlFor="format">Format:</label>
                    <select
                        id="format"
                        value={format}
                        onChange={(e) => setFormat(e.target.value)}
                    >
                        <option value="">Select Format</option>
                        <option value="paperback">Paperback</option>
                        <option value="ebook">E-book</option>
                        <option value="audiobook">Audiobook</option>
                    </select>
                </div>

                <div className="form-row form-row-final">
                    <div className="new-author">
                        <input
                            id="newAuthor"
                            type="checkbox"
                            checked={newAuthor}
                            onChange={(e) => setNewAuthor(e.target.checked)}
                        />
                        <label htmlFor="newAuthor">New author</label>
                    </div>
                    <div>
                        <label htmlFor="readingStarted">Start reading:</label>
                        <input
                            id="readingStarted"
                            type="date"
                            value={started}
                            onChange={(e) => setReadingStarted(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="readingFinished">Finished reading:</label>
                        <input
                            id="readingFinished"
                            type="date"
                            value={finished}
                            min={started || undefined}
                            onChange={(e) => setReadingFinished(e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="button"
                        onClick={() => {
                        setIsOpen(false);
                        onCancelEdit();
                        resetForm();
                        }}>
                            Cancel
                    </button>
                    <button type="submit">
                        {bookToEdit ? 'Save changes' : 'Add Book'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddBookForm;