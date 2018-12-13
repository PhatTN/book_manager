import { SystemMessage } from "Common/systemMessage";
import { HttpBaseError } from "Errors/httpBaseError";

export class ForbiddenError extends HttpBaseError {
  constructor(
    className: string,
    functionName: string,
    message: string = SystemMessage.FORBIDDEN_ERROR,
  ) {
    super(className, functionName, 403, "ForbiddenError", message);
  }
}
