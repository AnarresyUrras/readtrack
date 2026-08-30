import { useBooks } from '../hooks/useBooks';

function Dashboard() {
    const { books } = useBooks();

    const totalBooks = books.length;
    const readCount = books.filter((b) => b.status === 'read').length;
    const toReadCount = books.filter((b) => b.status === 'to_read').length;
    const libraryCount = books.filter((b) => b.status === 'library').length;

    const totalPagesRead = books
        .filter((b) => b.status === 'read')
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