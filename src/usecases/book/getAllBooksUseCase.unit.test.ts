import { BookDbGateway } from "Gateways/bookDbGateway";
import { BookResponse } from "Models/book/bookResponse";
import "reflect-metadata";
import { BookRepositoryImpl } from "Repositories/bookRepository";
import { TestConstants } from "Tests/utils/testConstants";
import { TestDateTimeHelper, TestDateTimeHelperImpl } from "Tests/utils/testDateTimeHelper";
import { createMockGateway } from "Tests/utils/testMockHelper";
import { GetAllBooksUseCase, GetAllBooksUseCaseImpl } from "Usecases/book/getAllBooksUseCase";
import { BookViewResponse } from "Viewobjects/book/bookViewResponse";
import { NewBookViewRequest } from "Viewobjects/book/newBookViewRequest";

describe("GetAllBooksUseCase", () => {
  const dateTimeHelper: TestDateTimeHelper = new TestDateTimeHelperImpl();

  beforeAll(() => {
    dateTimeHelper.mockDate(MOCK_TIME);
  });

  afterAll(() => {
    dateTimeHelper.resetDate();
  });

  it("should get all books successful", async () => {
    const gateway = createGateway(BOOK_RESPONSE_ARRAY);
    const useCase = createUseCase(gateway);

    expect.hasAssertions();
    const response = await useCase.execute();

    expect(gateway.getBooks).toHaveBeenCalledTimes(1);
    expect(response).toEqual(BOOK_VIEW_RESPONSE_ARRAY);
  });

  it("should throw exception when an error occurs in gateway", async () => {
    const expectedError = new Error("mock error");
    const gateway = createGateway(undefined, expectedError);
    const useCase = createUseCase(gateway);

    try {
      expect.hasAssertions();
      const response = await useCase.execute();
    } catch (error) {
      expect(gateway.getBooks).toHaveBeenCalledTimes(1);
      expect(error).toBe(expectedError);
    }
  });

  function createGateway(response?: BookResponse[], error?: Error): BookDbGateway {
    return createMockGateway<BookDbGateway, BookResponse[]>("getBooks", response, error);
  }

  function createUseCase(gateway: BookDbGateway): GetAllBooksUseCase {
    const repository = new BookRepositoryImpl(gateway);
    return new GetAllBooksUseCaseImpl(repository);
  }

  const MOCK_TIME = TestConstants.MOCK_CURRENT_TIME;

  const NEW_BOOK_VIEW_REQUEST: NewBookViewRequest = {
    title: TestConstants.BOOK_TITLE,
    description: TestConstants.BOOK_DESCRIPTION,
    isbn: TestConstants.BOOK_ISBN,
    authorName: TestConstants.BOOK_AUTHOR_NAME,
  };

  const BOOK_RESPONSE_OBJECT = new BookResponse(
    TestConstants.ID,
    TestConstants.BOOK_TITLE,
    TestConstants.BOOK_DESCRIPTION,
    TestConstants.BOOK_ISBN,
    TestConstants.BOOK_AUTHOR_NAME,
    TestConstants.CREATED_AT,
    TestConstants.UPDATE_AT,
  );
  const BOOK_RESPONSE_ARRAY = [BOOK_RESPONSE_OBJECT];

  const BOOK_VIEW_RESPONSE_OBJECT = new BookViewResponse(
    TestConstants.ID,
    TestConstants.BOOK_TITLE,
    TestConstants.BOOK_DESCRIPTION,
    TestConstants.BOOK_ISBN,
    TestConstants.BOOK_AUTHOR_NAME,
    TestConstants.UPDATE_AT,
  );
  const BOOK_VIEW_RESPONSE_ARRAY = [BOOK_VIEW_RESPONSE_OBJECT];

});
