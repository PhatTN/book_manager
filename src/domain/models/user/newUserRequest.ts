import { IllegalParameterError } from "Errors/illegalParameterError";
import joi from "joi";
import { UserColumns } from "Models/user/userColumns";
import { UserColumnSchema } from "Models/user/userColumnSchema";

export class NewUserRequest {
  private static SCHEMA = joi
    .object({
      user_id: UserColumnSchema.SCHEMA_ID.required(),
      name: UserColumnSchema.SCHEMA_NAME.required(),
      created_at: UserColumnSchema.SCHEMA_CREATED_AT.required(),
      updated_at: UserColumnSchema.SCHEMA_UPDATED_AT.required(),
    })
    .required();

  private static validate(request: NewUserRequest) {
    const { error } = joi.validate(request, NewUserRequest.SCHEMA);

    if (error) {
      throw new IllegalParameterError(
        "NewUserRequest",
        "validate",
        `Invalid provided values: ${error.message}`,
      );
    }
  }

  public readonly [UserColumns.COLUMN_ID]: string;
  public readonly [UserColumns.COLUMN_NAME]: string;
  public readonly [UserColumns.COLUMN_CREATED_AT]: Date;
  public readonly [UserColumns.COLUMN_UPDATED_AT]: Date;

  constructor(id: string, name: string) {
    this.user_id = id;
    this.name = name;
    this.created_at = new Date();
    this.updated_at = this.created_at;

    NewUserRequest.validate(this);
  }
}
