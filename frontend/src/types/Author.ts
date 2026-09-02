export type AuthorGender = "female" | "male" | "diverse";

export interface Author {
  id: number;
  name: string;
  author_gender?: AuthorGender;
  country?: string;
}