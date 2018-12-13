import { Constant } from "Common/constant";
import { injectable } from "inversify";

export interface DateTimeUtils {
  getEpochTime(): string;
  buildDateFromAndTo(dateFrom: string, dateTo: string): [string, string];
}

@injectable()
export class DateTimeUtilsImpl implements DateTimeUtils {
  public getEpochTime(): string {
    return Constant.EPOCH_TIME;
  }

  public buildDateFromAndTo(dateFrom: string, dateTo: string): [string, string] {
    let finalDateFrom: string;
    let finalDateTo: string;
    const now = new Date().toISOString();
    const lowestTime = this.getEpochTime();

    if (dateFrom && dateTo) {
      finalDateFrom = dateFrom;
      finalDateTo = dateTo;
    } else if (dateFrom && !dateTo) {
      finalDateFrom = dateFrom;
      finalDateTo = now;
    } else if (dateTo && !dateFrom) {
      finalDateFrom = lowestTime;
      finalDateTo = dateTo;
    } else {
      finalDateFrom = undefined;
      finalDateTo = undefined;
    }

    return [finalDateFrom, finalDateTo];
  }
}
