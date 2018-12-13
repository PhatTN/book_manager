/* tslint:disable:variable-name */
import { BookColumns } from "Models/book/bookColumns";
import { DatabaseTables } from "Models/databaseTables";
import { DbUtils } from "Utils/dbUtils";

export class BookResponse {
  public static readonly RETURNED_COUMNS = DbUtils.buildQualifyFields(DatabaseTables.TABLE_BOOKS, [
    BookColumns.COLUMN_ID,
    BookColumns.COLUMN_TITLE,
    BookColumns.COLUMN_DESCRIPTION,
    BookColumns.COLUMN_ISBN,
    BookColumns.COLUMN_AUTHOR_NAME,
    BookColumns.COLUMN_CREATED_AT,
    BookColumns.COLUMN_UPDATED_AT,
  ]);

  constructor(
    public readonly book_id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly isbn: string,
    public readonly author_name: string,
    public readonly created_at: Date,
    public readonly updated_at: Date,
    ) {
  }
}
