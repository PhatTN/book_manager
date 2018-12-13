import { TYPES } from "Injection/types";
import { inject, injectable } from "inversify";
import knex from "knex";
import { DatabaseTables } from "Models/databaseTables";
import { KnextProvider } from "Utils/knexProvider";

export interface TestDatabaseHelper {
  init(): Promise<void>;
  reset(): Promise<void>;

  dropAllTables(): Promise<void>;
  deleteAllData(): Promise<void>;
}

@injectable()
export class TestDatabaseHelperImpl implements TestDatabaseHelper {
  private readonly knexClient: knex;

  constructor(@inject(TYPES.KnexProvider) private readonly knexProvider: KnextProvider) {
    this.knexClient = this.knexProvider.knex();
  }

  public async init(): Promise<void> {
    await this.cleanMigrationTable();
    await this.knexClient.migrate.rollback();
    await this.knexClient.migrate.latest();
    await this.knexClient.seed.run();
  }

  public async reset(): Promise<void> {
    await this.knexClient.migrate.rollback();
  }

  public async dropAllTables(): Promise<void> {
    await this.dropTableSafety(DatabaseTables.TABLE_BOOKS);
  }

  public async deleteAllData(): Promise<void> {
    await this.deleteAllTableData(DatabaseTables.TABLE_BOOKS);
  }

  private async cleanMigrationTable(): Promise<void> {
    await this.deleteAllTableData(DatabaseTables.TABLE_MIGRATIONS_LOCK);
    await this.deleteAllTableData(DatabaseTables.TABLE_MIGRATIONS);
  }

  private async dropTableSafety(tableName: string): Promise<void> {
    const isTableExist = await this.knexClient.schema.hasTable(tableName);
    if (isTableExist) {
      await this.knexClient.schema.dropTable(tableName);
    }
  }

  private async deleteAllTableData(tableName: string): Promise<void> {
    const isTableExist = await this.knexClient.schema.hasTable(tableName);
    if (isTableExist) {
      await this.knexClient(tableName).delete();
    }
  }

  private async insertRecordToTable<T, R>(
    tableName: string,
    data: T,
    returnedColumns: string | string[],
  ): Promise<R> {
    return this.knexClient(tableName)
      .insert(data)
      .returning(returnedColumns);
  }
}
