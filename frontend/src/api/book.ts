import { api } from "./client";
import type { Book, BookCreate } from "../types/Book";

export const booksApi = {
  list: () => api.get<Book[]>("/books/"),
  get: (id: number) => api.get<Book>(`/books/${id}`),
  create: (book: BookCreate) => api.post<Book>("/books/", book),
  update: (id: number, book: BookCreate) => api.put<Book>(`/books/${id}`, book),
  delete: (id: number) => api.delete(`/books/${id}`),
};