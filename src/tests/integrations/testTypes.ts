import { TYPES } from "Injection/types";

export const TEST_TYPES = {
  ...TYPES,
  TestDateTimeHelper: Symbol.for("TestDateTimeHelper"),
  TestDatabaseHelper: Symbol.for("TestDatabaseHelper"),
};
