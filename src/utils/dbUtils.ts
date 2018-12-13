export class DbUtils {
  public static buildQualifyField(tableName: string, fieldName: string): string {
    return `${tableName}.${fieldName}`;
  }

  public static buildQualifyFields(tableName: string, fieldNames: string[]): string[] {
    return fieldNames.map((fieldName) => DbUtils.buildQualifyField(tableName, fieldName));
  }
}
