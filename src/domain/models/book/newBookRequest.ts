/* tslint:disable:variable-name */
import { IllegalParameterError } from "Errors/illegalParameterError";
import joi from "joi";
import { BookColumnSchema } from "Models/book/bookColumnSchema";

export class NewBookRequest {
  private static SCHEMA = joi
    .object({
      title: BookColumnSchema.SCHEMA_TITLE.required(),
      description: BookColumnSchema.SCHEMA_DESCRIPTION.required(),
      isbn: BookColumnSchema.SCHEMA_ISBN.required(),
      author_name: BookColumnSchema.SCHEMA_AUTHOR_NAME,
      created_at: BookColumnSchema.SCHEMA_CREATED_AT.required(),
      updated_at: BookColumnSchema.SCHEMA_UPDATED_AT.required(),
    })
    .required();

  private static validate(request: NewBookRequest) {
    const { error } = joi.validate(request, NewBookRequest.SCHEMA);

    if (error) {
      throw new IllegalParameterError(
        "NewBookRequest",
        "validate",
        `Invalid provided values: ${error.message}`,
      );
    }
  }

  public readonly created_at: Date;
  public readonly updated_at: Date;

  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly isbn: string,
    public readonly author_name: string,
  ) {
    this.created_at = new Date();
    this.updated_at = this.created_at;

    NewBookRequest.validate(this);
  }
}
