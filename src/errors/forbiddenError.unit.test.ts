import { SystemMessage } from "Common/systemMessage";
import { ForbiddenError } from "Errors/forbiddenError";
import { HttpBaseError } from "Errors/httpBaseError";

describe("ForbiddenError", () => {
  it("should create new instance success with valid data", () => {
    const error = new ForbiddenError(CLASS_NAME, FUNCTION_NAME, MESSAGE);

    expect(error).toBeInstanceOf(HttpBaseError);
    expect(error.name).toEqual("ForbiddenError");
    expect(error.code).toEqual(403);
    expect(error.reason).toEqual("ForbiddenError");
    expect(error.message).toEqual(MESSAGE);
    expect(error.className).toEqual(CLASS_NAME);
    expect(error.functionName).toEqual(FUNCTION_NAME);
  });

  it("Use default message if missing pass it", () => {
    const error = new ForbiddenError(CLASS_NAME, FUNCTION_NAME, undefined);

    expect(error.message).toEqual(SystemMessage.FORBIDDEN_ERROR);
  });

  const MESSAGE = "Error message";
  const CLASS_NAME = "ClassName";
  const FUNCTION_NAME = "FunctionName";
});
