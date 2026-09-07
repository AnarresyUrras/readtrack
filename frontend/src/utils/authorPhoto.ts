export async function fetchAuthorPhotoUrl(name: string): Promise<string | null> {
  if (!name.trim()) return null;
  try {
    const res = await fetch(
      `https://openlibrary.org/search/authors.json?q=${encodeURIComponent(name)}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    const olid: string | undefined = data?.docs?.[0]?.key;
    if (!olid) return null;
    return `https://covers.openlibrary.org/a/olid/${olid}-M.jpg`;
  } catch {
    return null;
  }
}