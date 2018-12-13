import { TYPES } from "Injection/types";
import { inject, injectable } from "inversify";
import knex from "knex";
import { DatabaseTables } from "Models/databaseTables";
import { NewUserRequest } from "Models/user/newUserRequest";
import { UserResponse } from "Models/user/userResponse";
import { KnextProvider } from "Utils/knexProvider";

export interface UserDbGateway {
  createNewUser(request: NewUserRequest): Promise<UserResponse>;
}

@injectable()
export class UserDbGatewayImpl implements UserDbGateway {
  private readonly knexClient: knex;

  constructor(@inject(TYPES.KnexProvider) readonly knexProvider: KnextProvider) {
    this.knexClient = knexProvider.knex();
  }

  public async createNewUser(request: NewUserRequest): Promise<UserResponse> {
    const users = await this.knexClient
      .insert(request)
      .into(DatabaseTables.TABLE_USERS)
      .returning(UserResponse.RETURNED_COUMNS);

    return users[0];
  }
}
