export interface Book {
  id: number;
  title: string;
  author: string;
  isbn?: string;
  authorGender?: "female" | "male" | "divers";
  country?: string;
  genre?: string;
  year?: number;
  language?: string;
  pages?: number;
  publisher?: string;
  rating?: number;
  newAuthor?: boolean;
  category?: string;
  started?: string;
  finished?: string;
  format?: string;
  status: "library" | "to_read" | "read";
}