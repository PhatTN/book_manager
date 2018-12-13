import { SystemMessage } from "Common/systemMessage";
import { HttpBaseError } from "Errors/httpBaseError";

export class NotFoundError extends HttpBaseError {
  constructor(
    className: string,
    functionName: string,
    message: string = SystemMessage.RESOURCE_NOT_FOUND_ERROR,
  ) {
    super(className, functionName, 404, "NotFoundError", message);
  }
}
