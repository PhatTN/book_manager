import { IllegalParameterError } from "Errors/illegalParameterError";
import { NewBookRequest } from "Models/book/newBookRequest";
import "reflect-metadata";
import { TestConstants } from "Tests/utils/testConstants";
import { TestDateTimeHelper, TestDateTimeHelperImpl } from "Tests/utils/testDateTimeHelper";

describe("NewBookRequest", () => {
  const dateTimeHelper: TestDateTimeHelper = new TestDateTimeHelperImpl();

  beforeAll(() => {
    dateTimeHelper.mockDate(MOCK_TIME);
  });

  afterAll(() => {
    dateTimeHelper.resetDate();
  });

  it("should new instance successfully with valid data", () => {
    const request = new NewBookRequest(
      VALID_TITLE,
      VALID_DESCRIPTION,
      VALID_ISBN,
      VALID_AUTHOR_NAME,
    );

    expect(request.title).toEqual(VALID_TITLE);
    expect(request.description).toEqual(VALID_DESCRIPTION);
    expect(request.isbn).toEqual(VALID_ISBN);
    expect(request.author_name).toEqual(VALID_AUTHOR_NAME);
    expect(request.created_at.toISOString()).toEqual(MOCK_TIME);
    expect(request.updated_at.toISOString()).toEqual(MOCK_TIME);
  });

  it("unable to new instance when missing 'title'", () => {
    try {
      expect.hasAssertions();
      const request = new NewBookRequest(
        undefined,
        VALID_DESCRIPTION,
        VALID_ISBN,
        VALID_AUTHOR_NAME,
      );
    } catch (error) {
      expect(error).toBeInstanceOf(IllegalParameterError);
      expect(error.message).toEqual(expect.stringContaining("title"));
    }
  });

  it("unable to new instance when missing 'description'", () => {
    try {
      expect.hasAssertions();
      const request = new NewBookRequest(VALID_TITLE, undefined, VALID_ISBN, VALID_AUTHOR_NAME);
    } catch (error) {
      expect(error).toBeInstanceOf(IllegalParameterError);
      expect(error.message).toEqual(expect.stringContaining("description"));
    }
  });

  it("unable to new instance when missing 'isbn'", () => {
    try {
      expect.hasAssertions();
      const request = new NewBookRequest(
        VALID_TITLE,
        VALID_DESCRIPTION,
        undefined,
        VALID_AUTHOR_NAME,
      );
    } catch (error) {
      expect(error).toBeInstanceOf(IllegalParameterError);
      expect(error.message).toEqual(expect.stringContaining("isbn"));
    }
  });

  it("should new instance successfully when missing 'author_name'", () => {
    const request = new NewBookRequest(VALID_TITLE, VALID_DESCRIPTION, VALID_ISBN, undefined);

    expect(request.title).toEqual(VALID_TITLE);
    expect(request.description).toEqual(VALID_DESCRIPTION);
    expect(request.isbn).toEqual(VALID_ISBN);
    expect(request.author_name).toEqual(undefined);
    expect(request.created_at.toISOString()).toEqual(MOCK_TIME);
    expect(request.updated_at.toISOString()).toEqual(MOCK_TIME);
  });

  it("unable to new instance when passing invalid 'title'", () => {
    try {
      expect.hasAssertions();
      const request = new NewBookRequest("a", VALID_DESCRIPTION, VALID_ISBN, VALID_AUTHOR_NAME);
    } catch (error) {
      expect(error).toBeInstanceOf(IllegalParameterError);
      expect(error.message).toEqual(expect.stringContaining("title"));
    }
  });

  // TODO Add more test

  const MOCK_TIME = TestConstants.MOCK_CURRENT_TIME;
  const VALID_TITLE = "Valid book's title";
  const VALID_DESCRIPTION = "Valid book's description";
  const VALID_ISBN = "1234567890";
  const VALID_AUTHOR_NAME = "Phat Tran Ngoc";
});
