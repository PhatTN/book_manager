import { PostgresConfig } from "Configs/appConfig";
import { TYPES } from "Injection/types";
import { inject, injectable } from "inversify";
import knex from "knex";
import knexPostgis from "knex-postgis";
import pg from "pg";

const PG_DECIMAL_OID = 1700;
pg.types.setTypeParser(PG_DECIMAL_OID, parseFloat);

export interface KnextProvider {
  knex(): knex;
  potgis(): knexPostgis.KnexPostgis;
}

@injectable()
export class KnextProviderImpl implements KnextProvider {
  private readonly knexClient: knex;
  private readonly potgisClient: knexPostgis.KnexPostgis;

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

    this.potgisClient = knexPostgis(this.knexClient);
  }

  public knex(): knex {
    return this.knexClient;
  }

  public potgis(): knexPostgis.KnexPostgis {
    return this.potgisClient;
  }
}
