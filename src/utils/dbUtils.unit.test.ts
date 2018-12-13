import { DbUtils } from "Utils/dbUtils";

describe("dbUtils", () => {

  describe("buildQualifyField", () => {
    it("should return as expected result", () => {
      const tableName = "table";
      const fieldName = "field";
      const expectedResult = "table.field";

      const result = DbUtils.buildQualifyField(tableName, fieldName);

      expect(result).toEqual(expectedResult);
    });
  });

  describe("buildQualifyFields", () => {
    it("should return as expected result", () => {
      const tableName = "table";
      const fieldNameArray = ["field1", "field2"];
      const expectedResult = ["table.field1", "table.field2"];

      const result = DbUtils.buildQualifyFields(tableName, fieldNameArray);

      expect(result).toEqual(expectedResult);
    });
  });
});
