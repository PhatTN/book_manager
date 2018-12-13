import { TrackableSystemError } from "Errors/trackableSystemError";

describe("TrackableSystemError", () => {
  it("should create new instance success with valid data", () => {
    const error = new TrackableSystemError(CLASS_NAME, FUNCTION_NAME, MESSAGE);

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toEqual("TrackableSystemError");
    expect(error.className).toEqual(CLASS_NAME);
    expect(error.functionName).toEqual(FUNCTION_NAME);
    expect(error.message).toEqual(MESSAGE);
  });

  const MESSAGE = "Error message";
  const CLASS_NAME = "TrackableSystemErrorTest";
  const FUNCTION_NAME = "FunctionName";
});
