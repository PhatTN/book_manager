const TYPES = {
  // Utilities
  Logger: Symbol.for("Logger"),
  KnexProvider: Symbol.for("KnexProvider"),
  DateTimeUtils: Symbol.for("DateTimeUtils"),
  TypeUtils: Symbol.for("TypeUtils"),

  // Config
  PostgresConfig: Symbol.for("PostgresConfig"),
  ServerConfig: Symbol.for("ServerConfig"),
  NodeEnv: Symbol.for("NodeEnv"),

  // Validators
  IdValidator: Symbol.for("IdValidator"),
};

export { TYPES };
