import { PostgresConfig } from "Configs/appConfig";
import { TYPES } from "Injection/types";
import { inject, injectable } from "inversify";
import knex from "knex";

export interface KnextProvider {
  knex(): knex;
}

@injectable()
export class KnextProviderImpl implements KnextProvider {
  private readonly knexClient: knex;

  constructor(
    @inject(TYPES.PostgresConfig) postgresConfig: PostgresConfig,
    @inject(TYPES.NodeEnv) env: string,
  ) {
    this.knexClient = knex({
      client: "pg",
      connection: {
        multipleStatements: true,
        host: postgresConfig.host,
        port: postgresConfig.port,
        user: postgresConfig.user,
        password: postgresConfig.password,
        database: postgresConfig.database,
      },
      pool: {
        min: 2,
        max: 10,
      },
      acquireConnectionTimeout: 15000,
      useNullAsDefault: true,
      migrations: {
        directory: `src/db/migrations/${env}`,
      },
      seeds: {
        directory: `src/db/seeds/${env}`,
      },
    });
  }

  public knex(): knex {
    return this.knexClient;
  }
}
