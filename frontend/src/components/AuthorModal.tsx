import { useState, useEffect } from "react";
import Modal from "./Modal";
import { authorsApi } from "../api/authors";
import type { Author, AuthorGender } from "../types/Author";

interface AuthorModalProps {
  isOpen: boolean;
  mode: "search" | "edit";
  initialAuthor?: Author | null;
  onClose: () => void;
  onResolved: (author: Author) => void;
}

function AuthorModal({ isOpen, mode, initialAuthor, onClose, onResolved }: AuthorModalProps) {
  const [query, setQuery] = useState("");
  const [gender, setGender] = useState<AuthorGender | "">("");
  const [country, setCountry] = useState("");
  const [suggestions, setSuggestions] = useState<Author[] | null>(null);
  const [status, setStatus] = useState<"idle" | "searching" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    if (mode === "edit" && initialAuthor) {
      setQuery(initialAuthor.name);
      setGender(initialAuthor.author_gender ?? "");
      setCountry(initialAuthor.country ?? "");
    } else {
      setQuery("");
      setGender("");
      setCountry("");
    }
    setSuggestions(null);
    setStatus("idle");
    setError(null);
  }, [isOpen, mode, initialAuthor]);

  async function handleSearch() {
    if (!query.trim()) return;
    setStatus("searching");
    setError(null);
    setSuggestions(null);
    try {
      const result = await authorsApi.findOrCreate({
        name: query.trim(),
        author_gender: gender || undefined,
        country: country.trim() || undefined,
        force_create: false,
      });
      if (result.status === "suggestions") {
        setSuggestions(result.suggestions);
      } else if (result.author) {
        onResolved(result.author);
      }
      setStatus("idle");
    } catch {
      setStatus("error");
      setError("Could not search for author. Try again.");
    }
  }

  async function handleForceCreate() {
    setStatus("searching");
    try {
      const result = await authorsApi.findOrCreate({
        name: query.trim(),
        author_gender: gender || undefined,
        country: country.trim() || undefined,
        force_create: true,
      });
      if (result.author) onResolved(result.author);
      setStatus("idle");
    } catch {
      setStatus("error");
      setError("Could not create author. Try again.");
    }
  }

  async function handleSaveEdit() {
    if (!initialAuthor) return;
    setStatus("searching");
    setError(null);
    try {
      const updated = await authorsApi.update(initialAuthor.id, {
        name: initialAuthor.name,
        author_gender: gender || undefined,
        country: country.trim() || undefined,
      });
      onResolved(updated);
      setStatus("idle");
    } catch {
      setStatus("error");
      setError("Could not update author. Try again.");
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "edit" ? "Edit author" : "Find or create author"}
    >
      {mode === "search" && (
        <div className="form-row">
          <label htmlFor="modalAuthorQuery">Author name</label>
          <input
            id="modalAuthorQuery"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Author name"
            autoFocus
          />
        </div>
      )}

      {mode === "edit" && (
        <p className="form-hint">
          Editing <strong>{initialAuthor?.name}</strong>
        </p>
      )}

      <div className="form-row">
        <label htmlFor="modalAuthorGender">Gender (optional)</label>
        <select
          id="modalAuthorGender"
          value={gender}
          onChange={(e) => setGender(e.target.value as AuthorGender | "")}
        >
          <option value="">—</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="diverse">Diverse</option>
        </select>
      </div>

      <div className="form-row">
        <label htmlFor="modalAuthorCountry">Country (optional)</label>
        <input
          id="modalAuthorCountry"
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      {suggestions && suggestions.length > 0 && (
        <div className="author-suggestions">
          <p>Did you mean one of these?</p>
          {suggestions.map((s) => (
            <button
              key={s.id}
              type="button"
              className="btn btn-secondary btn-small"
              onClick={() => onResolved(s)}
            >
              {s.name}
            </button>
          ))}
          <button type="button" className="btn btn-secondary btn-small" onClick={handleForceCreate}>
            No, it's a different author — create new
          </button>
        </div>
      )}

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
        {mode === "search" ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSearch}
            disabled={status === "searching" || !query.trim()}
          >
            {status === "searching" ? "Searching…" : "Search author"}
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSaveEdit}
            disabled={status === "searching"}
          >
            {status === "searching" ? "Saving…" : "Save"}
          </button>
        )}
      </div>
    </Modal>
  );
}

export default AuthorModal;