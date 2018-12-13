import { SystemMessage } from "Common/systemMessage";
import { HttpBaseError } from "Errors/httpBaseError";
import { NotFoundError } from "Errors/notFoundError";

describe("NotFoundError", () => {
  it("should create new instance success with valid data", () => {
    const error = new NotFoundError(CLASS_NAME, FUNCTION_NAME, MESSAGE);

    expect(error).toBeInstanceOf(HttpBaseError);
    expect(error.name).toEqual("NotFoundError");
    expect(error.code).toEqual(404);
    expect(error.reason).toEqual("NotFoundError");
    expect(error.message).toEqual(MESSAGE);
    expect(error.className).toEqual(CLASS_NAME);
    expect(error.functionName).toEqual(FUNCTION_NAME);
  });

  it("Use default message if missing pass it", () => {
    const error = new NotFoundError(CLASS_NAME, FUNCTION_NAME, undefined);

    expect(error.message).toEqual(SystemMessage.RESOURCE_NOT_FOUND_ERROR);
  });

  const MESSAGE = "Error message";
  const CLASS_NAME = "ClassName";
  const FUNCTION_NAME = "FunctionName";
});
