import { BookDbGateway } from "Gateways/bookDbGateway";
import { TYPES } from "Injection/types";
import { inject, injectable } from "inversify";
import { BookResponse } from "Models/book/bookResponse";
import { NewBookRequest } from "Models/book/newBookRequest";

export interface BookRepository {
  addNewBook(request: NewBookRequest): Promise<BookResponse>;
  getBooks(): Promise<BookResponse[]>;
}

@injectable()
export class BookRepositoryImpl implements BookRepository {
  constructor(@inject(TYPES.BookDbGateway) private readonly bookDbGateway: BookDbGateway) {}

  public addNewBook(request: NewBookRequest): Promise<BookResponse> {
    return this.bookDbGateway.addNewBook(request);
  }

  public getBooks(): Promise<BookResponse[]> {
    return this.bookDbGateway.getBooks();
  }
}
