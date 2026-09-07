import type { Author } from "../types/Author";

interface AuthorCardProps {
    author: Author;
    onSelect?: (author: Author) => void;
    photoUrl?: string | null;
    actions?: React.ReactNode;
}

function AuthorCard({ author, onSelect, photoUrl, actions }: AuthorCardProps) {
    const initials = author.name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    const genderLabels = { female: "Female", male: "Male", diverse: "Diverse", };

    return (
        <div className="author-card">
            <div className="author-card-image">
                {photoUrl ? (
                    <img
                        src={photoUrl}
                        alt={author.name}
                        onError={(event) => {
                            event.currentTarget.style.display = "none";
                            event.currentTarget.nextElementSibling?.removeAttribute(
                                "hidden"
                            );
                        }}
                    />
                ) : null}

                <div
                    className="author-card-placeholder"
                    hidden={!!photoUrl}
                >
                    {initials}
                </div>
            </div>

            <div className="author-card-info">
                <h3>{author.name}</h3>

                {author.author_gender && ( <p>{genderLabels[author.author_gender]}</p> )}

                {author.country && (
                    <p>{author.country}</p>
                )}

                {onSelect && (
                    <button
                        type="button"
                        className="btn btn-secondary btn-small"
                        onClick={() => onSelect(author)}
                    >
                        Select
                    </button>
                )}

                {actions && (
                    <div className="author-card-actions">
                        {actions}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AuthorCard;