export type AuthorGender = "female" | "male" | "diverse";

export interface Author {
  id: number;
  name: string;
  author_gender?: AuthorGender;
  country?: string;
}

export interface AuthorFindOrCreate {
  name: string;
  author_gender?: AuthorGender;
  country?: string;
  force_create?: boolean;
}

export interface AuthorMatchResult {
  status: "found" | "created" | "suggestions";
  author?: Author;
  suggestions: Author[];
}