import { api } from "./client";
import type { Reading, ReadingCreate } from "../types/Book";

export const readingsApi = {
  listByBook: (bookId: number) => api.get<Reading[]>(`/readings/book/${bookId}`),
  create: (reading: ReadingCreate) => api.post<Reading>("/readings/", reading),
  update: (id: number, reading: ReadingCreate) => api.put<Reading>(`/readings/${id}`, reading),
  delete: (id: number) => api.delete(`/readings/${id}`),
};