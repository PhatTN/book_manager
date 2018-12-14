import { TYPES } from "Injection/types";
import { inject, injectable } from "inversify";
import { BookRepository } from "Repositories/bookRepository";
import { TestConstants } from "Tests/utils/testConstants";
import { BookViewResponse } from "Viewobjects/book/bookViewResponse";
import { NewBookViewRequest } from "Viewobjects/book/newBookViewRequest";

export interface AddNewBookUseCase {
  execute(request: NewBookViewRequest): Promise<BookViewResponse>;
}

@injectable()
export class AddNewBookUseCaseImpl implements AddNewBookUseCase {
  constructor(@inject(TYPES.BookRepository) private readonly bookRepository: BookRepository) {}

  public async execute(request: NewBookViewRequest): Promise<BookViewResponse> {
    return (request.title === undefined) as any;
  }
}
