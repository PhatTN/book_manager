/* tslint:disable:import-name */
import errorHandlerMiddleware from "Common/middlewares/errorHandlerMiddleware";
import { ServerConfig } from "Configs/appConfig";
import http from "http";
import { TYPES } from "Injection/types";
import { Container } from "inversify";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { Logger } from "Utils/logger";

export class Server {
  private readonly app: Koa;
  private readonly logger: Logger;
  private readonly serverConfig: ServerConfig;

  constructor(appContainer: Container) {
    this.logger = appContainer.get<Logger>(TYPES.Logger);
    this.serverConfig = appContainer.get<ServerConfig>(TYPES.ServerConfig);

    // Router initialize
    // const homeRouter = appContainer.get<Router>(TYPES.HomeRouter);

    this.app = new Koa();
    this.app.use(bodyParser());
    this.app.use(errorHandlerMiddleware(this.logger));

    // this.app.use(homeRouter.routes());
  }

  public start(): http.Server {
    return this.app.listen(this.serverConfig.port, () => {
      this.logger.info(`The server is starting at port ${this.serverConfig.port}`);
    });
  }
}
