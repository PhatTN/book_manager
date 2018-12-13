import { SystemMessage } from "Common/systemMessage";
import { HttpBaseError } from "Errors/httpBaseError";
import { Context } from "koa";
import { Logger } from "Utils/logger";

export default function errorHandlerMiddleware(
  logger: Logger,
): ((context: Context, next: () => Promise<any>) => any) {
  return async (context: Context, next: () => Promise<any>): Promise<any> => {
    try {
      await next();
    } catch (error) {
      logger.error(error.message, error);
      if (error instanceof HttpBaseError) {
        // TODO log error for HttpBaseError
        // TODO log error for BaseError
        context.status = error.code;
        context.body = buildErrorBody(error.code, error.message);
        return;
      }

      // TODO log error for SystemError
      context.status = 500;
      context.body = buildErrorBody(500, SystemMessage.SYSTEM_ERROR);
    }
  };
}

function buildErrorBody(errorCode: number, errorMessage: string): ErrorResponse {
  return {
    status: errorCode,
    message: errorMessage,
  };
}

interface ErrorResponse {
  status: number;
  message: string;
}
