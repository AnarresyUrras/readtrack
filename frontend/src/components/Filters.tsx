import type { ReadingStatus } from "../types/Book";

interface FiltersProps {
    currentFilter: ReadingStatus | 'all';
    onFilterChange: (filter: ReadingStatus | 'all') => void;
}

function Filters({ currentFilter, onFilterChange }: FiltersProps) {
    const options: { label: string; value: ReadingStatus | 'all'}[] = [
        {label: 'All', value: 'all'},
        {label: 'In library', value: 'in_library'},
        {label: 'To read', value: 'to_read'},
        {label: 'Reading', value: 'reading'},
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