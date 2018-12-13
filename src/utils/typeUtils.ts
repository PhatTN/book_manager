import { TrackableSystemError } from "Errors/trackableSystemError";
import { injectable } from "inversify";
import { toNumber } from "lodash";

export interface TypeUtils {
  toBoolean(booleanStr: string | boolean): boolean;
  toNumber(integerStr: string): number;
}

@injectable()
export class TypeUtilsImpl implements TypeUtils {
  public toBoolean(booleanStr: string | boolean): boolean {
    if (booleanStr === undefined) {
      return undefined;
    }

    if (typeof booleanStr === "boolean") {
      return booleanStr;
    }

    if (booleanStr === "true") {
      return true;
    }

    if (booleanStr === "false") {
      return false;
    }

    throw new TrackableSystemError(
      "TypeUtils", "toBoolean",
      `Cannot convert to boolean: ${booleanStr}, type: ${typeof booleanStr}`,
    );
  }

  public toNumber(integerStr: string): number {
    return toNumber(integerStr);
  }
}
