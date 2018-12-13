import { HttpBaseError } from "Errors/httpBaseError";
import { IllegalParameterError } from "Errors/illegalParameterError";

describe("IllegalParameterError", () => {
  it("should create new instance success with valid data", () => {
    const error = new IllegalParameterError(CLASS_NAME, FUNCTION_NAME, MESSAGE);

    expect(error).toBeInstanceOf(HttpBaseError);
    expect(error.name).toEqual("IllegalParameterError");
    expect(error.code).toEqual(400);
    expect(error.reason).toEqual("IllegalParameterError");
    expect(error.message).toEqual(MESSAGE);
    expect(error.className).toEqual(CLASS_NAME);
    expect(error.functionName).toEqual(FUNCTION_NAME);
  });

  const MESSAGE = "Error message";
  const CLASS_NAME = "ClassName";
  const FUNCTION_NAME = "FunctionName";
});
