# ReadTrack 📚

A personal reading tracker built with React and TypeScript. Track the books you own, want to read, or have finished — filter by status, search by title or author, and view your reading stats at a glance.

Built as a learning project to practice React fundamentals (hooks, component composition, routing)

## Features

- **Library view** — browse all your books as catalog-style cards, with cover images pulled from the Open Library API
- **Filter & search** — filter by status (library / to read / read) and search by title or author
- **Add, edit, and delete books** — full CRUD on your local reading list
- **Dashboard** — stats on total books, pages read, and a breakdown by genre
- **Persistent storage** — your data is saved in `localStorage`, so it survives page reloads
- **Client-side routing** — navigate between Library and Dashboard with `react-router-dom`

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) — build tool and dev server
- [react-router-dom](https://reactrouter.com/) — routing
- Plain CSS (custom design system, no UI framework)
- [Open Library Covers API](https://openlibrary.org/dev/docs/api/covers) — book cover images

## Getting started

```bash
git clone https://github.com/AnarresyUrras/readtrack.git
cd readtrack/frontend
npm install
npm run dev
```

The app will be running at `http://localhost:5173`.

## Project structure

```
src/
  components/   # reusable UI pieces (BookCard, Filters, SearchBar, AddBookForm, Nav)
  pages/        # route-level views (Library, Dashboard)
  hooks/        # custom hooks (useBooks — state + localStorage persistence)
  types/        # shared TypeScript types
  data/         # mock book data used on first load
```

## Roadmap

- [ ] Deploy to Vercel/Netlify
- [ ] Book detail view with dynamic routing (`/library/:id`)
- [ ] Empty states for search/filter with no results
- [ ] Reading dates (started/finished) and a simple reading timeline
- [ ] Sort books (by title, author, year, date added)
- [ ] Accessibility pass (keyboard navigation, screen reader labels)
- [ ] Mobile-responsive refinements

## Live demo

Coming soon.