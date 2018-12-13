/* tslint:disable:import-name */
import { Router } from "Common/router";
import { injectable } from "inversify";
import KoaRouter, { IMiddleware } from "koa-router";

@injectable()
export class AmenityRouter extends Router {
  private readonly router: KoaRouter;

  constructor(
  ) {
    super();
    this.router = new KoaRouter({
      prefix: "/amenities",
    });

    this.router.get(
      "GetListOfAmenity",
      "/",
      this.handlePublicRoute(async (ctx) => {
        const { pageToken, maxResults } = ctx.query;

        // const body = await this.getListOfAmenityUseCase.execute(pageInfo);

        // ctx.body = this.buildSuccessArrayBody(body, pageInfo);
        ctx.status = 200;
      }),
    );
  }

  public routes(): IMiddleware {
    return this.router.routes();
  }
}
