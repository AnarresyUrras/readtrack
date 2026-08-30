import { useState } from 'react';
import type { Book } from '../types/Book';

interface BookCardProps {
  book: Book;
  onUpdateBook: (book: Book) => void;
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}

function BookCard({
    book,
    onUpdateBook,
    onEdit,
    onDelete
}: BookCardProps) {
    const [imgError, setImgError] = useState(false);
    const statusColors: Record<Book['status'], string> = {
        library: 'var(--teal)',
        to_read: 'var(--amber)',
        read: 'var(--forest)',
    };

    const showCover = book.isbn && !imgError;

    return(
        <article
        id={`book-${book.id}`}
        style={{ '--status-color': statusColors[book.status] } as React.CSSProperties}>
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
                <p className='book-author'>{book.author}</p>
                <p className="book-genre">{book.genre}</p>
                <p className="book-year">{book.year}</p>
                <p className="book-pages">{book.pages && <span>{book.pages} pages</span>}</p>
                {book.rating !== undefined && (
                    <div className="book-rating"
                    aria-label={`Rating: ${book.rating} out of 5`}
                    >
                        {Array.from({ length: 5 }, (_, index) => (
                            <span key={index}>
                                {index < book.rating! ? '★' : '☆'}
                            </span>
                        ))}
                    </div>
                )}
                <div className="book-actions">
                    <button
                        onClick={() => onEdit(book)}
                        className="edit-button"
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(book.id)}
                        className="delete-button"
                    >
                        Delet
                    </button>
                </div>
                <select
                className='book-status'
                    value={book.status}
                    onChange={(e) =>
                        onUpdateBook({
                            ...book,
                            status: e.target.value as Book['status'],
                        })
                    }
                >
                    <option value="library">In library</option>
                    <option value="to_read">To read</option>
                    <option value="read">Read</option>
                </select>
            </div>
        </article>
    );
}

export default BookCard;