export class ApiConfig {
  private _env: string;
  private _serverConfig: ServerConfig | undefined = undefined;
  private _postgresConfig: PostgresConfig | undefined = undefined;

  constructor(
    env: string,
    serverConfig: ServerConfig,
    postgresConfig: PostgresConfig,
  ) {
    this._env = env;
    this._serverConfig = serverConfig;
    this._postgresConfig = postgresConfig;
  }

  get env(): string {
    return this._env;
  }

  get serverConfig(): ServerConfig {
    if (!this._serverConfig) {
      throw new Error(`Server config wasn't set yet`);
    }

    return this._serverConfig;
  }

  get postgresConfig(): PostgresConfig {
    if (!this._postgresConfig) {
      throw new Error(`Postgres config wasn't set yet`);
    }

    return this._postgresConfig;
  }

}

export interface ServerConfig {
  readonly port: number;
}

export interface PostgresConfig {
  readonly host: string;
  readonly port: number;
  readonly user: string;
  readonly password: string;
  readonly database: string;
}
