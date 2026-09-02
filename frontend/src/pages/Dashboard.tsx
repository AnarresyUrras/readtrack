import { useBooks } from '../hooks/useBooks';
import { getDisplayStatus } from '../utils/readingStatus';

function Dashboard() {
    const { books, loading, error } = useBooks();

    if (loading) return <p>Loading dashboard…</p>;
    if (error) return <p role="alert">Error: {error}</p>;

    const totalBooks = books.length;
    const readCount = books.filter((b) => getDisplayStatus(b) === 'read').length;
    const readingCount = books.filter((b) => getDisplayStatus(b) === 'reading').length;
    const toReadCount = books.filter((b) => getDisplayStatus(b) === 'to_read').length;
    const libraryCount = books.filter((b) => getDisplayStatus(b) === 'in_library').length;

    const totalPagesRead = books
        .filter((b) => getDisplayStatus(b) === 'read')
        .reduce((sum, b) => sum + (b.pages ?? 0), 0);

    const byGenre = books.reduce<Record<string, number>>((acc, book) => {
        const genre = book.genre ?? 'Unknown';
        acc[genre] = (acc[genre] ?? 0) + 1;
        return acc;
    }, {});

    return (
        <div className="dashboard">
            <div className="stat-grid">
                <div className="stat-card">
                    <span className="stat-number">{totalBooks}</span>
                    <span className="stat-label">Total books</span>
                </div>
                <div className="stat-card">
                    <span className="stat-number">{readCount}</span>
                    <span className="stat-label">Read</span>
                </div>
                <div className="stat-card">
                    <span className="stat-number">{readingCount}</span>
                    <span className="stat-label">Reading</span>
                </div>
                <div className="stat-card">
                    <span className="stat-number">{toReadCount}</span>
                    <span className="stat-label">To read</span>
                </div>
                <div className="stat-card">
                    <span className="stat-number">{libraryCount}</span>
                    <span className="stat-label">In library</span>
                </div>
                <div className="stat-card">
                    <span className="stat-number">{totalPagesRead}</span>
                    <span className="stat-label">Pages read</span>
                </div>
            </div>

            <div className="genre-breakdown">
                <h2>By genre</h2>
                {Object.entries(byGenre).map(([genre, count]) => (
                    <div key={genre} className="genre-row">
                        <span className="genre-name">{genre}</span>
                        <span className="genre-count">{count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;