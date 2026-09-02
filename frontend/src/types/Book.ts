export type ReadingStatus = "to_read" | "read" | "in_library";
export type BookFormat = "paperback" | "ebook" | "audiobook";
export type AuthorGender = "female" | "male" | "diverse";

export interface Book {
  id: number;
  title: string;
  isbn?: string;
  pages?: number;
  author_id: number;
  status: ReadingStatus;
  start_reading?: string;   // ISO date string
  finish_reading?: string;  // ISO date string
  rating?: number;
  notes?: string;
  genre?: string;
  year?: number;
  language?: string;
  publisher?: string;
  category?: string;
  format?: BookFormat;
}

export interface BookCreate {
  title: string;
  isbn?: string;
  pages?: number;
  author_id: number;
  status: ReadingStatus;
  start_reading?: string;
  finish_reading?: string;
  rating?: number;
  notes?: string;
  genre?: string;
  year?: number;
  language?: string;
  publisher?: string;
  category?: string;
  format?: BookFormat;
}