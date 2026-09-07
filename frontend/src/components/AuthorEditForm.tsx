import { useState, useEffect } from "react";
import type { Author, AuthorGender } from "../types/Author";

export interface AuthorEditFormData {
  author_gender?: AuthorGender;
  country?: string;
}

interface AuthorEditFormProps {
  author: Author;
  onSubmit: (data: AuthorEditFormData) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
}

/**
 * Shared inline form for editing an author's gender and country.
 * Owns only field + submission state; the actual API call is delegated
 * to the parent via `onSubmit` so this stays reusable across the
 * AuthorModal and the AuthorDetail page.
 */
function AuthorEditForm({
  author,
  onSubmit,
  onCancel,
  submitLabel = "Save",
  cancelLabel = "Cancel",
}: AuthorEditFormProps) {
  const [gender, setGender] = useState<AuthorGender | "">("");
  const [country, setCountry] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setGender(author.author_gender ?? "");
    setCountry(author.country ?? "");
    setError(null);
  }, [author]);

  function reset() {
    setGender(author.author_gender ?? "");
    setCountry(author.country ?? "");
    setError(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit({
        author_gender: gender || undefined,
        country: country.trim() || undefined,
      });
    } catch {
      setError("Could not save author details. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="author-edit-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="authorGender">Gender (optional)</label>
        <select
          id="authorGender"
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
        <label htmlFor="authorCountry">Country (optional)</label>
        <input
          id="authorCountry"
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="form-actions">
        {onCancel && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              reset();
              onCancel();
            }}
          >
            {cancelLabel}
          </button>
        )}
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default AuthorEditForm;