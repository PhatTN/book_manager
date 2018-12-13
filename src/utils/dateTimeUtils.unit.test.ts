import "reflect-metadata";
import { TestDateTimeHelper, TestDateTimeHelperImpl } from "Tests/utils/testDateTimeHelper";
import { DateTimeUtils, DateTimeUtilsImpl } from "Utils/dateTimeUtils";

describe("dateTimeUtils", () => {
  const testDateTimeHelper: TestDateTimeHelper = new TestDateTimeHelperImpl();

  describe("getEpochTime()", () => {
    it("should return correct Epoch time", () => {
      const dateTimeUtils = createDateTimeUtils();

      const epochTime = dateTimeUtils.getEpochTime();

      expect(epochTime).toEqual(EPOCH_TIME);
    });
  });

  describe("buildDateFromAndTo()", () => {
    it("should keep dateFrom and dateTo when passing both from parameters", () => {
      const dateTimeUtils = createDateTimeUtils();

      const result = dateTimeUtils.buildDateFromAndTo(DATE_FROM, DATE_TO);

      expect(result).toEqual([DATE_FROM, DATE_TO]);
    });

    it("should use current time for missing dateTo", () => {
      testDateTimeHelper.mockDate(DATE_CURENT);
      const dateTimeUtils = createDateTimeUtils();

      const result = dateTimeUtils.buildDateFromAndTo(DATE_FROM, undefined);

      expect(result).toEqual([DATE_FROM, DATE_CURENT]);

      testDateTimeHelper.resetDate();
    });

    it("should use Epoch time for missing dateFrom", () => {
      const dateTimeUtils = createDateTimeUtils();

      const result = dateTimeUtils.buildDateFromAndTo(undefined, DATE_TO);

      expect(result).toEqual([EPOCH_TIME, DATE_TO]);
    });

    it("should return undefined for both dateFrom and dateTo if missing pass them", () => {
      testDateTimeHelper.mockDate(DATE_CURENT);
      const dateTimeUtils = createDateTimeUtils();

      const result = dateTimeUtils.buildDateFromAndTo(undefined, undefined);

      expect(result).toEqual([undefined, undefined]);

      testDateTimeHelper.resetDate();
    });
  });

  function createDateTimeUtils(): DateTimeUtils {
    return new DateTimeUtilsImpl();
  }

  const DATE_CURENT = "2018-08-28T00:00:00.000Z";
  const DATE_FROM = "2018-07-22T00:00:00.000Z";
  const DATE_TO = "2018-08-22T00:00:00.000Z";
  const EPOCH_TIME = "1970-01-01T00:00:00.000Z";
});
