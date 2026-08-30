interface SearchBarProps {
    value: string;
    onSearchChange: (value:string) => void;
}

function SearchBar({ value, onSearchChange }: SearchBarProps) {
    return (
        <div className="search-bar">
            <label htmlFor="book-search" className="visually-hidden">
                Search books
            </label>
            <input
                id="book-search"
                type="text"
                placeholder="Search by title or author..."
                value={value}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;