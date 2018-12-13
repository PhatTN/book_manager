/* tslint:disable:import-name */
/* tslint:disable:no-implicit-dependencies */
import { injectable } from "inversify";
import MockDate from "mockdate";

export interface TestDateTimeHelper {
  mockDate(isoDateString: string): void;
  resetDate(): void;
}

@injectable()
export class TestDateTimeHelperImpl implements TestDateTimeHelper {
  public mockDate(isoDateString: string): void {
    MockDate.set(isoDateString);
  }

  public resetDate(): void {
    MockDate.reset();
  }
}
