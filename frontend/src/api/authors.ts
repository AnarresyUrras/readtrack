import { api } from "./client";
import type { Author, AuthorFindOrCreate, AuthorMatchResult } from "../types/Author";

export const authorsApi = {
  list: () => api.get<Author[]>("/authors/"),
  get: (id: number) => api.get<Author>(`/authors/${id}`),
  findOrCreate: (data: AuthorFindOrCreate) =>
    api.post<AuthorMatchResult>("/authors/find-or-create", data),
  update: (id: number, data: { author_gender?: string; country?: string }) =>
    api.put<Author>(`/authors/${id}`, data),
};