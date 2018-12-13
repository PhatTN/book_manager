import { TYPES } from "Injection/types";
import { inject, injectable } from "inversify";
import knex from "knex";
import { BookResponse } from "Models/book/bookResponse";
import { NewBookRequest } from "Models/book/newBookRequest";
import { DatabaseTables } from "Models/databaseTables";
import { KnextProvider } from "Utils/knexProvider";

export interface BookDbGateway {
  addNewBook(request: NewBookRequest): Promise<BookResponse>;
  getBooks(): Promise<BookResponse[]>;
}

@injectable()
export class BookDbGatewayImpl implements BookDbGateway {
  private readonly knexClient: knex;

  constructor(@inject(TYPES.KnexProvider) knexProvider: KnextProvider) {
    this.knexClient = knexProvider.knex();
  }

  public async addNewBook(request: NewBookRequest): Promise<BookResponse> {
    const books = await this.knexClient(DatabaseTables.TABLE_BOOKS)
      .insert(request)
      .returning(BookResponse.RETURNED_COUMNS);

    return books[0];
  }

  public async getBooks(): Promise<BookResponse[]> {
    return this.knexClient(DatabaseTables.TABLE_BOOKS).select(BookResponse.RETURNED_COUMNS);
  }
}
