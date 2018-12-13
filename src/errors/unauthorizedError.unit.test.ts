import { SystemMessage } from "Common/systemMessage";
import { HttpBaseError } from "Errors/httpBaseError";
import { UnauthorizedError } from "Errors/unauthorizedError";

describe("UnauthorizedError", () => {
  it("should create new instance success with valid data", () => {
    const error = new UnauthorizedError(CLASS_NAME, FUNCTION_NAME, MESSAGE);

    expect(error).toBeInstanceOf(HttpBaseError);
    expect(error.name).toEqual("UnauthorizedError");
    expect(error.code).toEqual(401);
    expect(error.reason).toEqual("UnauthorizedError");
    expect(error.message).toEqual(MESSAGE);
    expect(error.className).toEqual(CLASS_NAME);
    expect(error.functionName).toEqual(FUNCTION_NAME);
  });

  it("Use default message if missing pass it", () => {
    const error = new UnauthorizedError(CLASS_NAME, FUNCTION_NAME, undefined);

    expect(error.message).toEqual(SystemMessage.UNAUTHORIZED_ERROR);
  });

  const MESSAGE = "Error message";
  const CLASS_NAME = "ClassName";
  const FUNCTION_NAME = "FunctionName";
});
