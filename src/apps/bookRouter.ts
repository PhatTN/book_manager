/* tslint:disable:import-name */
import { Router } from "Common/router";
import { TYPES } from "Injection/types";
import { inject, injectable } from "inversify";
import KoaRouter, { IMiddleware } from "koa-router";
import { GetAllBooksUseCase } from "Usecases/book/getAllBooksUseCase";

@injectable()
export class BookRouter extends Router {
  private readonly router: KoaRouter;

  constructor(
    @inject(TYPES.GetAllBooksUseCase) private readonly getAllBooksUseCase: GetAllBooksUseCase,
  ) {
    super();
    this.router = new KoaRouter({
      prefix: "/books",
    });

    this.router.get(
      "GetAllBooks",
      "/",
      this.handlePublicRoute(async (ctx) => {
        const books = await this.getAllBooksUseCase.execute();

        ctx.body = this.buildSuccessArrayBodyWithoutPaging(books);
        ctx.status = 200;
      }),
    );
  }

  public routes(): IMiddleware {
    return this.router.routes();
  }
}
