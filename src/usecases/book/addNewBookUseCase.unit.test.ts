import { BookDbGateway } from "Gateways/bookDbGateway";
import { BookResponse } from "Models/book/bookResponse";
import "reflect-metadata";
import { BookRepositoryImpl } from "Repositories/bookRepository";
import { TestConstants } from "Tests/utils/testConstants";
import { TestDateTimeHelper, TestDateTimeHelperImpl } from "Tests/utils/testDateTimeHelper";
import { createMockGateway } from "Tests/utils/testMockHelper";
import { AddNewBookUseCase, AddNewBookUseCaseImpl } from "Usecases/book/addNewBookUseCase";
import { BookViewResponse } from "Viewobjects/book/bookViewResponse";
import { NewBookViewRequest } from "Viewobjects/book/newBookViewRequest";

describe("AddNewBookUseCase", () => {
  const dateTimeHelper: TestDateTimeHelper = new TestDateTimeHelperImpl();

  beforeAll(() => {
    dateTimeHelper.mockDate(MOCK_TIME);
  });

  afterAll(() => {
    dateTimeHelper.resetDate();
  });

  it("insert new book successfully", async () => {
    const usecase = new AddNewBookUseCaseImpl({} as any);

    const response = await usecase.execute({} as any);

    expect(response).toEqual(false);
  });

  it("insert new book fail with invalid data", async () => {
    const usecase = new AddNewBookUseCaseImpl({} as any);

    const response = await usecase.execute({ title: "invalid title" } as any);

    expect(response).toEqual(false);
  });

  const MOCK_TIME = TestConstants.MOCK_CURRENT_TIME;
});
