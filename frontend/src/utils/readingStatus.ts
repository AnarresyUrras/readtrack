import type { Book, Reading, ReadingStatus } from "../types/Book";

export function getCurrentReading(book: Book): Reading | undefined {
  if (book.readings.length === 0) return undefined;
  return book.readings[book.readings.length - 1];
}

export function getDisplayStatus(book: Book): ReadingStatus {
  return getCurrentReading(book)?.status ?? "to_read";
}