import { useState } from 'react';
import type { Book, ReadingStatus } from '../types/Book';
import { getDisplayStatus } from '../utils/readingStatus';

interface BookCardProps {
  book: Book;
  onUpdateStatus: (book: Book, status: ReadingStatus) => void;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
}

function BookCard({ book, onUpdateStatus, onEdit, onDelete }: BookCardProps) {
    const [imgError, setImgError] = useState(false);
    const status = getDisplayStatus(book);
    const currentReading = book.readings[book.readings.length - 1];

    const statusColors: Record<ReadingStatus, string> = {
        in_library: 'var(--teal)',
        to_read: 'var(--amber)',
        reading: 'var(--sky)',
        read: 'var(--forest)',
    };

    const showCover = book.isbn && !imgError;

    return(
        <article
        id={`book-${book.id}`}
        style={{ '--status-color': statusColors[status] } as React.CSSProperties}>
            <div className="cover">
                {showCover ? (
                    <img
                        src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
                        alt={`Cover of ${book.title}`}
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="cover-placeholder">
                        <span>{book.title}</span>
                    </div>
                )}
            </div>
            <div className="details">
                <h2>{book.title}</h2>
                <p className='book-author'>{book.author.name}</p>
                <p className="book-genre">{book.genre}</p>
                <p className="book-year">{book.year}</p>
                <p className="book-pages">{book.pages && <span>{book.pages} pages</span>}</p>
                {currentReading?.rating !== undefined && (
                    <div className="book-rating"
                    aria-label={`Rating: ${currentReading.rating} out of 5`}
                    >
                        {Array.from({ length: 5 }, (_, index) => (
                            <span key={index}>
                                {index < currentReading.rating! ? '★' : '☆'}
                            </span>
                        ))}
                    </div>
                )}
                <div className="book-actions">
                    <button onClick={() => onEdit(book)} className="edit-button">
                        Edit
                    </button>
                    <button onClick={() => onDelete(book)} className="delete-button">
                        Delete
                    </button>
                </div>
                <select
                className='book-status'
                    value={status}
                    onChange={(e) => onUpdateStatus(book, e.target.value as ReadingStatus)}
                >
                    <option value="to_read">To read</option>
                    <option value="reading">Reading</option>
                    <option value="read">Read</option>
                    <option value="in_library">In library</option>
                </select>
            </div>
        </article>
    );
}

export default BookCard;