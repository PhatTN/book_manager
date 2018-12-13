import { SystemMessage } from "Common/systemMessage";
import { HttpBaseError } from "Errors/httpBaseError";

export class UnprocessableEntityError extends HttpBaseError {
  constructor(
    className: string,
    functionName: string,
    message: string = SystemMessage.NON_EXISTING_RESOURCE,
  ) {
    super(className, functionName, 422, "UnprocessableEntityError", message);
  }
}
