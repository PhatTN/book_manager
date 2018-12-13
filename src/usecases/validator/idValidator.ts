import { ModelSchema } from "Common/modelSchema";
import { injectable } from "inversify";
import joi from "joi";
import { isNullOrUndefined } from "util";

export interface IdValidator {
  isValid(id: string): boolean;
}

@injectable()
export class IdValidatorImpl implements IdValidator {
  public isValid(id: string): boolean {
    const { error } = joi.validate(id, ModelSchema.SCHEMA_ID.required());

    return isNullOrUndefined(error);
  }
}
