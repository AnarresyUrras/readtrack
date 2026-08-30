import type { Book } from "../types/Book";

interface FiltersProps {
    currentFilter: Book['status'] | 'all';
    onFilterChange: (filter: Book['status'] | 'all') => void;
}

function Filters({ currentFilter, onFilterChange }: FiltersProps) {
    const options: { label: string; value: Book['status'] | 'all'}[] = [
        {label: 'All', value: 'all'},
        {label: 'Library', value: 'library'},
        {label: 'To read', value: 'to_read'},
        {label: 'Read', value: 'read'},
    ];

    return (
        <div className="filters">
            {options.map((option) => (
                <button
                    key={option.value}
                    className={currentFilter === option.value ? 'active' : ''}
                    onClick={() => onFilterChange(option.value)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}

export default Filters;