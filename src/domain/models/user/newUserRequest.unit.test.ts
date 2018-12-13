import { IllegalParameterError } from "Errors/illegalParameterError";
import { NewUserRequest } from "Models/user/newUserRequest";
import "reflect-metadata";
import { TestConstants } from "Tests/utils/testConstants";
import { TestDateTimeHelper, TestDateTimeHelperImpl } from "Tests/utils/testDateTimeHelper";

describe("NewUserRequest", () => {
  const dateTimeHelper: TestDateTimeHelper = new TestDateTimeHelperImpl();

  beforeAll(() => {
    dateTimeHelper.mockDate(MOCK_TIME);
  });

  afterAll(() => {
    dateTimeHelper.resetDate();
  });

  it("should new instance successfully with valid data", () => {
    const request = new NewUserRequest(VALID_USER_ID, VALID_NAME);

    expect(request.user_id).toEqual(VALID_USER_ID);
    expect(request.name).toEqual(VALID_NAME);
    expect(request.created_at.toISOString()).toEqual(MOCK_TIME);
    expect(request.updated_at.toISOString()).toEqual(MOCK_TIME);
  });

  it("unable to new instance when missing 'user_id'", () => {
    try {
      expect.hasAssertions();
      const request = new NewUserRequest(undefined, VALID_NAME);
    } catch (error) {
      expect(error).toBeInstanceOf(IllegalParameterError);
      expect(error.message).toEqual(expect.stringContaining("id"));
    }
  });

  it("unable to new instance when missing 'name'", () => {
    try {
      expect.hasAssertions();
      const request = new NewUserRequest(VALID_USER_ID, undefined);
    } catch (error) {
      expect(error).toBeInstanceOf(IllegalParameterError);
      expect(error.message).toEqual(expect.stringContaining("name"));
    }
  });

  it("unable to new instance when passing invalid 'user_id'", () => {
    try {
      expect.hasAssertions();
      const request = new NewUserRequest("invalid", VALID_NAME);
    } catch (error) {
      expect(error).toBeInstanceOf(IllegalParameterError);
      expect(error.message).toEqual(expect.stringContaining("id"));
    }
  });

  it("unable to new instance when passing invalid 'name'", () => {
    try {
      expect.hasAssertions();
      const request = new NewUserRequest(VALID_USER_ID, "b");
    } catch (error) {
      expect(error).toBeInstanceOf(IllegalParameterError);
      expect(error.message).toEqual(expect.stringContaining("name"));
    }
  });

  const MOCK_TIME = TestConstants.MOCK_CURRENT_TIME;
  const VALID_USER_ID = TestConstants.USER_ID;
  const VALID_NAME = "Phat Tran Ngoc";
});
