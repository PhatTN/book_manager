import { HttpBaseError } from "Errors/httpBaseError";

describe("HttpBaseError", () => {
  it("should create new instance success with valid data", () => {
    const error = new HttpBaseError(CLASS_NAME, FUNCTION_NAME, CODE, REASON, MESSAGE);

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toEqual("HttpBaseError");
    expect(error.code).toEqual(CODE);
    expect(error.reason).toEqual(REASON);
    expect(error.message).toEqual(MESSAGE);
    expect(error.className).toEqual(CLASS_NAME);
    expect(error.functionName).toEqual(FUNCTION_NAME);
  });

  it("Use default code=500 and reason=InternalServerError if missing pass them", () => {
    const error = new HttpBaseError(CLASS_NAME, FUNCTION_NAME, undefined, undefined, MESSAGE);

    expect(error.code).toEqual(500);
    expect(error.reason).toEqual("InternalServerError");
    expect(error.message).toEqual(MESSAGE);
    expect(error.className).toEqual(CLASS_NAME);
    expect(error.functionName).toEqual(FUNCTION_NAME);
  });

  const CODE = 200;
  const REASON = "No reason";
  const MESSAGE = "Error message";
  const CLASS_NAME = "ClassName";
  const FUNCTION_NAME = "FunctionName";
});
