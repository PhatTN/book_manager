import { DatabaseTables } from "Models/databaseTables";
import { UserColumns } from "Models/user/userColumns";
import { DbUtils } from "Utils/dbUtils";

export class UserResponse {
  public static readonly RETURNED_COUMNS = DbUtils.buildQualifyFields(DatabaseTables.TABLE_USERS, [
    UserColumns.COLUMN_ID,
    UserColumns.COLUMN_NAME,
    UserColumns.COLUMN_CREATED_AT,
    UserColumns.COLUMN_UPDATED_AT,
  ]);

  public readonly [UserColumns.COLUMN_ID]: string;
  public readonly [UserColumns.COLUMN_NAME]: string;
  public readonly [UserColumns.COLUMN_CREATED_AT]: Date;
  public readonly [UserColumns.COLUMN_UPDATED_AT]: Date;

  constructor(id: string, name: string, createdAt: Date, updatedAt: Date) {
    this.user_id = id;
    this.name = name;
    this.created_at = createdAt;
    this.updated_at = updatedAt;
  }
}
