import { SystemMessage } from "Common/systemMessage";
import { HttpBaseError } from "Errors/httpBaseError";
import { InternalServerError } from "Errors/internalServerError";

describe("InternalServerError", () => {
  it("should create new instance success with valid data", () => {
    const error = new InternalServerError(CLASS_NAME, FUNCTION_NAME, MESSAGE);

    expect(error).toBeInstanceOf(HttpBaseError);
    expect(error.name).toEqual("InternalServerError");
    expect(error.code).toEqual(500);
    expect(error.reason).toEqual("InternalServerError");
    expect(error.message).toEqual(MESSAGE);
    expect(error.className).toEqual(CLASS_NAME);
    expect(error.functionName).toEqual(FUNCTION_NAME);
  });

  it("Use default message if missing pass it", () => {
    const error = new InternalServerError(CLASS_NAME, FUNCTION_NAME, undefined);

    expect(error.message).toEqual(SystemMessage.SYSTEM_ERROR);
  });

  const MESSAGE = "Error message";
  const CLASS_NAME = "ClassName";
  const FUNCTION_NAME = "FunctionName";
});
