import { TrackableSystemError } from "Errors/trackableSystemError";
import "reflect-metadata";
import { TypeUtils, TypeUtilsImpl } from "Utils/typeUtils";

describe("typeUtils", () => {
  describe("toBoolean()", () => {
    it("should return undefined when passing an undefined", () => {
      const utils = createTypeUtils();

      const result = utils.toBoolean(undefined);

      expect(result).toEqual(undefined);
    });

    it("should return exactly passed parameter if passing a boolean type", () => {
      const utils = createTypeUtils();

      const result = utils.toBoolean(true);

      expect(result).toEqual(true);
    });

    it("should return boolean TRUE if passing a string 'true'", () => {
      const utils = createTypeUtils();

      const result = utils.toBoolean("true");

      expect(result).toEqual(true);
    });

    it("should return boolean FALSE if passing a string 'false'", () => {
      const utils = createTypeUtils();

      const result = utils.toBoolean("false");

      expect(result).toEqual(false);
    });

    it("should throw an exception if invalid boolean string", () => {
      try {
        const utils = createTypeUtils();
        expect.hasAssertions();

        utils.toBoolean("123");
      } catch (error) {
        expect(error).toBeInstanceOf(TrackableSystemError);
      }
    });
  });

  function createTypeUtils(): TypeUtils {
    return new TypeUtilsImpl();
  }
});
