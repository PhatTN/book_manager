import joi from "joi";

export class ModelSchema {
  public static readonly SCHEMA_ID = joi.string().uuid();
  public static readonly SCHEMA_DATE = joi.date();
  public static readonly SCHEMA_DATE_ISO = joi.date().iso();
  public static readonly SCHEMA_BOOLEAN = joi.boolean();
}
