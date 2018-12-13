import { PostgresConfig, ServerConfig } from "Configs/appConfig";
import { AppContainer } from "Injection/appContainer";
import { TYPES } from "Injection/types";
import { TEST_TYPES } from "Tests/integrations/testTypes";
import { TestDatabaseHelper, TestDatabaseHelperImpl } from "Tests/utils/testDatabaseHelper";
import { TestDateTimeHelper, TestDateTimeHelperImpl } from "Tests/utils/testDateTimeHelper";
import { IdValidator } from "Usecases/validator/idValidator";
import { DateTimeUtils } from "Utils/dateTimeUtils";
import { KnextProvider } from "Utils/knexProvider";
import { Logger } from "Utils/logger";
import { TypeUtils } from "Utils/typeUtils";

export class TestContainer extends AppContainer {
  private readonly mockProviderMap: Map<symbol, any> = new Map();

  public inject() {
    super.inject();

    this.provideTestDateTimeHelper();
    this.provideTestDatabaseHelper();
  }

  public injectMock(type: symbol, value: any) {
    this.mockProviderMap.set(type, value);
  }

  protected provideNodeEnvironment() {
    const env = this.mockProviderMap.get(TYPES.NodeEnv);
    if (env) {
      this.bind<string>(TYPES.NodeEnv).toConstantValue(env);
      return;
    }

    super.provideNodeEnvironment();
  }

  protected provideServerConfig() {
    const config = this.mockProviderMap.get(TYPES.ServerConfig);
    if (config) {
      this.bind<ServerConfig>(TYPES.ServerConfig).toConstantValue(config);
      return;
    }

    super.provideServerConfig();
  }

  protected providePostgresConfig() {
    const config = this.mockProviderMap.get(TYPES.PostgresConfig);
    if (config) {
      this.bind<PostgresConfig>(TYPES.PostgresConfig).toConstantValue(config);
      return;
    }

    super.providePostgresConfig();
  }

  protected provideLogger() {
    const logger = this.mockProviderMap.get(TYPES.Logger);
    if (logger) {
      this.bind<Logger>(TYPES.Logger).toConstantValue(logger);
      return;
    }

    super.provideLogger();
  }

  protected provideKnexProvider() {
    const provider = this.mockProviderMap.get(TYPES.KnexProvider);
    if (provider) {
      this.bind<KnextProvider>(TYPES.KnexProvider).toConstantValue(provider);
      return;
    }

    super.provideKnexProvider();
  }

  protected provideDateTimeUtils() {
    const utils = this.mockProviderMap.get(TYPES.DateTimeUtils);
    if (utils) {
      this.bind<DateTimeUtils>(TYPES.DateTimeUtils).toConstantValue(utils);
      return;
    }

    super.provideDateTimeUtils();
  }

  protected provideTypeUtils() {
    const utils = this.mockProviderMap.get(TYPES.TypeUtils);
    if (utils) {
      this.bind<TypeUtils>(TYPES.TypeUtils).toConstantValue(utils);
      return;
    }

    super.provideTypeUtils();
  }

  protected provideIdValidator() {
    const validator = this.mockProviderMap.get(TYPES.IdValidator);
    if (validator) {
      this.bind<IdValidator>(TYPES.IdValidator).toConstantValue(validator);
      return;
    }

    super.provideIdValidator();
  }

  protected provideTestDateTimeHelper() {
    this.bind<TestDateTimeHelper>(TEST_TYPES.TestDateTimeHelper)
      .to(TestDateTimeHelperImpl)
      .inSingletonScope();
  }

  protected provideTestDatabaseHelper() {
    this.bind<TestDatabaseHelper>(TEST_TYPES.TestDatabaseHelper)
      .to(TestDatabaseHelperImpl)
      .inSingletonScope();
  }
}
