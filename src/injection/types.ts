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

  // Books
  BookDbGateway: Symbol.for("BookDbGateway"),
  BookRepository: Symbol.for("BookRepository"),
  AddNewBookUseCase: Symbol.for("AddNewBookUseCase"),
  GetAllBooksUseCase: Symbol.for("GetAllBooksUseCase"),
  BookRouter: Symbol.for("BookRouter"),
};

export { TYPES };
