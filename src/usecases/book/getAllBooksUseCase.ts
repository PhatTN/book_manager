import { TYPES } from "Injection/types";
import { inject, injectable } from "inversify";
import { BookRepository } from "Repositories/bookRepository";
import { BookViewResponse } from "Viewobjects/book/bookViewResponse";

export interface GetAllBooksUseCase {
  execute(): Promise<BookViewResponse[]>;
}

@injectable()
export class GetAllBooksUseCaseImpl implements GetAllBooksUseCase {

  constructor(@inject(TYPES.BookRepository) private readonly bookRepository: BookRepository) {}

  public async execute(): Promise<BookViewResponse[]> {
    const books = await this.bookRepository.getBooks();

    return books.map((book) => BookViewResponse.from(book));
  }
}
