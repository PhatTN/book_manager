import { ModelSchema } from "Common/modelSchema";
import joi from "joi";

export class UserColumnSchema {
  public static readonly SCHEMA_ID = ModelSchema.SCHEMA_ID;
  public static readonly SCHEMA_NAME = joi
    .string()
    .min(3)
    .max(100);
  public static readonly SCHEMA_CREATED_AT = ModelSchema.SCHEMA_DATE;
  public static readonly SCHEMA_UPDATED_AT = ModelSchema.SCHEMA_DATE;
}
