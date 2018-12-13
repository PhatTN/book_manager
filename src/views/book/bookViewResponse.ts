import { BookResponse } from "Models/book/bookResponse";

export class BookViewResponse {
  public static from(book: BookResponse): BookViewResponse {
    return new BookViewResponse(
      book.book_id,
      book.title,
      book.description,
      book.isbn,
      book.author_name,
      book.updated_at,
    );
  }

  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly isbn: string,
    public readonly authorName: string,
    public readonly updatedAt: Date,
  ) {}
}
