import { api } from "./client";
import type { Author, AuthorFindOrCreate, AuthorMatchResult } from "../types/Author";

export const authorsApi = {
  list: () => api.get<Author[]>("/authors/"),
  findOrCreate: (data: AuthorFindOrCreate) =>
    api.post<AuthorMatchResult>("/authors/find-or-create", data),
};