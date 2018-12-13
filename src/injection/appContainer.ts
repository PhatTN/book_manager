import { BookRouter } from "Apps/bookRouter";
import { Router } from "Common/router";
import { apiConfig } from "Configs/api";
import { PostgresConfig, ServerConfig } from "Configs/appConfig";
import { BookDbGateway, BookDbGatewayImpl } from "Gateways/bookDbGateway";
import { TYPES } from "Injection/types";
import { Container } from "inversify";
import "reflect-metadata";
import { BookRepository, BookRepositoryImpl } from "Repositories/bookRepository";
import { GetAllBooksUseCase, GetAllBooksUseCaseImpl } from "Usecases/book/getAllBooksUseCase";
import { IdValidator, IdValidatorImpl } from "Usecases/validator/idValidator";
import { DateTimeUtils, DateTimeUtilsImpl } from "Utils/dateTimeUtils";
import { KnextProvider, KnextProviderImpl } from "Utils/knexProvider";
import { Logger, WinstonLogger } from "Utils/logger";
import { TypeUtils, TypeUtilsImpl } from "Utils/typeUtils";

export class AppContainer extends Container {
  public inject() {
    // Configs
    this.provideNodeEnvironment();
    this.provideServerConfig();
    this.providePostgresConfig();

    // Utilities
    this.provideLogger();
    this.provideKnexProvider();
    this.provideDateTimeUtils();
    this.provideTypeUtils();

    // Validators
    this.provideIdValidator();

    // Books
    this.provideBookDbGateway();
    this.provideBookRepository();
    this.provideGetAllBooksUseCase();
    this.provideBookRouter();
  }

  protected provideNodeEnvironment() {
    this.bind<string>(TYPES.NodeEnv).toConstantValue(apiConfig.env);
  }

  protected provideServerConfig() {
    this.bind<ServerConfig>(TYPES.ServerConfig).toConstantValue(apiConfig.serverConfig);
  }

  protected providePostgresConfig() {
    this.bind<PostgresConfig>(TYPES.PostgresConfig).toConstantValue(apiConfig.postgresConfig);
  }

  protected provideLogger() {
    this.bind<Logger>(TYPES.Logger)
      .to(WinstonLogger)
      .inSingletonScope();
  }

  protected provideKnexProvider() {
    this.bind<KnextProvider>(TYPES.KnexProvider)
      .to(KnextProviderImpl)
      .inSingletonScope();
  }

  protected provideDateTimeUtils() {
    this.bind<DateTimeUtils>(TYPES.DateTimeUtils)
      .to(DateTimeUtilsImpl)
      .inSingletonScope();
  }

  protected provideTypeUtils() {
    this.bind<TypeUtils>(TYPES.TypeUtils)
      .to(TypeUtilsImpl)
      .inSingletonScope();
  }

  protected provideIdValidator() {
    this.bind<IdValidator>(TYPES.IdValidator)
      .to(IdValidatorImpl)
      .inSingletonScope();
  }

  protected provideBookDbGateway() {
    this.bind<BookDbGateway>(TYPES.BookDbGateway)
      .to(BookDbGatewayImpl)
      .inSingletonScope();
  }

  protected provideBookRepository() {
    this.bind<BookRepository>(TYPES.BookRepository)
      .to(BookRepositoryImpl)
      .inSingletonScope();
  }
  protected provideGetAllBooksUseCase() {
    this.bind<GetAllBooksUseCase>(TYPES.GetAllBooksUseCase)
      .to(GetAllBooksUseCaseImpl)
      .inSingletonScope();
  }
  protected provideBookRouter() {
    this.bind<Router>(TYPES.BookRouter)
      .to(BookRouter)
      .inSingletonScope();
  }
}
