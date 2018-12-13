import { apiConfig } from "Configs/api";
import { PostgresConfig, ServerConfig } from "Configs/appConfig";
import { TYPES } from "Injection/types";
import { Container } from "inversify";
import "reflect-metadata";
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
}
