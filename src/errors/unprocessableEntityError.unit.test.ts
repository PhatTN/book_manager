import { SystemMessage } from "Common/systemMessage";
import { HttpBaseError } from "Errors/httpBaseError";
import { UnprocessableEntityError } from "Errors/unprocessableEntityError";

describe("UnprocessableEntityError", () => {
  it("should create new instance success with valid data", () => {
    const error = new UnprocessableEntityError(CLASS_NAME, FUNCTION_NAME, MESSAGE);

    expect(error).toBeInstanceOf(HttpBaseError);
    expect(error.name).toEqual("UnprocessableEntityError");
    expect(error.code).toEqual(422);
    expect(error.reason).toEqual("UnprocessableEntityError");
    expect(error.message).toEqual(MESSAGE);
    expect(error.className).toEqual(CLASS_NAME);
    expect(error.functionName).toEqual(FUNCTION_NAME);
  });

  it("Use default message if missing pass it", () => {
    const error = new UnprocessableEntityError(CLASS_NAME, FUNCTION_NAME, undefined);

    expect(error.message).toEqual(SystemMessage.NON_EXISTING_RESOURCE);
  });

  const MESSAGE = "Error message";
  const CLASS_NAME = "ClassName";
  const FUNCTION_NAME = "FunctionName";
});
