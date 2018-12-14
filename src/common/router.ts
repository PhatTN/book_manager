import { injectable } from "inversify";
import { Context } from "joi";
import { IMiddleware } from "koa-router";

@injectable()
export abstract class Router {
  protected static buildSuccessBody<T>(data: T): SuccessResponse<T> {
    return { data };
  }

  public abstract routes(): IMiddleware;

  protected buildSuccessArrayBodyWithoutPaging<T>(data: T[]): SuccessArrayResponseWithoutPaging<T> {
    return { dataa: data };
  }

  protected handlePublicRoute(
    handler: ((context: Context) => Promise<any>),
  ): ((context: Context) => Promise<any>) {
    return async (context: Context): Promise<any> => {
      await handler(context);
    };
  }
}

interface SuccessResponse<T> {
  data: T;
}

interface SuccessArrayResponseWithoutPaging<T> {
  dataa: T[];
}
