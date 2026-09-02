import type { Author } from "./Author";

export type ReadingStatus = "to_read" | "reading" | "read" | "in_library";
export type BookFormat = "paperback" | "ebook" | "audiobook";

export interface Reading {
  id: number;
  book_id: number;
  status: ReadingStatus;
  start_reading?: string;
  finish_reading?: string;
  rating?: number;
  notes?: string;
  new_author: boolean;
}

export interface Book {
  id: number;
  title: string;
  isbn?: string;
  pages?: number;
  author_id: number;
  author: Author;
  genre?: string;
  year?: number;
  language?: string;
  publisher?: string;
  category?: string;
  format?: BookFormat;
  readings: Reading[];
}

export interface BookCreate {
  title: string;
  isbn?: string;
  pages?: number;
  author_id: number;
  genre?: string;
  year?: number;
  language?: string;
  publisher?: string;
  category?: string;
  format?: BookFormat;
  start_reading?: string;
  finish_reading?: string;
  rating?: number;
  notes?: string;
  new_author?: boolean;
}

export interface ReadingCreate {
  book_id: number;
  status: ReadingStatus;
  start_reading?: string;
  finish_reading?: string;
  rating?: number;
  notes?: string;
  new_author?: boolean;
}
