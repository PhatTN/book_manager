import { ModelSchema } from "Common/modelSchema";
import joi from "joi";

export class BookColumnSchema {
  public static readonly SCHEMA_ID = ModelSchema.SCHEMA_ID;
  public static readonly SCHEMA_TITLE = joi.string().min(2).max(200);
  public static readonly SCHEMA_DESCRIPTION = joi.string().min(2).max(5000);
  public static readonly SCHEMA_ISBN = joi.string().length(10).regex(/^\d+$/);
  public static readonly SCHEMA_AUTHOR_NAME = joi.string().min(2).max(100);
  public static readonly SCHEMA_CREATED_AT = ModelSchema.SCHEMA_DATE;
  public static readonly SCHEMA_UPDATED_AT = ModelSchema.SCHEMA_DATE;
}
